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
    IgcGeographicMapModule 
} from 'igniteui-webcomponents-maps';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { MapRegion, MapUtils } from './MapUtils';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

defineComponents(IgcDialogComponent, IgcButtonComponent, IgcSelectComponent, IgcInputComponent, IgcSelectItemComponent);

ModuleManager.register(IgcDataChartInteractivityModule, IgcGeographicMapModule);

const passwordIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0151 13.6556C14.8093 14.3587 16.9279 13.9853 18.3777 12.5355C20.3304 10.5829 20.3304 7.41709 18.3777 5.46447C16.4251 3.51184 13.2593 3.51184 11.3067 5.46447C9.85687 6.91426 9.48353 9.03288 10.1866 10.8271M12.9964 13.6742L6.82843 19.8422L4.2357 19.6065L4 17.0138L10.168 10.8458M15.5493 8.31568V8.29289" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export class MapDisplayImageryAzureTiles {
    private map!: IgcGeographicMapComponent;
    private dialog!: IgcDialogComponent;
    private azureKeyInput!: IgcInputComponent;
    private submitButton!: IgcButtonComponent;
    private mapImage!: HTMLImageElement;
    private apiKey?: string;
    private mapStyleSelect!: IgcSelectComponent;

    private readonly placeholderImages: Record<string, string> = {
        Satellite: "images/azure_satellite.png",
        Road: "images/azure_road.png",
        DarkGrey: "images/azure_darkgrey.png",
        HybridRoadOverlay: "images/azurehybridroad.png",
        HybridDarkGreyOverlay: "images/azurehybriddarkgrey.png",
        LabelsRoadOverlay: "images/azure_labelsroad.png",
        LabelsDarkGreyOverlay: "images/azure_labelsdarkgrey.png",
        TrafficDelayOverlay: "images/azure_trafficdelay.png",
        TerraOverlay: "images/azure_terra_overlay.png",
        TrafficAbsoluteOverlay: "images/azure_traffic_absolute.png",
        TrafficReducedOverlay: "images/azure_traffic_light.png",
        TrafficRelativeOverlay: "images/azure_traffic_relative.png",
        WeatherInfraredOverlay: "images/azure_weather_infrared_road.png",
        WeatherRadarOverlay: "images/azure_weather_radar.png"
    };

    constructor() {
        registerIconFromText("password", passwordIcon);

        this.dialog = document.getElementById('azureDialog') as IgcDialogComponent;
        this.azureKeyInput = document.getElementById('azureKeyInput') as IgcInputComponent;
        this.submitButton = document.getElementById('submitButton') as IgcButtonComponent;
        this.mapImage = document.getElementById('mapImage') as HTMLImageElement;
        this.map = document.getElementById('azureMap') as IgcGeographicMapComponent;
        this.mapStyleSelect = document.getElementById('mapStyleSelect') as IgcSelectComponent;

        this.populateSelect();

        // Ensure Satellite is selected on startup
        requestAnimationFrame(() => {
            this.mapStyleSelect.value = "Satellite";
            this.mapImage.src = this.placeholderImages["Satellite"];
        });

        // Initially hide the map
        customElements.whenDefined('igc-geographic-map').then(() => {
            setTimeout(() => {
                this.map.style.opacity = '0';
            });
        });

        // Show dialog on startup
        this.dialog.show();

        // Submit button click
        this.submitButton.addEventListener('click', () => {
            const key = this.azureKeyInput.value?.trim();
            if (!key) return;
            this.apiKey = key;

            const selectedStyleValue = this.mapStyleSelect.value as keyof typeof AzureMapsImageryStyle;
            if (!selectedStyleValue) return;

            this.updateAzureMap(AzureMapsImageryStyle[selectedStyleValue]);

            this.showMapSafely();
            this.dialog.hide();
        });

        // Handle style changes
        this.mapStyleSelect.addEventListener('igcChange', (evt: any) => {
            const selectedValue = evt.detail.value as keyof typeof AzureMapsImageryStyle;
            if (!selectedValue) return;

            this.mapImage.src = this.placeholderImages[selectedValue];

            if (this.apiKey) {
                requestAnimationFrame(() => {
                    this.updateAzureMap(AzureMapsImageryStyle[selectedValue]);
                });
            }
        });
    }

    private populateSelect() {
        Object.keys(this.placeholderImages).forEach(key => {
            const item = document.createElement('igc-select-item');
            item.value = key;
            item.textContent = key;
            this.mapStyleSelect.appendChild(item);
        });
    }

    private showMapSafely() {
        if (!this.map) return;

        requestAnimationFrame(() => {
            this.map.style.opacity = '1';
            this.map.style.pointerEvents = 'auto';
            this.mapImage.hidden = true;
        });
    }

    private updateAzureMap(style: AzureMapsImageryStyle) {
        if (!this.map) return;

        const tileSource = new IgcAzureMapsImagery();
        tileSource.apiKey = this.apiKey ?? '';
        tileSource.imageryStyle = style;
        this.map.backgroundContent = tileSource;

        if (
            style === AzureMapsImageryStyle.TrafficDelayOverlay ||
            style === AzureMapsImageryStyle.TrafficAbsoluteOverlay ||
            style === AzureMapsImageryStyle.TrafficReducedOverlay ||
            style === AzureMapsImageryStyle.TrafficRelativeOverlay
        ) {
            this.map.zoomToGeographic({
                left: -74.2591,
                top: 40.9176,
                width: -73.7004 - (-74.2591),
                height: 40.4774 - 40.9176
            });
        } else {
            MapUtils.navigateTo(this.map, MapRegion.UnitedStates);
        }
    }
}

new MapDisplayImageryAzureTiles();
