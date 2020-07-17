


import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicScatterAreaSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcCustomPaletteColorScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ShapefileConverter } from 'igniteui-webcomponents-core';
import { Uri } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapTypeScatterAreaSeries {


    
    
        

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
        this.createAreaSeries(contourPoints);
    }

    public createAreaSeries(data: any[]) {
        const brushes = [
            'rgba(32, 146, 252, 0.5)', // semi-transparent blue
            'rgba(14, 194, 14, 0.5)',  // semi-transparent green
            'rgba(252, 120, 32, 0.5)', // semi-transparent orange
            'rgba(252, 32, 32, 0.5)',  // semi-transparent red
        ];

        const colorScale = new IgcCustomPaletteColorScaleComponent();
        colorScale.palette = brushes;
        colorScale.minimumValue = 0;
        colorScale.maximumValue = 30;

        const areaSeries = new IgcGeographicScatterAreaSeriesComponent();
        areaSeries.dataSource = data;
        areaSeries.longitudeMemberPath = 'lon';
        areaSeries.latitudeMemberPath = 'lat';
        areaSeries.colorMemberPath = 'value';
        areaSeries.colorScale = colorScale;
        //areaSeries.tooltipTemplate = this.createAreaTooltip;

        this.geoMap.series.add(areaSeries);
    }

}

let sample = new MapTypeScatterAreaSeries();