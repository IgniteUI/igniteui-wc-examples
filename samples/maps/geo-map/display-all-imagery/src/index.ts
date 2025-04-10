import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent, IgcOpenStreetMapImagery, IgcBingMapsMapImagery, IgcArcGISOnlineMapImagery, BingMapsImageryStyle  } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { EsriStyle } from './EsriUtility';
import { MapUtils } from './MapUtils';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapImagerySources {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.onMapTypeSelectionChange = this.onMapTypeSelectionChange.bind(this);

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.zoomToGeographic({ left: -120, top: 30, width: 45, height: 20 });

        let dropDown: HTMLSelectElement = document.getElementById('mapTypeSelect') as HTMLSelectElement;
        dropDown.addEventListener("change", this.onMapTypeSelectionChange);

        let openStreetOption: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
        openStreetOption.textContent = "OpenStreetMaps (default)";

        let bingOption: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
        bingOption.textContent = "Bing Maps Road";

        let bingAerialNoLabelsOption: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
        bingAerialNoLabelsOption.textContent = "Bing Maps Aerial Without Labels";

        let bingAerialLabelsOption: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
        bingAerialLabelsOption.textContent = "Bing Maps Aerial With Labels";

        dropDown.add(openStreetOption);
        dropDown.add(bingOption);
        dropDown.add(bingAerialNoLabelsOption);
        dropDown.add(bingAerialLabelsOption);

        const esriKeys = Object.keys(EsriStyle);
        const esriVals = Object.values(EsriStyle);

        for (let i=0; i<esriKeys.length; i++) {
            let option: HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
            let style = esriKeys[i];

            option.textContent = "Esri " + style;
            option.value = esriVals[i];

            dropDown.add(option);
        }
    }

    public onMapTypeSelectionChange(e: any){
        if (this.geoMap === undefined) return;

        let value: string = e.target.value;

        if(value.includes("OpenStreetMap")){
            console.log("OSM");
            this.geoMap.backgroundContent = new IgcOpenStreetMapImagery();
        }
        else if(value.includes("Bing Maps")){
            if(value.includes("Aerial Without Labels")){
                this.geoMap.backgroundContent = this.getBingMapsImagery(BingMapsImageryStyle.Aerial);
            }
            else if(value.includes("Aerial")){
                this.geoMap.backgroundContent = this.getBingMapsImagery(BingMapsImageryStyle.AerialWithLabels);
            }
            else{
                this.geoMap.backgroundContent = this.getBingMapsImagery(BingMapsImageryStyle.Road);
            }
        }
        else {
            let uri = value;
            const tileSource = new IgcArcGISOnlineMapImagery();
            tileSource.mapServerUri = uri;
            this.geoMap.backgroundContent = tileSource;
        }
    }

    public getBingMapsImagery(mapStyle: BingMapsImageryStyle): IgcBingMapsMapImagery {
        const tileSource = new IgcBingMapsMapImagery();
        tileSource.apiKey = MapUtils.getBingKey();
        tileSource.imageryStyle = mapStyle;
        // resolving BingMaps uri based on HTTP protocol of hosting website
        let tileUri = tileSource.actualBingImageryRestUri;
        let isHttpSecured = window.location.toString().startsWith("https:");
        if (isHttpSecured) {
            tileSource.bingImageryRestUri = tileUri.replace("http:", "https:");
        } else {
            tileSource.bingImageryRestUri = tileUri.replace("https:", "http:");
        }

        return tileSource;
    }
}

new MapImagerySources();
