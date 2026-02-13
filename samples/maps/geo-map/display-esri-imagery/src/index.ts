import { MapUtils, MapRegion } from './MapUtils';
import { EsriStyle, EsriUtility } from './EsriUtility';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcArcGISOnlineMapImagery } from 'igniteui-webcomponents-maps';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapDisplayImageryEsriTiles {

    private geoMap1: IgcGeographicMapComponent;
    private geoMap2: IgcGeographicMapComponent;
    private geoMap3: IgcGeographicMapComponent;
    private geoMap4: IgcGeographicMapComponent;

    constructor() {

        this.geoMap1 = document.getElementById('map1') as IgcGeographicMapComponent;
        this.geoMap2 = document.getElementById('map2') as IgcGeographicMapComponent;
        this.geoMap3 = document.getElementById('map3') as IgcGeographicMapComponent;
        // this.geoMap4 = document.getElementById('map4') as IgcGeographicMapComponent;

        this.createMap1(this.geoMap1);
        this.createMap2(this.geoMap2);
        this.createMap3(this.geoMap3);
        // this.createMap4(this.geoMap4);
    }

    createMap1(map: IgcGeographicMapComponent) {
        map.zoomable = true;
        const tileSource = new IgcArcGISOnlineMapImagery();
        tileSource.mapServerUri = EsriUtility.getUri(EsriStyle.WorldStreetMap);
        map.backgroundContent = tileSource;

        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }

    createMap2(map: IgcGeographicMapComponent) {
        map.zoomable = true;
        const tileSource = new IgcArcGISOnlineMapImagery();
        tileSource.mapServerUri = EsriUtility.getUri(EsriStyle.WorldOceansBaseMap);
        // or
        // tileSource.mapServerUri = 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer';
        map.backgroundContent = tileSource;

        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }

    createMap3(map: IgcGeographicMapComponent) {
        map.zoomable = true;
        const tileSource = new IgcArcGISOnlineMapImagery();
        tileSource.mapServerUri = EsriUtility.getUri(EsriStyle.WorldTopographicMap);
        map.backgroundContent = tileSource;

        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }

    createMap4(map: IgcGeographicMapComponent) {
        map.zoomable = true;
        const tileSource = new IgcArcGISOnlineMapImagery();
        tileSource.mapServerUri = EsriUtility.getUri(EsriStyle.WorldNationalGeoMap);
        map.backgroundContent = tileSource;

        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }
}

export function initialize() {
  return new MapDisplayImageryEsriTiles();
}