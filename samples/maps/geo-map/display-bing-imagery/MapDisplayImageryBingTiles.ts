import { SampleBase } from "../../sample-base";
import { MapUtils, MapRegion } from "./MapUtils";
import "./SharedStyles.css";

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { BingMapsImageryStyle } from 'igniteui-webcomponents-maps';
import { IgcBingMapsMapImagery } from 'igniteui-webcomponents-maps';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

let templateHTML = `
<div class="sampleColumns" >
    <igc-geographic-map id="map1" class="geoMap" height="100%" width="100%"></igc-geographic-map>
    <igc-geographic-map id="map2" class="geoMap" height="100%" width="100%"></igc-geographic-map>
    <igc-geographic-map id="map3" class="geoMap" height="100%" width="100%"></igc-geographic-map>
</div>
`;

export class MapDisplayImageryBingTiles extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("MapDisplayImageryBingTiles");
    public static register(): any {
        window.customElements.define(this.htmlTagName, MapDisplayImageryBingTiles); return this;
    }

    private geoMap1: IgcGeographicMapComponent;
    private geoMap2: IgcGeographicMapComponent;
    private geoMap3: IgcGeographicMapComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.geoMap1 = document.getElementById("map1") as IgcGeographicMapComponent;
        this.geoMap2 = document.getElementById("map2") as IgcGeographicMapComponent;
        this.geoMap3 = document.getElementById("map3") as IgcGeographicMapComponent;

        this.createMap1(this.geoMap1);
        this.createMap2(this.geoMap2);
        this.createMap3(this.geoMap3);
    }

    createMap1(map : IgcGeographicMapComponent) {
        map.zoomable = true;

        const tileSource = new IgcBingMapsMapImagery();
        tileSource.apiKey = MapUtils.getBingKey();
        tileSource.imageryStyle = BingMapsImageryStyle.Aerial;
        // resolving BingMaps uri based on HTTP protocol of hosting website
        let tileUri = tileSource.actualBingImageryRestUri;
        let isHttpSecured = window.location.toString().startsWith("https:");
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace("http:", "https:");
        } else {
            tileSource.bingImageryRestUri = tileUri.replace("https:", "http:");
        }

        map.backgroundContent = tileSource;

        // optional - navigating to a map region
        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }

    createMap2(map : IgcGeographicMapComponent) {
        map.zoomable = true;
        const tileSource = new IgcBingMapsMapImagery();
        tileSource.apiKey = MapUtils.getBingKey();
        tileSource.imageryStyle = BingMapsImageryStyle.AerialWithLabels;
        // resolving BingMaps uri based on HTTP protocol of hosting website
        let tileUri = tileSource.actualBingImageryRestUri;
        let isHttpSecured = window.location.toString().startsWith("https:");
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace("http:", "https:");
        } else {
            tileSource.bingImageryRestUri = tileUri.replace("https:", "http:");
        }

        map.backgroundContent = tileSource;

        // optional - navigating to a map region
        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }

    createMap3(map : IgcGeographicMapComponent) {
        map.zoomable = true;
        const tileSource = new IgcBingMapsMapImagery();
        tileSource.apiKey = MapUtils.getBingKey();
        tileSource.imageryStyle = BingMapsImageryStyle.Road;
        // resolving BingMaps uri based on HTTP protocol of hosting website
        let tileUri = tileSource.actualBingImageryRestUri;
        let isHttpSecured = window.location.toString().startsWith("https:");
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace("http:", "https:");
        } else {
            tileSource.bingImageryRestUri = tileUri.replace("https:", "http:");
        }

        map.backgroundContent = tileSource;

        // optional - navigating to a map region
        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }
}