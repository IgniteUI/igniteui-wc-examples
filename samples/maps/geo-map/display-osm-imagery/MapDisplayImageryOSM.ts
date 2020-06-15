import { SampleBase } from "../../sample-base";

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcOpenStreetMapImagery } from 'igniteui-webcomponents-maps';
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

export class MapDisplayImageryOSM extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapDisplayImageryOSM");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapDisplayImageryOSM); return this;
    }

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;

        const mapImagery = new IgcOpenStreetMapImagery();
        this.geoMap.backgroundContent = mapImagery;

        const geoRect = { left: -150.0, top: -60.0, width: 315.0, height: 140.0 };
        this.geoMap.zoomToGeographic(geoRect);


    }


}