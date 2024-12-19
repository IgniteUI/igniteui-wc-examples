import { WorldLocations } from './WorldLocations';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule,
    IgcGeographicSymbolSeriesModule
);

export class MapTypeScatterSymbolSeries {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.updateZoomWindow({ left: 0.2, top: 0.1, width: 0.6, height: 0.6 });

        this.addSeriesWith(WorldLocations.getCities(), 'Gray');
        this.addSeriesWith(WorldLocations.getCapitals(), 'rgb(32, 146, 252)');
    }

    public addSeriesWith(locations: any[], brush: string)
    {
        const symbolSeries = new IgcGeographicSymbolSeriesComponent ();
        symbolSeries.dataSource = locations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.latitudeMemberPath = 'lat';
        symbolSeries.longitudeMemberPath = 'lon';
        symbolSeries.markerBrush  = 'White';
        symbolSeries.markerOutline = brush;
        // symbolSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(symbolSeries);
    }

    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split('\n');
        console.log('SB loaded records ' + csvLines.length);
    }

}

new MapTypeScatterSymbolSeries();
