import { SampleBase } from "../../sample-base";

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

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

export class MapNavigation extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapNavigation");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapNavigation); return this;
    }

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;


        // const url = "https://static.infragistics.com/xplatform/data/UsaCitiesPopulation.csv";
        // console.log("SB loading " + url);

        // fetch(url)
        //     .then((response) => response.text())
        //     .then(data => this.onDataLoaded(data));

    }

    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split("\n");
        console.log("SB loaded records " + csvLines.length);

    }

}