import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';
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
        this.onPolygonsLoaded = this.onPolygonsLoaded.bind(this);

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = undefined;
        this.geoMap.updateZoomWindow({ left: 0.2, top: 0.1, width: 0.6, height: 0.6 });

        const sdsPolygons: IgcShapeDataSource = new IgcShapeDataSource();
        sdsPolygons.importCompleted = this.onPolygonsLoaded;
        sdsPolygons.shapefileSource = "https://static.infragistics.com/xplatform/shapes/WorldCountries.shp";
        sdsPolygons.databaseSource  = "https://static.infragistics.com/xplatform/shapes/WorldCountries.dbf";
        sdsPolygons.dataBind();

        // // loading a shapefile with geographic points
        const sdsPoints: IgcShapeDataSource = new IgcShapeDataSource();
        sdsPoints.importCompleted = this.onPointsLoaded;
        sdsPoints.shapefileSource = "https://static.infragistics.com/xplatform/shapes/WorldCities.shp";
        sdsPoints.databaseSource  = "https://static.infragistics.com/xplatform/shapes/WorldCities.dbf";
        sdsPoints.dataBind();
    }

    public onPointsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onPoints');

        const geoLocations: any[] = [];
        // parsing shapefile data and creating geo-locations
        let pointData: any[] = sds.getPointData();
        for ( let i: number = 0; i < pointData.length; i++ ) {
            let record: any = pointData[i];
            // using only capital cities
            if (record.fieldValues.CAPITAL === "N") { continue; }
            // each shapefile record has just one point
            const location: any = {
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

    public onPolygonsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onPolygons');

        const geoPolygons: any[] = [];
        // parsing shapefile data and creating geo-polygons
        let pointData: any[] = sds.getPointData();
        for ( let i: number = 0; i < pointData.length; i++ ) {
            let record: any = pointData[i];
            // using field/column names from .DBF file
            const country: any = {
                points: record.points,
                name: record.fieldValues.NAME,
                gdp: record.fieldValues.GDP,
                population: record.fieldValues.POPULATION
            };
            geoPolygons.push(country);
        }

        let polygonSeries = (document.getElementById('polygonSeries') as IgcGeographicShapeSeriesComponent);
        polygonSeries.dataSource = geoPolygons;
        polygonSeries.renderSeries(false);
    }
}

new MapBindingMultipleShapes();
