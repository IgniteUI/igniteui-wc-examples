

import { WorldUtils } from './WorldUtils';

import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicHighDensityScatterSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicHighDensityScatterSeriesModule } from 'igniteui-webcomponents-maps';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicHighDensityScatterSeriesModule,
    IgcGeographicMapModule
);


export class MapTypeScatterDensitySeries {


    
    
        

    private geoMap: IgcGeographicMapComponent;

    constructor() {
        
    
        

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;

        const url = 'https://static.infragistics.com/xplatform/data/AusPlaces.csv';

        fetch(url)
            .then((response) => response.text())
            .then(data => this.onDataLoaded(data));
    }

    disconnectedCallback() {
        this.geoMap.series.clear();
    }

    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split('\n');
        console.log('loaded AusPlaces.csv ' + csvLines.length);

        const geoLocations: any[] = [];
        for (let i = 1; i < csvLines.length; i++) {
            const columns = csvLines[i].split(',');
            const location = {
                latitude:  Number(columns[2]),
                longitude: Number(columns[1]),
                name:  columns[0]
            };
            geoLocations.push(location);
        }

        // creating HD series with loaded data
        const geoSeries = new IgcGeographicHighDensityScatterSeriesComponent();
        geoSeries.dataSource = geoLocations;
        geoSeries.longitudeMemberPath = 'longitude';
        geoSeries.latitudeMemberPath = 'latitude';
        geoSeries.heatMaximumColor = 'Red';
        geoSeries.heatMinimumColor = 'Black';
        geoSeries.heatMinimum = 0;
        geoSeries.heatMaximum = 5;
        geoSeries.pointExtent = 1;
        //geoSeries.tooltipTemplate = this.createTooltip;
        geoSeries.mouseOverEnabled = true;

        // adding HD series to the geographic amp
        this.geoMap.series.add(geoSeries);

        // zooming to bound of all geographic locations
        const geoBounds = WorldUtils.getBounds(geoLocations);
        geoBounds.top = 0;
        geoBounds.height = -50;
        this.geoMap.zoomToGeographic(geoBounds);

    }

}

let sample = new MapTypeScatterDensitySeries();