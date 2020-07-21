

import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapTypeScatterPolylineSeries {


    
    
        

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        
        this.onDataLoaded = this.onDataLoaded.bind(this);
    
        

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.windowRect = { left: 0.195, top: 0.325, width: 0.2, height: 0.1 };

        // loading a shapefile with geographic shapes
        const url = 'https://static.infragistics.com/xplatform';
        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = url + '/shapes/AmericanRoads.shp';
        sds.databaseSource = url + '/shapes/AmericanRoads.dbf';
        sds.dataBind();
    }

    public onDataLoaded(sds: IgcShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log('loaded AmericanRoads.shp ' + shapeRecords.length);

        const roadsUSA: any[] = [];
        const roadsMEX: any[] = [];
        const roadsCAN: any[] = [];

        // filtering records of loaded shapefile
        for (const record of shapeRecords) {
            // reading field values loaded from DBF file
            const type = record.fieldValues.RoadType;
            const road = {
                country: record.fieldValues.Country,
                length: record.fieldValues.RoadLength / 10,
                points: record.points,
                type: type === 1 ? 'Highway' : 'Road',
            };
            // grouping road items by country names
            if (type === 1 || type === 2) {
                if (road.country === 'USA') {
                    roadsUSA.push(road);
                } else if (road.country === 'MEX') {
                    roadsMEX.push(road);
                } else if (road.country === 'CAN') {
                    roadsCAN.push(road);
                }
            }
        }

        // creating polyline series for roads of each country
        this.addSeriesWith(roadsCAN, 'rgba(252, 32, 32, 0.9)');
        this.addSeriesWith(roadsUSA, 'rgba(3, 121, 231, 0.9)');
        this.addSeriesWith(roadsMEX, 'rgba(14, 194, 14, 0.9)');

    }

    public addSeriesWith(shapeData: any[], shapeBrush: string) {
        const lineSeries = new IgcGeographicPolylineSeriesComponent();

        lineSeries.dataSource = shapeData;
        lineSeries.shapeMemberPath = 'points';
        lineSeries.shapeFilterResolution = 2.0;
        lineSeries.shapeStrokeThickness = 2;
        lineSeries.shapeStroke = shapeBrush;
        //lineSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(lineSeries);
    }
}

let sample = new MapTypeScatterPolylineSeries();