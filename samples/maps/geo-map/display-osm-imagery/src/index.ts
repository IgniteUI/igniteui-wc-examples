import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcOpenStreetMapImagery } from 'igniteui-webcomponents-maps';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapDisplayImageryOSM {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;

        const mapImagery = new IgcOpenStreetMapImagery();
        this.geoMap.backgroundContent = mapImagery;
        const geoRect = { left: -150.0, top: -60.0, width: 315.0, height: 140.0 };
        this.geoMap.zoomToGeographic(geoRect);
    }

}

export function initialize() {
  return new MapDisplayImageryOSM();
}