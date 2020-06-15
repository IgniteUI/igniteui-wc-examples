import { SampleBase } from "../../sample-base";
import { MapUtils, MapRegion } from "./MapUtils";
import "./SharedStyles.css";

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcRectChangedEventArgs } from 'igniteui-webcomponents-core'
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcGeographicMapModule,
    IgcDataChartInteractivityModule
);

let templateHTML = `
<div class="sampleColumns">
    <igc-geographic-map id="geoMap1" class="geoMap" width="100%" height="100%"></igc-geographic-map>
    <igc-geographic-map id="geoMap2" class="geoMap" width="100%" height="100%"></igc-geographic-map>
</div>
`;

export class MapSynchronization extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapSynchronization");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapSynchronization); return this;
    }

    private map1: IgcGeographicMapComponent;
    private map2: IgcGeographicMapComponent;
    private isMapSynchronizing = false;

    constructor() {
        super();
        this.onWindowRectChangedMap1 = this.onWindowRectChangedMap1.bind(this);
        this.onWindowRectChangedMap2 = this.onWindowRectChangedMap2.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.map1 = document.getElementById("geoMap1") as IgcGeographicMapComponent;
        this.map2 = document.getElementById("geoMap2") as IgcGeographicMapComponent;

        this.map1.zoomable = true;
        this.map2.zoomable = true;

        MapUtils.navigateTo(this.map1, MapRegion.European);
        MapUtils.navigateTo(this.map2, MapRegion.European);

        this.map1.actualWindowRectChanged = this.onWindowRectChangedMap1;
        this.map2.actualWindowRectChanged = this.onWindowRectChangedMap2;
    }

    public onWindowRectChangedMap1(map: IgcGeographicMapComponent, e: IgcRectChangedEventArgs) {
        if (this.isMapSynchronizing) { return; }

        this.isMapSynchronizing = true;
        this.map2.windowRect = map.actualWindowRect;
        this.isMapSynchronizing = false;
    }

    public onWindowRectChangedMap2(map: IgcGeographicMapComponent, e: IgcRectChangedEventArgs) {
        if (this.isMapSynchronizing) { return; }

        this.isMapSynchronizing = true;
        this.map1.windowRect = e.newRect;
        this.isMapSynchronizing = false;
    }

}