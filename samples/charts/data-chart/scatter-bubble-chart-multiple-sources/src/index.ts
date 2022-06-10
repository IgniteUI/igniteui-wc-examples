import { SizeScale1Item, SizeScale2Item } from './SampleData';
import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryDemographicAfricanItem, CountryDemographicAfrican } from './CountryDemographicAfrican';
import { CountryDemographicEuropeItem, CountryDemographicEurope } from './CountryDemographicEurope';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private bubbleSeries2: IgcBubbleSeriesComponent

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var bubbleSeries2 = this.bubbleSeries2 = document.getElementById('BubbleSeries2') as IgcBubbleSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend
            bubbleSeries1.xAxis = this.xAxis
            bubbleSeries1.yAxis = this.yAxis
            bubbleSeries1.dataSource = this.countryDemographicAfrican
            bubbleSeries2.xAxis = this.xAxis
            bubbleSeries2.yAxis = this.yAxis
            bubbleSeries2.dataSource = this.countryDemographicEurope
        }
        this._bind();
    }

    private _sizeScale1: SizeScale1Item = null;
    public get sizeScale1(): SizeScale1Item {
        if (this._sizeScale1 == null)
        {
            this._sizeScale1 = 
            new SizeScale1Item(
            {
                type: `SizeScale`,
                minimumValue: 10,
                maximumValue: 50
            })}
            return this._sizeScale1;
        }
        
        private _sizeScale2: SizeScale2Item = null;
        public get sizeScale2(): SizeScale2Item {
            if (this._sizeScale2 == null)
            {
                this._sizeScale2 = 
                new SizeScale2Item(
                {
                    type: `SizeScale`,
                    minimumValue: 10,
                    maximumValue: 50
                })}
                return this._sizeScale2;
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
