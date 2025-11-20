import {
    IgcGeographicMapModule,
    IgcGeographicMapComponent,
    IgcOpenStreetMapImagery,
    IgcArcGISOnlineMapImagery,
    IgcAzureMapsImagery,
    AzureMapsImageryStyle
} from 'igniteui-webcomponents-maps';

import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import {
    IgcDialogComponent,
    IgcButtonComponent,
    IgcInputComponent,
    defineComponents
} from "igniteui-webcomponents";

import { EsriStyle } from './EsriUtility';
import { MapUtils, MapRegion } from './MapUtils';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

ModuleManager.register(IgcDataChartInteractivityModule, IgcGeographicMapModule);

defineComponents(IgcDialogComponent, IgcButtonComponent, IgcInputComponent);

export class MapImagerySources {

    private geoMap!: IgcGeographicMapComponent;
    private dialog!: IgcDialogComponent;
    private keyInput!: IgcInputComponent;
    private azureButton!: IgcButtonComponent;
    private azureFallback!: HTMLImageElement;

    private azureKey = "";

    private azureStyles: Record<string, AzureMapsImageryStyle> = {
        "AzureMaps Satellite": AzureMapsImageryStyle.Satellite,
        "AzureMaps Road": AzureMapsImageryStyle.Road,
        "AzureMaps DarkGrey": AzureMapsImageryStyle.DarkGrey,
        "AzureMaps TerraOverlay": AzureMapsImageryStyle.TerraOverlay
    };

    private azureFallbackImages: Record<string, string> = {
        "AzureMaps Satellite": "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_satellite.png",
        "AzureMaps Road": "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_road.png",
        "AzureMaps DarkGrey": "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_darkgrey.png",
        "AzureMaps TerraOverlay": "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_terra_overlay.png"
    };

    constructor() {

        this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;
        this.dialog = document.getElementById("enterpriseDialog") as IgcDialogComponent;
        this.keyInput = document.getElementById("enterpriseInput") as IgcInputComponent;
        this.azureButton = document.getElementById("enterAzureKeyBtn") as IgcButtonComponent;
        this.azureFallback = document.getElementById("placeholderImage") as HTMLImageElement;

        this.azureButton.disabled = true;

        const select = document.getElementById("mapTypeSelect") as HTMLSelectElement;
        select.addEventListener("change", (e) => this.onMapTypeSelectionChange(e));

        this.azureButton.addEventListener("click", () => this.dialog.show());

        const applyBtn = document.getElementById("applyKeyBtn") as IgcButtonComponent;
        applyBtn.addEventListener("click", () => this.applyKey());

        this.populateImageryList(select);

        this.showMapOnly();
        this.geoMap.backgroundContent = new IgcOpenStreetMapImagery();
    }

    private populateImageryList(select: HTMLSelectElement) {
        select.add(new Option("OpenStreetMaps (default)"));

        for (const key of Object.keys(this.azureStyles)) {
            select.add(new Option(key));
        }

        for (const key of Object.keys(EsriStyle)) {
            select.add(new Option("Esri " + key, EsriStyle[key as keyof typeof EsriStyle]));
      }
    }

    private applyKey() {
        const key = (this.keyInput.value || "").trim();
        if (key) this.azureKey = key;

        this.dialog.hide();

        const select = document.getElementById("mapTypeSelect") as HTMLSelectElement;
        const text = select.selectedOptions[0].textContent;

        if (text.startsWith("AzureMaps")) {
            this.applyAzureImagery(text);
        }
    }

    public onMapTypeSelectionChange(e: any) {
        const text = e.target.selectedOptions[0].textContent;
        const value = e.target.value;

        this.azureButton.disabled = !text.startsWith("AzureMaps");

        // OSM
        if (text.includes("OpenStreetMap")) {
            this.showMapOnly();
            this.geoMap.backgroundContent = new IgcOpenStreetMapImagery();
        }

        // Azure
        else if (text.startsWith("AzureMaps")) {

            if (!this.azureKey) {
                let url = this.azureFallbackImages[text];
                if (location.protocol !== "https:") {
                    url = url.replace("https:", "http:");
                }

                this.showAzureFallback(url);
            } else {
                this.applyAzureImagery(text);
            }
        }

        // ESRI
        else {
            this.showMapOnly();
            const esri = new IgcArcGISOnlineMapImagery();
            esri.mapServerUri = value;
            this.geoMap.backgroundContent = esri;
        }
    }

    private applyAzureImagery(text: string) {
        this.showMapOnly();

        const style = this.azureStyles[text];
        const imagery = new IgcAzureMapsImagery();
        imagery.apiKey = this.azureKey;
        imagery.imageryStyle = style;

        this.geoMap.backgroundContent = imagery;

        MapUtils.navigateTo(this.geoMap, MapRegion.UnitedStates);
    }

    private showAzureFallback(url: string) {
        this.azureFallback.src = url;
        this.azureFallback.classList.remove("hidden");
        this.geoMap.classList.add("hidden");
    }

    private showMapOnly() {
        this.azureFallback.classList.add("hidden");
        this.geoMap.classList.remove("hidden");
    }
}

new MapImagerySources();
