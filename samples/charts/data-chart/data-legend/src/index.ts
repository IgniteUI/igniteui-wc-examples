import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataLegendModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcSizeScaleComponent, IgcCrosshairLayerComponent } from 'igniteui-webcomponents-charts';
import { CountryDemographicAfricanItem, CountryDemographicAfrican } from './CountryDemographicAfrican';
import { CountryDemographicEuropeItem, CountryDemographicEurope } from './CountryDemographicEurope';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

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
    private _sizeScale1: IgcSizeScaleComponent | null = null;
    public get sizeScale1(): IgcSizeScaleComponent {
        if (this._sizeScale1 == null)
        {
            var SizeScale1 = new IgcSizeScaleComponent();

            SizeScale1.minimumValue = 10;
            SizeScale1.maximumValue = 50;

            this._sizeScale1 = SizeScale1;
        }
        return this._sizeScale1;
    }
    private bubbleSeries2: IgcBubbleSeriesComponent
    private _sizeScale2: IgcSizeScaleComponent | null = null;
    public get sizeScale2(): IgcSizeScaleComponent {
        if (this._sizeScale2 == null)
        {
            var SizeScale2 = new IgcSizeScaleComponent();

            SizeScale2.minimumValue = 10;
            SizeScale2.maximumValue = 50;

            this._sizeScale2 = SizeScale2;
        }
        return this._sizeScale2;
    }
    private crosshairLayer: IgcCrosshairLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var bubbleSeries2 = this.bubbleSeries2 = document.getElementById('BubbleSeries2') as IgcBubbleSeriesComponent;
        var crosshairLayer = this.crosshairLayer = document.getElementById('CrosshairLayer') as IgcCrosshairLayerComponent;

        this._bind = () => {
            legend.target = this.chart;
            bubbleSeries1.xAxis = this.xAxis;
            bubbleSeries1.yAxis = this.yAxis;
            bubbleSeries1.dataSource = this.countryDemographicAfrican;
            bubbleSeries1.radiusScale = this.sizeScale1;
            bubbleSeries2.xAxis = this.xAxis;
            bubbleSeries2.yAxis = this.yAxis;
            bubbleSeries2.dataSource = this.countryDemographicEurope;
            bubbleSeries2.radiusScale = this.sizeScale2;
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
