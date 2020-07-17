


import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapBindingMultipleShapes {


    
    
        

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        
        this.onPointsLoaded = this.onPointsLoaded.bind(this);
        this.onPolylinesLoaded = this.onPolylinesLoaded.bind(this);
        this.onPolygonsLoaded = this.onPolygonsLoaded.bind(this);
    
        

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = null;
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        const url = 'https://static.infragistics.com/xplatform';

        const sdsPolygons = new IgcShapeDataSource();
        sdsPolygons.importCompleted = this.onPolygonsLoaded;
        sdsPolygons.shapefileSource = url + '/shapes/WorldCountries.shp';
        sdsPolygons.databaseSource  = url + '/shapes/WorldCountries.dbf';
        sdsPolygons.dataBind();

        const sdsPolylines = new IgcShapeDataSource();
        sdsPolylines.importCompleted = this.onPolylinesLoaded;
        sdsPolylines.shapefileSource = url + '/shapes/WorldCableRoutes.shp';
        sdsPolylines.databaseSource  = url + '/shapes/WorldCableRoutes.dbf';
        sdsPolylines.dataBind();

        // // loading a shapefile with geographic points
        const sdsPoints = new IgcShapeDataSource();
        sdsPoints.importCompleted = this.onPointsLoaded;
        sdsPoints.shapefileSource = url + '/shapes/WorldCities.shp';
        sdsPoints.databaseSource  = url + '/shapes/WorldCities.dbf';
        sdsPoints.dataBind();
    }

    public onPointsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onPoints');

        const geoLocations: any[] = [];
        // parsing shapefile data and creating geo-locations
        let pointData = sds.getPointData();
        for ( let i = 0; i < pointData.length; i++ ) {
            let record = pointData[i];
            // each shapefile record has just one point
            const location = {
                latitude: record.points[0][0].y,
                longitude: record.points[0][0].x,
                city: record.fieldValues.NAME,
                population: record.fieldValues.POPULATION
            };
            geoLocations.push(location);
        }
        let symbolSeries = (document.getElementById('symbolSeries') as IgcGeographicSymbolSeriesComponent);
        symbolSeries.dataSource = geoLocations;
        symbolSeries.renderSeries(false);
    }

    public onPolylinesLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onPolylines');

        const geoPolylines: any[] = [];
        // parsing shapefile data and creating geo-polygons
        let pointData = sds.getPointData();
        for ( let i = 0; i < pointData.length; i++ ) {
            let record = pointData[i];
            // using field/column names from .DBF file
            const route = {
                points: record.points,
                name: record.fieldValues.Name,
                capacity: record.fieldValues.CapacityG,
                distance: record.fieldValues.DistanceKM
            };
            geoPolylines.push(route);
        }

        let lineSeries = (document.getElementById('lineSeries') as IgcGeographicPolylineSeriesComponent);
        lineSeries.dataSource = geoPolylines;
        lineSeries.renderSeries(false);
    }

    public onPolygonsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onPolygons ');

        const geoPolygons: any[] = [];
        // parsing shapefile data and creating geo-polygons
        let pointData = sds.getPointData();
        for ( let i = 0; i < pointData.length; i++ ) {
            let record = pointData[i];
            // using field/column names from .DBF file
            const country = {
                points: record.points,
                name: record.fieldValues.NAME,
                gdp: record.fieldValues.GDP,
                population: record.fieldValues.POPULATION
            };
            geoPolygons.push(country);
        };

        let polygonSeries = (document.getElementById('polygonSeries') as IgcGeographicShapeSeriesComponent);
        polygonSeries.dataSource = geoPolygons;
        polygonSeries.renderSeries(false);
    }
}

let sample = new MapBindingMultipleShapes();