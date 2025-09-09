import { MapUtils, MapRegion } from './MapUtils';
import { AzureMapsImageryStyle, IgcAzureMapsImagery, IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { defineComponents, IgcButtonComponent, IgcDialogComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDialogComponent, IgcButtonComponent, IgcInputComponent);

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule    
);

export class MapDisplayImageryAzureTiles {

    private mapWeather: IgcGeographicMapComponent;
    private mapAerial: IgcGeographicMapComponent;
    private mapRoad: IgcGeographicMapComponent;
    private apiKey: string | undefined;
    private dialog!: IgcDialogComponent;

    constructor() {

        this.mapWeather = document.getElementById('mapWeather') as IgcGeographicMapComponent;
        this.mapAerial = document.getElementById('mapAerial') as IgcGeographicMapComponent;
        this.mapRoad = document.getElementById('mapRoad') as IgcGeographicMapComponent;
        var azurekeyInput = document.getElementById("azurekeyInput") as IgcInputComponent;

        azurekeyInput.addEventListener('input', (ev: any) =>
        {
            this.apiKey = (ev.target as HTMLInputElement).value;

            this.updateAzureMap(this.mapWeather, AzureMapsImageryStyle.WeatherInfraredOverlay);
            this.updateAzureMap(this.mapAerial, AzureMapsImageryStyle.Satellite);
            this.updateAzureMap(this.mapRoad, AzureMapsImageryStyle.Road);
        });


        window.addEventListener("DOMContentLoaded", async () => {
            this.dialog = document.getElementById("dialog") as IgcDialogComponent;
            var submitButton = document.getElementById("submitButton") as IgcButtonComponent;

            // Show dialog immediately on startup
            this.dialog.show();

            submitButton.addEventListener("click", () => {
                this.apiKey = azurekeyInput.value;
                this.dialog.hide();
            });
        });

    }

    updateAzureMap(map: IgcGeographicMapComponent | undefined, style: AzureMapsImageryStyle) {
        if (!map) {
            return;
        }
        map.zoomable = true;

        const tileSource = new IgcAzureMapsImagery();
        tileSource.apiKey = this.apiKey ?? "";
        tileSource.imageryStyle = style;

        map.backgroundContent = tileSource;

        // optional - navigating to a map region
        MapUtils.navigateTo(map, MapRegion.Caribbean);
    }
    
}

new MapDisplayImageryAzureTiles();
