
import { MapUtils, MapRegion } from './MapUtils';


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


export class MapDisplayImageryBingTiles {


    
    
        

    private geoMap1: IgcGeographicMapComponent;
    private geoMap2: IgcGeographicMapComponent;
    private geoMap3: IgcGeographicMapComponent;

    constructor() {
        
    
        

        this.geoMap1 = document.getElementById('map1') as IgcGeographicMapComponent;
        this.geoMap2 = document.getElementById('map2') as IgcGeographicMapComponent;
        this.geoMap3 = document.getElementById('map3') as IgcGeographicMapComponent;

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
        let isHttpSecured = window.location.toString().startsWith('https:');
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace('http:', 'https:');
        } else {
            tileSource.bingImageryRestUri = tileUri.replace('https:', 'http:');
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
        let isHttpSecured = window.location.toString().startsWith('https:');
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace('http:', 'https:');
        } else {
            tileSource.bingImageryRestUri = tileUri.replace('https:', 'http:');
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
        let isHttpSecured = window.location.toString().startsWith('https:');
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace('http:', 'https:');
        } else {
            tileSource.bingImageryRestUri = tileUri.replace('https:', 'http:');
        }

        map.backgroundContent = tileSource;

        // optional - navigating to a map region
        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }
}

let sample = new MapDisplayImageryBingTiles();