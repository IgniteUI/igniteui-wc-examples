import { SizeScaleItem } from './SampleData';
import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryDemographicEuropeItem, CountryDemographicEurope } from './CountryDemographicEurope';

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

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;

        this._bind = () => {
            bubbleSeries1.xAxis = this.xAxis
            bubbleSeries1.yAxis = this.yAxis
            bubbleSeries1.dataSource = this.countryDemographicEurope
        }
        this._bind();
    }

    private _sizeScale: SizeScaleItem = null;
    public get sizeScale(): SizeScaleItem {
        if (this._sizeScale == null)
        {
            this._sizeScale = 
            new SizeScaleItem(
            {
                type: `SizeScale`,
                minimumValue: 10,
                maximumValue: 50
            })}
            return this._sizeScale;
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
