import { IgcLegendModule, IgcDataChartAnnotationModule, IgcDataChartCoreModule, IgcDataChartCategoryCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcCategoryHighlightLayerComponent, IgcBarSeriesComponent, IgcCalloutLayerComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { RoadblocksToSuccessItem, RoadblocksToSuccess } from './RoadblocksToSuccess';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartAnnotationModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private yAxis1: IgcCategoryYAxisComponent
    private yAxis2: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private categoryHighlightLayer: IgcCategoryHighlightLayerComponent
    private barSeries1: IgcBarSeriesComponent
    private barSeries2: IgcBarSeriesComponent
    private calloutLayer1: IgcCalloutLayerComponent
    private calloutLayer2: IgcCalloutLayerComponent
    private tooltips: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('Chart') as IgcDataChartComponent;
        var yAxis1 = this.yAxis1 = document.getElementById('yAxis1') as IgcCategoryYAxisComponent;
        var yAxis2 = this.yAxis2 = document.getElementById('yAxis2') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var categoryHighlightLayer = this.categoryHighlightLayer = document.getElementById('CategoryHighlightLayer') as IgcCategoryHighlightLayerComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;
        var barSeries2 = this.barSeries2 = document.getElementById('BarSeries2') as IgcBarSeriesComponent;
        var calloutLayer1 = this.calloutLayer1 = document.getElementById('CalloutLayer1') as IgcCalloutLayerComponent;
        var calloutLayer2 = this.calloutLayer2 = document.getElementById('CalloutLayer2') as IgcCalloutLayerComponent;
        var tooltips = this.tooltips = document.getElementById('Tooltips') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend
            yAxis1.dataSource = this.roadblocksToSuccess
            yAxis2.dataSource = this.roadblocksToSuccess
            barSeries1.xAxis = this.xAxis
            barSeries1.yAxis = this.yAxis1
            barSeries1.dataSource = this.roadblocksToSuccess
            barSeries2.xAxis = this.xAxis
            barSeries2.yAxis = this.yAxis2
            barSeries2.dataSource = this.roadblocksToSuccess
            calloutLayer1.dataSource = this.roadblocksToSuccess
            calloutLayer2.dataSource = this.roadblocksToSuccess
        }
        this._bind();

    }

    private _roadblocksToSuccess: RoadblocksToSuccess = null;
    public get roadblocksToSuccess(): RoadblocksToSuccess {
        if (this._roadblocksToSuccess == null)
        {
            this._roadblocksToSuccess = new RoadblocksToSuccess();
        }
        return this._roadblocksToSuccess;
    }

}

new Sample();
