import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicHighDensityScatterSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicHighDensityScatterSeriesModule } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule,
    IgcGeographicHighDensityScatterSeriesModule
);

export class MapBindingDataCSV {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;

        const url = 'https://static.infragistics.com/xplatform/data/UsaCitiesPopulation.csv';
        fetch(url)
            .then((response) => response.text())
            .then(data => this.onDataLoaded(data));
    }

    disconnectedCallback() {
        this.geoMap.series.clear();
    }

    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split('\n');
        console.log('SB loaded UsaCitiesPopulation.csv ' + csvLines.length);

        // parsing CSV data and creating geographic locations
        const geoLocations: any[] = [];
        for (let i: number = 1; i < csvLines.length; i++) {
            const columns: string[] = csvLines[i].split(',');
            const location: any = {
                name:  columns[0],
                latitude:  Number(columns[1]),
                longitude: Number(columns[2]),
                population: Number(columns[3])
            };
            geoLocations.push(location);
        }

        // creating HD series with loaded data
        const geoSeries = new IgcGeographicHighDensityScatterSeriesComponent();
        geoSeries.name = 'hdSeries';
        geoSeries.dataSource = geoLocations;
        geoSeries.latitudeMemberPath  = 'latitude';
        geoSeries.longitudeMemberPath = 'longitude';
        geoSeries.heatMaximumColor = 'Red';
        geoSeries.heatMinimumColor = 'Black';
        geoSeries.heatMinimum = 0;
        geoSeries.heatMaximum = 5;
        geoSeries.pointExtent = 1;
        // geoSeries.tooltipTemplate = this.createTooltip;
        geoSeries.mouseOverEnabled = true;

        // adding symbol series to the geographic amp
        this.geoMap.series.add(geoSeries);

        // zooming to bound of lower 48-states
        const geoBounds = {
            left: -130,
            top: 15,
            width: Math.abs(-130 + 65),
            height: Math.abs(50 - 15)
        };
        this.geoMap.zoomToGeographic(geoBounds);
    }
}

export function initialize() {
  return new MapBindingDataCSV();
}