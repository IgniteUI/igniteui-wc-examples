import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataLegendModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcSizeScaleComponent, IgcCrosshairLayerComponent } from 'igniteui-webcomponents-charts';
import { CountryDemographicAfricanItem, CountryDemographicAfrican } from './CountryDemographicAfrican';
import { CountryDemographicEuropeItem, CountryDemographicEurope } from './CountryDemographicEurope';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataLegendModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private sizeScale1: IgcSizeScaleComponent
    private bubbleSeries2: IgcBubbleSeriesComponent
    private sizeScale2: IgcSizeScaleComponent
    private crosshairLayer: IgcCrosshairLayerComponent

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var sizeScale1 = this.sizeScale1 = document.getElementById('SizeScale1') as IgcSizeScaleComponent;
        var bubbleSeries2 = this.bubbleSeries2 = document.getElementById('BubbleSeries2') as IgcBubbleSeriesComponent;
        var sizeScale2 = this.sizeScale2 = document.getElementById('SizeScale2') as IgcSizeScaleComponent;
        var crosshairLayer = this.crosshairLayer = document.getElementById('CrosshairLayer') as IgcCrosshairLayerComponent;

        this._bind = () => {
            legend.target = this.chart
            bubbleSeries1.xAxis = this.xAxis
            bubbleSeries1.yAxis = this.yAxis
            bubbleSeries1.dataSource = this.countryDemographicAfrican
            bubbleSeries2.xAxis = this.xAxis
            bubbleSeries2.yAxis = this.yAxis
            bubbleSeries2.dataSource = this.countryDemographicEurope
        }
        this._bind();
    }

    private _countryDemographicAfrican: CountryDemographicAfrican = null;
    public get countryDemographicAfrican(): CountryDemographicAfrican {
        if (this._countryDemographicAfrican == null)
        {
            this._countryDemographicAfrican = new CountryDemographicAfrican();
        }
        return this._countryDemographicAfrican;
    }
    
    private _countryDemographicEurope: CountryDemographicEurope = null;
    public get countryDemographicEurope(): CountryDemographicEurope {
        if (this._countryDemographicEurope == null)
        {
            this._countryDemographicEurope = new CountryDemographicEurope();
        }
        return this._countryDemographicEurope;
    }
    



}

new Sample();
