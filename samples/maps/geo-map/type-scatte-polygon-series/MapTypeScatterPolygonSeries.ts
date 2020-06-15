import { SampleBase } from "../../sample-base";


import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

let templateHTML = `
<div class="sample-container" style="background: #aad3df;">
    <igc-geographic-map id="geoMap" width="100%" height="100%">

    </igc-geographic-map>
</div>
`;

export class MapTypeScatterPolygonSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapTypeScatterPolygonSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapTypeScatterPolygonSeries); return this;
    }

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        super();
        this.onDataLoaded = this.onDataLoaded.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = undefined;
        // zooming map to region of North America
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        // loading a shapefile with geographic shapes
        const url = "https://static.infragistics.com/xplatform";
        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = url + "/shapes/WorldCountries.shp";
        sds.databaseSource  = url + "/shapes/WorldCountries.dbf";
        sds.dataBind();
    }

    public onDataLoaded(sds: IgcShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log("loaded WorldCountries.shp " + shapeRecords.length);

        const countriesNATO: any[] = [];
        const countriesSCO: any[] = [];
        const countriesARAB: any[] = [];
        const countriesOther: any[] = [];

        for (const record of shapeRecords) {
            // using field/column names from .DBF file
            const country = {
                points: record.points,
                name: record.fieldValues.NAME,
                org: record.fieldValues.ALLIANCE,
                pop: record.fieldValues.POPULATION
            };

            const group = record.fieldValues.ALLIANCE;
            if (group === "NATO") {
                countriesNATO.push(country);
            } else if (group === "SCO") {
                countriesSCO.push(country);
            } else if (group === "ARAB LEAGUE") {
                countriesARAB.push(country);
            } else {
                countriesOther.push(country);
            }
        }

        this.createSeries(countriesNATO, "rgb(32, 146, 252)", "NATO");
        this.createSeries(countriesSCO, "rgb(252, 32, 32)", "SCO");
        this.createSeries(countriesARAB, "rgb(14, 194, 14)", "AL");
        this.createSeries(countriesOther, "rgb(146, 146, 146)", "Other");
    }

    public createSeries(shapeData: any[], shapeBrush: string, shapeTitle: string)
    {
        const seriesName = shapeTitle + "series";
        const geoSeries = new IgcGeographicShapeSeriesComponent();
        geoSeries.dataSource = shapeData;
        geoSeries.shapeMemberPath = "points";
        geoSeries.brush = shapeBrush;
        geoSeries.outline = "Black";
        //geoSeries.tooltipTemplate = this.createTooltip;
        geoSeries.thickness = 1;
        geoSeries.title = shapeTitle;

        this.geoMap.series.add(geoSeries);
    }

}