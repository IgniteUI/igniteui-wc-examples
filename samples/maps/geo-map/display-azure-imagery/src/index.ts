import { 
    defineComponents, 
    IgcDialogComponent, 
    IgcButtonComponent, 
    IgcSelectComponent, 
    IgcSelectItemComponent,
    IgcInputComponent, 
    registerIconFromText 
} from 'igniteui-webcomponents';
import { 
    AzureMapsImageryStyle, 
    IgcAzureMapsImagery, 
    IgcGeographicMapComponent, 
    IgcGeographicMapModule, 
    IgcGeographicTileSeriesComponent
} from 'igniteui-webcomponents-maps';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { MapRegion, MapUtils } from './MapUtils';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

// Register components and modules
defineComponents(IgcDialogComponent, IgcButtonComponent, IgcSelectComponent, IgcInputComponent, IgcSelectItemComponent);
ModuleManager.register(IgcDataChartInteractivityModule, IgcGeographicMapModule);

// Password icon SVG
const passwordIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0151 13.6556C14.8093 14.3587 16.9279 13.9853 18.3777 12.5355C20.3304 10.5829 20.3304 7.41709 18.3777 5.46447C16.4251 3.51184 13.2593 3.51184 11.3067 5.46447C9.85687 6.91426 9.48353 9.03288 10.1866 10.8271M12.9964 13.6742L6.82843 19.8422L4.2357 19.6065L4 17.0138L10.168 10.8458M15.5493 8.31568V8.29289" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export class MapDisplayImageryAzureTiles {
    private map!: IgcGeographicMapComponent;
    private imagerySeries!: IgcGeographicTileSeriesComponent;
    private dialog!: IgcDialogComponent;
    private azureKeyInput!: IgcInputComponent;
    private submitButton!: IgcButtonComponent;
    private resetButton!: IgcButtonComponent;

    private mapImage!: HTMLImageElement;
    private mapStyleSelect!: IgcSelectComponent;

    private apiKey?: string;
    private azureTileSource!: IgcAzureMapsImagery;
    private azureBackground!: IgcAzureMapsImagery;

    private styleChangeTimeout?: number;

    private readonly styleConfig: Record<string, { placeholder: string; background?: AzureMapsImageryStyle; zoom: () => void }> = {
        Satellite: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_satellite.png", zoom: () => this.zoomUS() },
        Road: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_road.png", zoom: () => this.zoomUS() },
        DarkGrey: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_darkgrey.png", zoom: () => this.zoomUS() },
        TerraOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_terra_overlay.png", background: AzureMapsImageryStyle.Satellite, zoom: () => this.zoomUS() },
        HybridRoadOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/AzureHybridRoad.png", background: AzureMapsImageryStyle.Satellite, zoom: () => this.zoomUS() },
        HybridDarkGreyOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_hybriddarkgrey.png", background: AzureMapsImageryStyle.Satellite, zoom: () => this.zoomUS() },
        LabelsRoadOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_labelsroad.png", background: AzureMapsImageryStyle.Satellite, zoom: () => this.zoomUS() },
        LabelsDarkGreyOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_labelsdarkgrey.png", background: AzureMapsImageryStyle.Satellite, zoom: () => this.zoomUS() },
        TrafficDelayOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_trafficdelay.png", background: AzureMapsImageryStyle.DarkGrey, zoom: () => this.zoomNY() },
        TrafficAbsoluteOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_absolute.png", background: AzureMapsImageryStyle.DarkGrey, zoom: () => this.zoomNY() },
        TrafficReducedOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_light.png", background: AzureMapsImageryStyle.DarkGrey, zoom: () => this.zoomNY() },
        TrafficRelativeOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_traffic_relative.png", background: AzureMapsImageryStyle.DarkGrey, zoom: () => this.zoomNY() },
        WeatherInfraredOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_weather_Infrared_road.png", background: AzureMapsImageryStyle.DarkGrey, zoom: () => this.zoomUS() },
        WeatherRadarOverlay: { placeholder: "https://static.infragistics.com/xplatform/images/browsers/azure-maps/azure_weather_radar.png", background: AzureMapsImageryStyle.DarkGrey, zoom: () => this.zoomUS() }
    };

    constructor() {
        registerIconFromText("password", passwordIcon);

        // Inject smooth fade-in CSS for map
        const style = document.createElement('style');
        style.textContent = `
            #azureMap {
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            }
        `;
        document.head.appendChild(style);

        // Initialize map and UI references
        this.dialog = document.getElementById('azureDialog') as IgcDialogComponent;
        this.azureKeyInput = document.getElementById('azureKeyInput') as IgcInputComponent;
        this.submitButton = document.getElementById('submitButton') as IgcButtonComponent;
        this.resetButton = document.getElementById('resetButton') as IgcButtonComponent;

        this.mapImage = document.getElementById('mapImage') as HTMLImageElement;
        this.map = document.getElementById('azureMap') as IgcGeographicMapComponent;
        this.imagerySeries = document.getElementById('imagerySeries') as IgcGeographicTileSeriesComponent;
        this.mapStyleSelect = document.getElementById('mapStyleSelect') as IgcSelectComponent;

        this.populateSelect();
        this.preloadImages();

        requestAnimationFrame(() => {
            this.mapStyleSelect.value = "Satellite";
            this.mapImage.src = this.styleConfig["Satellite"].placeholder;
        });

        customElements.whenDefined('igc-geographic-map').then(() => setTimeout(() => this.map.style.opacity = '0'));
        this.dialog.show();

        // Initialize reusable imagery
        this.azureTileSource = new IgcAzureMapsImagery();
        this.imagerySeries.tileImagery = this.azureTileSource;

        this.azureBackground = new IgcAzureMapsImagery();
        this.azureBackground.imageryStyle = AzureMapsImageryStyle.DarkGrey;
        this.map.backgroundContent = this.azureBackground;

        // Event handlers
        this.submitButton.addEventListener('click', () => this.onSubmit());
        this.resetButton.addEventListener('click', () => this.onReset());
        this.mapStyleSelect.addEventListener('igcChange', (evt: any) => this.onStyleChange(evt.detail.value));
    }

    private populateSelect() {
        Object.keys(this.styleConfig).forEach(key => {
            const item = document.createElement('igc-select-item');
            item.value = key; item.textContent = key;
            this.mapStyleSelect.appendChild(item);
        });
    }

    private preloadImages() {
        Object.values(this.styleConfig).forEach(cfg => { const img = new Image(); img.src = cfg.placeholder; });
    }

    private showMap() {
        requestAnimationFrame(() => { this.map.style.opacity = '1'; this.map.style.pointerEvents = 'auto'; this.mapImage.hidden = true; });
    }

    private zoomNY() { this.map.zoomToGeographic({ left:-74.2591, top:40.9176, width:-73.7004-(-74.2591), height:40.4774-40.9176 }); }
    private zoomUS() { MapUtils.navigateTo(this.map, MapRegion.UnitedStates); }

    private setApiKey(key: string) { this.apiKey = key; this.azureTileSource.apiKey = key; this.azureBackground.apiKey = key; }

    private onSubmit() {
        const key = this.azureKeyInput.value?.trim();
        if (!key) return;
        this.setApiKey(key);
        if (this.mapStyleSelect.value) this.updateAzureMap(this.mapStyleSelect.value);
        this.showMap();
        this.dialog.hide();
    }

    private onReset() 
    {
        // Clear the key and reset Azure sources
        this.apiKey = undefined;
        this.azureTileSource.apiKey = "";
        this.azureBackground.apiKey = "";

        // Fade out live map and restore placeholder image
        requestAnimationFrame(() => {
            this.map.style.opacity = '0';
            this.map.style.pointerEvents = 'none';
            this.mapImage.hidden = false;
        });

        // Reset placeholder to current style or default Satellite
        const styleName = this.mapStyleSelect.value || "Satellite";
        const cfg = this.styleConfig[styleName];
        this.mapImage.src = cfg.placeholder;

        // Optionally reopen the dialog to prompt again
        this.azureKeyInput.value = "";
        this.dialog.show();
    }

    private onStyleChange(value: string) {
        const cfg = this.styleConfig[value];
        if (!cfg) return;

        // Always update placeholder image
        this.mapImage.src = cfg.placeholder;

        // If no API key yet, only show placeholder (don't switch to Azure tiles)
        if (!this.apiKey) return;

        if (this.styleChangeTimeout) clearTimeout(this.styleChangeTimeout);
        this.styleChangeTimeout = window.setTimeout(() => this.updateAzureMap(value), 30);
    }

    private updateAzureMap(styleName: string) {
        const cfg = this.styleConfig[styleName]; if (!cfg) return;
        this.azureTileSource.imageryStyle = AzureMapsImageryStyle[styleName as keyof typeof AzureMapsImageryStyle];
        this.azureBackground.imageryStyle = cfg.background ?? AzureMapsImageryStyle.DarkGrey;
        cfg.zoom();
    }
}

new MapDisplayImageryAzureTiles();
