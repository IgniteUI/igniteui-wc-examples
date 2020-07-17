


// import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicContourLineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ShapefileConverter } from 'igniteui-webcomponents-core';
import { Uri } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapTypeScatterContourSeries {


    
    
        

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        
        this.onDataLoaded = this.onDataLoaded.bind(this);
    
        

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        const url = 'https://static.infragistics.com/xplatform';
        const sfc = new ShapefileConverter();
        sfc.importCompleted = this.onDataLoaded;
        sfc.shapefileSource = url + '/shapes/WorldTemperatures.shp';
        sfc.databaseSource  = url + '/shapes/WorldTemperatures.dbf';
    }

    public onDataLoaded(sds: ShapefileConverter, e: any) {
        const shapeRecords = sds.getPointData();
        console.log('loaded WorldTemperatures.shp: ' + shapeRecords.count);

        const contourPoints: any[] = [];
        for (const record of shapeRecords.toArray()) {
            const temp = record.fieldValues.Contour;
            // using only major contours (every 10th degrees Celsius)
            if (temp % 10 === 0 && temp >= 0) {
                for (const shapes of record.points.toArray()) {
                    for (let i = 0; i < shapes.count; i++) {
                        if (i % 5 === 0) {
                            const point = shapes.toArray()[i];
                            const item = { lon: point.x, lat: point.y, value: temp };
                            contourPoints.push(item);
                        }
                    }
                }
            }
        }

        console.log('loaded contour points: ' + contourPoints.length);
        this.createContourSeries(contourPoints);
    }

    public createContourSeries(data: any[])
    {
        const brushes = [
            'rgba(32, 146, 252, 0.5)', // semi-transparent blue
            'rgba(14, 194, 14, 0.5)',  // semi-transparent green
            'rgba(252, 120, 32, 0.5)', // semi-transparent orange
            'rgba(252, 32, 32, 0.5)',  // semi-transparent red
        ];

        const brushScale = new IgcValueBrushScaleComponent();
        brushScale.brushes = brushes;
        brushScale.minimumValue = 0;
        brushScale.maximumValue = 30;

        const contourSeries = new IgcGeographicContourLineSeriesComponent();
        contourSeries.dataSource = data;
        contourSeries.longitudeMemberPath = 'lon';
        contourSeries.latitudeMemberPath = 'lat';
        contourSeries.valueMemberPath = 'value';
        contourSeries.fillScale = brushScale;
        //contourSeries.tooltipTemplate = this.createContourTooltip;
        contourSeries.thickness = 4;

        this.geoMap.series.add(contourSeries);
    }
}

let sample = new MapTypeScatterContourSeries();