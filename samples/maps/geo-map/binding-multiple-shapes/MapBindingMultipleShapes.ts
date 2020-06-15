import { SampleBase } from "../../sample-base";


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

let templateHTML = `
<div class="sample-container" style="background: #aad3df;">
    <igc-geographic-map id="geoMap" width="100%" height="100%" >
        <igc-geographic-shape-series
            id="polygonSeries"
            shape-memberPath="points"
            shape-fill="rgb(150, 150, 150)"
            shape-stroke="Black"
            shape-stroke-thickness="1.0">
        </igc-geographic-shape-series>
        <igc-geographic-polyline-series
            id="lineSeries"
            shape-member-path="points"
            shape-stroke="rgba(147, 15, 180, 0.5)"
            thickness="3.0" >
        </igc-geographic-polyline-series>
        <igc-geographic-symbol-series
            id="symbolSeries"
            longitude-member-path="longitude"
            latitude-member-path="latitude"
            marker-type="Circle"
            marker-outline="rgb(2, 102, 196)"
            marker-brush="White">
        </igc-geographic-symbol-series>
    </igc-geographic-map>
</div>
`;

export class MapBindingMultipleShapes extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapBindingMultipleShapes");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapBindingMultipleShapes); return this;
    }

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        super();
        this.onPointsLoaded = this.onPointsLoaded.bind(this);
        this.onPolylinesLoaded = this.onPolylinesLoaded.bind(this);
        this.onPolygonsLoaded = this.onPolygonsLoaded.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = null;
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        const url = "https://static.infragistics.com/xplatform";

        const sdsPolygons = new IgcShapeDataSource();
        sdsPolygons.importCompleted = this.onPolygonsLoaded;
        sdsPolygons.shapefileSource = url + "/shapes/WorldCountries.shp";
        sdsPolygons.databaseSource  = url + "/shapes/WorldCountries.dbf";
        sdsPolygons.dataBind();

        const sdsPolylines = new IgcShapeDataSource();
        sdsPolylines.importCompleted = this.onPolylinesLoaded;
        sdsPolylines.shapefileSource = url + "/shapes/WorldCableRoutes.shp";
        sdsPolylines.databaseSource  = url + "/shapes/WorldCableRoutes.dbf";
        sdsPolylines.dataBind();

        // // loading a shapefile with geographic points
        const sdsPoints = new IgcShapeDataSource();
        sdsPoints.importCompleted = this.onPointsLoaded;
        sdsPoints.shapefileSource = url + "/shapes/WorldCities.shp";
        sdsPoints.databaseSource  = url + "/shapes/WorldCities.dbf";
        sdsPoints.dataBind();
    }

    public onPointsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log("onPoints");

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
        let symbolSeries = (document.getElementById("symbolSeries") as IgcGeographicSymbolSeriesComponent);
        symbolSeries.dataSource = geoLocations;
        symbolSeries.renderSeries(false);
    }

    public onPolylinesLoaded(sds: IgcShapeDataSource, e: any) {
        console.log("onPolylines");

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

        let lineSeries = (document.getElementById("lineSeries") as IgcGeographicPolylineSeriesComponent);
        lineSeries.dataSource = geoPolylines;
        lineSeries.renderSeries(false);
    }

    public onPolygonsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log("onPolygons ");

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

        let polygonSeries = (document.getElementById("polygonSeries") as IgcGeographicShapeSeriesComponent);
        polygonSeries.dataSource = geoPolygons;
        polygonSeries.renderSeries(false);
    }
}