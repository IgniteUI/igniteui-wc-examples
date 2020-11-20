
import { WorldUtils } from './WorldUtils';

import { html } from 'lit-html';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { DataContext } from 'igniteui-webcomponents-core';

import { ModuleManager } from 'igniteui-webcomponents-core';


ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapCustomTooltips {






    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.createSymbolSeries = this.createSymbolSeries.bind(this);
        this.createSymbolTooltip = this.createSymbolTooltip.bind(this);



        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        const geoRegion = { height: 170, left: -180, top: -85.0, width: 360 };
        this.geoMap.zoomToGeographic(geoRegion);

        const cityQTR = { lat: 25.285, lon: 51.531, isoCode: 'qat', name: 'Doha' };
        const cityPAN = { lat: 8.949, lon: -79.400, isoCode: 'pan', name: 'Panama' };
        const cityCHL = { lat: -33.475, lon: -70.647, isoCode: 'chl', name: 'Santiago' };
        const cityJAP = { lat: 35.683, lon: 139.809, isoCode: 'jpn', name: 'Tokyo' };
        const cityNYC = { lat: 40.750, lon: -74.0999, isoCode: 'usa', name: 'New York' };
        const citySNG = { lat: 1.229, lon: 104.177, isoCode: 'sgp', name: 'Singapore' };
        const cityMOS = { lat: 55.750, lon: 37.700, isoCode: 'rus', name: 'Moscow' };
        const cityLAX = { lat: 34.000, lon: -118.25, isoCode: 'usa', name: 'Los Angeles' };

        const AmericanCities = [cityCHL, cityPAN, cityNYC, cityLAX];
        const AsianCities = [citySNG, cityMOS, cityJAP, cityQTR];

        this.createSymbolSeries(AmericanCities, 'Green');
        this.createSymbolSeries(AsianCities, 'Red');
    }

    public createSymbolSeries(geoLocations: any[], brush: string) {
        const symbolSeries = new IgcGeographicSymbolSeriesComponent();
        symbolSeries.name = 'symbolSeries';
        symbolSeries.dataSource = geoLocations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.latitudeMemberPath = 'lat';
        symbolSeries.longitudeMemberPath = 'lon';
        symbolSeries.markerBrush = 'White';
        symbolSeries.markerOutline = brush;
        symbolSeries.thickness = 1;
        symbolSeries.tooltipTemplate = this.createSymbolTooltip;

        this.geoMap.series.add(symbolSeries);
    }

    public createSymbolTooltip(context: any) {
        const dataContext = context as DataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const iso = dataItem.isoCode.toUpperCase();
        const lat = WorldUtils.toStringLat(dataItem.lat);
        const lon = WorldUtils.toStringLon(dataItem.lon);
        const scr = 'https://static.infragistics.com/xplatform' + '/images/' + dataItem.isoCode.toLowerCase() + '.svg';

        let tooltip = html`<div>
        <div class='tooltipFlagBoarder'>
            <img class='tooltipFlagImage' src='${scr}' />
        </div>
        <div style='display: 'inline-block', marginLeft: 5'>
            <div class='tooltipBox'>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>City:</div>
                    <div class='tooltipVal' style='color: ${context.series.markerOutline};'>${dataItem.name}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Latitude:</div>
                    <div class='tooltipVal' style='color: ${dataContext.series.markerOutline};'>${lat} </div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Longitude:</div>
                    <div class='tooltipVal' style='color: ${dataContext.series.markerOutline};'>${lon}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>ISO Code:</div>
                    <div class='tooltipVal' style='color: ${dataContext.series.markerOutline};'>${iso}</div>
                </div>
            </div>
        </div>`;

    return tooltip;
    }


    public onDataLoaded(csvData: string) {
        const csvLines = csvData.split('\n');
        console.log('SB loaded records ' + csvLines.length);
    }
}

let sample = new MapCustomTooltips();