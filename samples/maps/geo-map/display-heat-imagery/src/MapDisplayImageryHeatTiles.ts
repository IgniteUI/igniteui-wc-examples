

import Worker from './heatworker.worker'

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicTileSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcHeatTileGenerator } from 'igniteui-webcomponents-core';
import { IgcTileGeneratorMapImagery } from 'igniteui-webcomponents-maps';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapDisplayImageryHeatTiles {


    
    
        

    private geoMap: IgcGeographicMapComponent;
    public tileImagery: IgcTileGeneratorMapImagery;

    constructor() {
        
        this.tileImagery = new IgcTileGeneratorMapImagery();
        this.onDataLoaded = this.onDataLoaded.bind(this);
    
        

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.zoomToGeographic({ left: -134.5, top: 16.0, width: 70.0, height: 37.0 });


        const url = 'https://static.infragistics.com/xplatform/data/UsaCitiesPopulation.csv';
        console.log('SB loading ' + url);

        fetch(url)
            .then((response) => response.text())
            .then(data => this.onDataLoaded(data));

    }

    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split('\n');
        console.log('loaded UsaCitiesPopulation.csv ' + csvLines.length);

        const latitudes: number[] = [];
        const longitudes: number[] = [];
        const populations: number[] = [];

        // parsing CSV data and creating geographic locations
        for (let i = 1; i < csvLines.length; i++) {
            const columns = csvLines[i].split(',');
            latitudes.push(Number(columns[1]));
            longitudes.push(Number(columns[2]));
            populations.push(Number(columns[3]));
        }

        // generating heat map imagery tiles
        const gen = new IgcHeatTileGenerator();
        gen.xValues = longitudes;
        gen.yValues = latitudes;
        gen.values = populations;
        gen.blurRadius = 6;
        gen.maxBlurRadius = 20;
        gen.useBlurRadiusAdjustedForZoom = true;
        gen.minimumColor = 'rgba(100, 255, 0, 0.5)';
        gen.maximumColor = 'rgba(255, 255, 0, 0.5)';
        gen.useGlobalMinMax = true;
        gen.useGlobalMinMaxAdjustedForZoom = true;
        gen.useLogarithmicScale = true;
        gen.useWebWorkers = true;
        gen.webWorkerInstance = new Worker();

        gen.scaleColors = [
            'rgba(0, 0, 255, .251)', 'rgba(0, 255, 255, .3765)',
            'rgba(50,205,50, .2675)', 'rgba(255, 255, 0, .7059)',
            'rgba(255, 0, 0, .7843)'
        ];
        this.tileImagery.tileGenerator = gen;

        // generating heat map series
        const series = new IgcGeographicTileSeriesComponent();
        series.tileImagery = this.tileImagery;

        // add heat map series to the map
        this.geoMap.series.add(series);
    }
}

let sample = new MapDisplayImageryHeatTiles();