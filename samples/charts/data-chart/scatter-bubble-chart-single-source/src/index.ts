import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcSizeScaleComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { WorldDebtAndPopulationItem, WorldDebtAndPopulation } from './WorldDebtAndPopulation';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private _sizeScale1: IgcSizeScaleComponent | null = null;
    public get sizeScale1(): IgcSizeScaleComponent {
        if (this._sizeScale1 == null)
        {
            var sizeScale1 = new IgcSizeScaleComponent();
            sizeScale1.isLogarithmic = false;
            sizeScale1.minimumValue = 10;
            sizeScale1.maximumValue = 50;

            this._sizeScale1 = sizeScale1;
        }
        return this._sizeScale1;
    }
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            bubbleSeries1.radiusScale = this.sizeScale1;
            bubbleSeries1.xAxis = this.xAxis;
            bubbleSeries1.yAxis = this.yAxis;
            bubbleSeries1.dataSource = this.worldDebtAndPopulation;
        }
        this._bind();

    }

    private _worldDebtAndPopulation: WorldDebtAndPopulation = null;
    public get worldDebtAndPopulation(): WorldDebtAndPopulation {
        if (this._worldDebtAndPopulation == null)
        {
            this._worldDebtAndPopulation = new WorldDebtAndPopulation();
        }
        return this._worldDebtAndPopulation;
    }

}

new Sample();
