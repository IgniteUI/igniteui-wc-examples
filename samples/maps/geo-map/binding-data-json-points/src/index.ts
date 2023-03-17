import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapBindingDataJsonPoints {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        const url = 'https://static.infragistics.com/xplatform/data/WorldCities.json';
        fetch(url)
            .then((response) => response.json())
            .then(data => this.onDataLoaded(data));
    }

    public onDataLoaded(jsonData: any[]) {
        const geoLocations: any[] = [];
        for (const item of jsonData) {
            // using only capital cities
            if (!item.cap) continue;
            geoLocations.push(item);
        }

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        let geoSeries: IgcGeographicSymbolSeriesComponent = new IgcGeographicSymbolSeriesComponent();
        geoSeries.dataSource = geoLocations;
        geoSeries.latitudeMemberPath  = 'lat';
        geoSeries.longitudeMemberPath = 'lon';
        geoSeries.markerBrush = 'rgba(255, 255, 255, 1.0)';
        geoSeries.markerOutline = 'rgba(135, 5, 255, 1.0)';
        geoSeries.markerThickness = 1;
        geoSeries.markerType = MarkerType.Circle;

        this.geoMap.series.add(geoSeries);
    }
}

new MapBindingDataJsonPoints();
