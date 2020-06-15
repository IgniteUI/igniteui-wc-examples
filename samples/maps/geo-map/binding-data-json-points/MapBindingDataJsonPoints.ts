import { SampleBase } from "../../sample-base";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

let templateHTML = `
<div class="sample-container">
    <igc-geographic-map id="geoMap" width="100%" height="100%">

    </igc-geographic-map>
</div>
`;

export class MapBindingDataJsonPoints extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapBindingDataJsonPoints");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapBindingDataJsonPoints); return this;
    }

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        const url = "https://static.infragistics.com/xplatform/data/WorldCities.json";
        // console.log("SB loading " + url);

        fetch(url)
            .then((response) => response.json())
            .then(data => this.onDataLoaded(data));

    }

    public onDataLoaded(jsonData: any[]) {
        const geoLocations: any[] = [];
        for (const jsonItem of jsonData) {
            const location = {
                latitude: jsonItem.lat,
                longitude: jsonItem.lon,
                population: jsonItem.pop,
                city: jsonItem.name,
                country: jsonItem.country
            };
            geoLocations.push(location);
        }

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;
        let geoSeries: IgcGeographicSymbolSeriesComponent = new IgcGeographicSymbolSeriesComponent();
        geoSeries.dataSource = geoLocations;
        geoSeries.markerType = MarkerType.Circle;
        geoSeries.latitudeMemberPath  = "latitude";
        geoSeries.longitudeMemberPath = "longitude";
        geoSeries.markerBrush = "LightGray";
        geoSeries.markerOutline = "Black";

        this.geoMap.series.add(geoSeries);
        //geoSeries.tooltipTemplate = this.createTooltip;
    }
}