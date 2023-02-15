import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { CountryStatsEuropeItem, CountryStatsEurope } from './CountryStatsEurope';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            bubbleSeries1.xAxis = this.xAxis
            bubbleSeries1.yAxis = this.yAxis
            bubbleSeries1.dataSource = this.countryStatsEurope
        }
        this._bind();

    }

    private _countryStatsEurope: CountryStatsEurope = null;
    public get countryStatsEurope(): CountryStatsEurope {
        if (this._countryStatsEurope == null)
        {
            this._countryStatsEurope = new CountryStatsEurope();
        }
        return this._countryStatsEurope;
    }
    


}

new Sample();
