import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { CountryStatsAfricaItem, CountryStatsAfrica } from './CountryStatsAfrica';
import { CountryStatsEuropeItem, CountryStatsEurope } from './CountryStatsEurope';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private bubbleSeries2: IgcBubbleSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var bubbleSeries2 = this.bubbleSeries2 = document.getElementById('BubbleSeries2') as IgcBubbleSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            bubbleSeries1.xAxis = this.xAxis;
            bubbleSeries1.yAxis = this.yAxis;
            bubbleSeries1.dataSource = this.countryStatsAfrica;
            bubbleSeries2.xAxis = this.xAxis;
            bubbleSeries2.yAxis = this.yAxis;
            bubbleSeries2.dataSource = this.countryStatsEurope;
        }
        this._bind();

    }

    private _countryStatsAfrica: CountryStatsAfrica = null;
    public get countryStatsAfrica(): CountryStatsAfrica {
        if (this._countryStatsAfrica == null)
        {
            this._countryStatsAfrica = new CountryStatsAfrica();
        }
        return this._countryStatsAfrica;
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
