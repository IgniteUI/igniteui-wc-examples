import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapOverview {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.zoomable = true;

        // const url = 'https://static.infragistics.com/xplatform/data/UsaCitiesPopulation.csv';
        // console.log('SB loading ' + url);

        // fetch(url)
        //     .then((response) => response.text())
        //     .then(data => this.onDataLoaded(data));
    }

    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split('\n');
        console.log('SB loaded records ' + csvLines.length);
    }

}

let sample = new MapOverview();
