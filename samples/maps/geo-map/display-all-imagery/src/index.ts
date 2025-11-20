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

    // All Azure styles (keys match dropdown text)
    private azureStyles: Record<string, AzureMapsImageryStyle> = {
        "AzureMaps Satellite": AzureMapsImageryStyle.Satellite,
        "AzureMaps Road": AzureMapsImageryStyle.Road,
        "AzureMaps DarkGrey": AzureMapsImageryStyle.DarkGrey,
        "AzureMaps TerraOverlay": AzureMapsImageryStyle.TerraOverlay,

        "AzureMaps LabelsRoadOverlay": AzureMapsImageryStyle.LabelsRoadOverlay,
        "AzureMaps LabelsDarkGreyOverlay": AzureMapsImageryStyle.LabelsDarkGreyOverlay,
        "AzureMaps HybridRoadOverlay": AzureMapsImageryStyle.HybridRoadOverlay,
        "AzureMaps HybridDarkGreyOverlay": AzureMapsImageryStyle.HybridDarkGreyOverlay,

        "AzureMaps TrafficAbsoluteOverlay": AzureMapsImageryStyle.TrafficAbsoluteOverlay,
        "AzureMaps TrafficDelayOverlay": AzureMapsImageryStyle.TrafficDelayOverlay,
        "AzureMaps TrafficReducedOverlay": AzureMapsImageryStyle.TrafficReducedOverlay,
        "AzureMaps TrafficRelativeOverlay": AzureMapsImageryStyle.TrafficRelativeOverlay,
        "AzureMaps TrafficRelativeDarkOverlay": AzureMapsImageryStyle.TrafficRelativeDarkOverlay,

        "AzureMaps WeatherRadarOverlay": AzureMapsImageryStyle.WeatherRadarOverlay,
        "AzureMaps WeatherInfraredOverlay": AzureMapsImageryStyle.WeatherInfraredOverlay
    };

    // Matching placeholders for all Azure styles
    private azureFallbackImages: Record<string, string> = {
        "AzureMaps Satellite":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_satellite.png",
        "AzureMaps Road":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_road.png",
        "AzureMaps DarkGrey":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_darkgrey.png",
        "AzureMaps TerraOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_terra_overlay.png",

        "AzureMaps LabelsRoadOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_labelsroad.png",
        "AzureMaps LabelsDarkGreyOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_labelsdarkgrey.png",
        "AzureMaps HybridRoadOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_hybridroad.png",
        "AzureMaps HybridDarkGreyOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/AzureHybridDarkGrey.png",

        "AzureMaps TrafficAbsoluteOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_absolute.png",
        "AzureMaps TrafficDelayOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_delay.png",
        "AzureMaps TrafficReducedOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_light.png",
        "AzureMaps TrafficRelativeOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_relative.png",
        "AzureMaps TrafficRelativeDarkOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_relative_dark.png",

        "AzureMaps WeatherRadarOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_weather_radar.png",
        "AzureMaps WeatherInfraredOverlay":
            "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_weather_Infrared_road.png"
    };

    constructor() {

    this.geoMap = document.getElementById("geoMap") as IgcGeographicMapComponent;
    this.dialog = document.getElementById("enterpriseDialog") as IgcDialogComponent;
    this.keyInput = document.getElementById("enterpriseInput") as IgcInputComponent;
    this.azureButton = document.getElementById("enterAzureKeyBtn") as IgcButtonComponent;
    this.azureFallback = document.getElementById("placeholderImage") as HTMLImageElement;

    this.azureButton.disabled = true;
    this.azureFallback.style.display = "none";

    const select = document.getElementById("mapTypeSelect") as HTMLSelectElement;
    select.addEventListener("change", (e) => this.onMapTypeSelectionChange(e));

    this.azureButton.addEventListener("click", () => this.dialog.show());

    const applyBtn = document.getElementById("applyKeyBtn") as IgcButtonComponent;
    applyBtn.addEventListener("click", () => this.applyKey());

    // NEW: cancel button wiring
    const cancelBtn = document.getElementById("cancelKeyBtn") as IgcButtonComponent;
    cancelBtn.addEventListener("click", () => this.dialog.hide());

    this.populateImageryList(select);

    this.showMapOnly();
    this.geoMap.backgroundContent = new IgcOpenStreetMapImagery();
}

    private populateImageryList(select: HTMLSelectElement) {
        select.add(new Option("OpenStreetMaps (default)"));

        // all Azure styles (keys of azureStyles)
        for (const key of Object.keys(this.azureStyles)) {
            select.add(new Option(key));
        }

        // Esri styles
        for (const key of Object.keys(EsriStyle)) {
            select.add(new Option("Esri " + key, EsriStyle[key as keyof typeof EsriStyle]));
        }
    }

    private applyKey() {
        const key = (this.keyInput.value || "").trim();
        if (key) {
            this.azureKey = key;
        }

        this.dialog.hide();

        const select = document.getElementById("mapTypeSelect") as HTMLSelectElement;
        if (!select || !select.selectedOptions.length) {
            return;
        }

        const text = (select.selectedOptions[0].textContent || "").trim();

        if (text.startsWith("AzureMaps")) {
            this.applyAzureImagery(text);
        }
    }

    public onMapTypeSelectionChange(e: any) {
        const select = e.target as HTMLSelectElement;
        if (!select || !select.selectedOptions.length) {
            return;
        }

        const text = (select.selectedOptions[0].textContent || "").trim();
        const value = select.value;

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

        // traffic styles → zoom into NYC via hard-coded bounds
        const isTraffic =
            style === AzureMapsImageryStyle.TrafficAbsoluteOverlay ||
            style === AzureMapsImageryStyle.TrafficDelayOverlay ||
            style === AzureMapsImageryStyle.TrafficReducedOverlay ||
            style === AzureMapsImageryStyle.TrafficRelativeOverlay ||
            style === AzureMapsImageryStyle.TrafficRelativeDarkOverlay;

        if (isTraffic) {
            // west, south, east, north – NYC bounding box
            const nycRect = {
                left: -74.25909,
                top: 40.916178,
                width: -73.700272 - (-74.25909),
                height: 40.916178 - 40.477399
            };
            this.geoMap.zoomToGeographic(nycRect);
        } else {
            MapUtils.navigateTo(this.geoMap, MapRegion.UnitedStates);
        }
    }

    private showAzureFallback(url: string) {
        this.azureFallback.src = url;
        this.azureFallback.classList.remove("hidden");
        this.azureFallback.style.display = "block";

        this.geoMap.classList.add("hidden");
        (this.geoMap as any).style.display = "none";
    }

    private showMapOnly() {
        this.azureFallback.classList.add("hidden");
        this.azureFallback.style.display = "none";
        this.azureFallback.src = "";

        this.geoMap.classList.remove("hidden");
        (this.geoMap as any).style.display = "block";
    }
}

new MapImagerySources();
