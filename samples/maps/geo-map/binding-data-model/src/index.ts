import { WorldUtils } from './WorldUtils';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapBindingDataModel {

    private geoMap: IgcGeographicMapComponent;
    public flights: any[] = [];

    constructor() {
        const cityDAL = { lat:  32.763, lon: -96.663, country: 'US', name: 'Dallas' };
        const citySYD = { lat: -33.889, lon: 151.028, country: 'Australia', name: 'Sydney' };
        const cityNZL = { lat: -36.848, lon: 174.763, country: 'New Zealand', name: 'Auckland' };
        const cityQTR = { lat: 25.285, lon:  51.531,  country: 'Qatar', name: 'Doha' };
        const cityPAN = { lat:  8.949, lon: -79.400,  country: 'Panama', name: 'Panama' };
        const cityCHL = { lat: -33.475, lon: -70.647, country: 'Chile', name: 'Santiago' };
        const cityJAP = { lat:  35.683, lon: 139.809, country: 'Japan', name: 'Tokyo' };
        const cityALT = { lat: 33.795,  lon: -84.349, country: 'US', name: 'Atlanta' };
        const cityJOH = { lat: -26.178, lon: 28.004,  country: 'South Africa', name: 'Johannesburg' };
        const cityNYC = { lat: 40.750, lon: -74.0999, country: 'US', name: 'New York' };
        const citySNG = { lat:  1.229, lon: 104.177,  country: 'Singapore', name: 'Singapore' };
        const cityMOS = { lat: 55.750, lon:  37.700,  country: 'Russia', name: 'Moscow' };
        const cityROM = { lat:  41.880, lon: 12.520,  country: 'Italy', name: 'Roma' };
        const cityLAX = { lat: 34.000, lon: -118.25,  country: 'US', name: 'Los Angeles' };

        this.flights = [
            { origin: cityDAL, dest: citySNG, color: 'Green' },
            { origin: cityMOS, dest: cityNZL, color: 'Red' },
            { origin: cityCHL, dest: cityJAP, color: 'Blue' },
            { origin: cityPAN, dest: cityROM, color: 'Orange' },
            { origin: cityALT, dest: cityJOH, color: 'Black' },
            { origin: cityNYC, dest: cityQTR, color: 'Purple' },
            { origin: cityLAX, dest: citySYD, color: 'Gray' },
        ];

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.updateZoomWindow({ left: 0.2, top: 0.1, width: 0.6, height: 0.6 });

        for (const flight of this.flights) {
            this.createPolylineSeries(flight);
            this.createSymbolSeries(flight);
        }

        // const url = 'https://static.infragistics.com/xplatform/data/UsaCitiesPopulation.csv';
        // console.log('SB loading ' + url);

        // fetch(url)
        //     .then((response) => response.text())
        //     .then(data => this.onDataLoaded(data));
    }

    public createSymbolSeries(flight: any)
    {
        const geoLocations = [flight.origin, flight.dest ];

        const symbolSeries = new IgcGeographicSymbolSeriesComponent();
        symbolSeries.dataSource = geoLocations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.latitudeMemberPath = 'lat';
        symbolSeries.longitudeMemberPath = 'lon';
        symbolSeries.markerBrush  = 'White';
        symbolSeries.markerOutline = flight.color;
        symbolSeries.thickness = 1;
        //symbolSeries.tooltipTemplate = this.createSymbolTooltip;

        this.geoMap.series.add(symbolSeries);
    }

    public createPolylineSeries(flight: any)
    {
        const geoPath = WorldUtils.calcPaths(flight.origin, flight.dest);
        const geoDistance = WorldUtils.calcDistance(flight.origin, flight.dest);
        const geoRoutes = [
            { points: geoPath ,
              origin: flight.origin,
              dest: flight.dest,
              distance: geoDistance,
              time: geoDistance / 850,
        }];

        const lineSeries = new IgcGeographicPolylineSeriesComponent();
        lineSeries.dataSource = geoRoutes;
        lineSeries.shapeMemberPath = 'points';
        lineSeries.shapeStrokeThickness = 9;
        lineSeries.shapeOpacity = 0.5;
        lineSeries.shapeStroke = flight.color;
        //lineSeries.tooltipTemplate = this.createPolylineTooltip;
        this.geoMap.series.add(lineSeries);
    }
}

new MapBindingDataModel();
