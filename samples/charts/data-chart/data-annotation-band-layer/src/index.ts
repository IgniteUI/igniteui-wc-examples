import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataAnnotationBandLayerModule, IgcNumberAbbreviatorModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcFinancialPriceSeriesComponent, IgcDataToolTipLayerComponent, IgcDataAnnotationBandLayerComponent } from 'igniteui-webcomponents-charts';
import { StockTeslaItem, StockTesla } from './StockTesla';
import { AnnotationBandDataItem, AnnotationBandData } from './AnnotationBandData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartFinancialCoreModule,
    IgcDataChartFinancialModule,
    IgcDataChartFinancialOverlaysModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcDataAnnotationBandLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxisBottom: IgcCategoryXAxisComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxisLeft: IgcNumericYAxisComponent
    private yAxisRight: IgcNumericYAxisComponent
    private series1: IgcFinancialPriceSeriesComponent
    private tooltip: IgcDataToolTipLayerComponent
    private bandLayer: IgcDataAnnotationBandLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxisBottom = this.xAxisBottom = document.getElementById('xAxisBottom') as IgcCategoryXAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxisLeft = this.yAxisLeft = document.getElementById('yAxisLeft') as IgcNumericYAxisComponent;
        var yAxisRight = this.yAxisRight = document.getElementById('yAxisRight') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        var tooltip = this.tooltip = document.getElementById('Tooltip') as IgcDataToolTipLayerComponent;
        var bandLayer = this.bandLayer = document.getElementById('BandLayer') as IgcDataAnnotationBandLayerComponent;

        this._bind = () => {
            xAxisBottom.dataSource = this.stockTesla;
            xAxis.dataSource = this.stockTesla;
            series1.xAxis = this.xAxis;
            series1.yAxis = this.yAxisLeft;
            series1.dataSource = this.stockTesla;
            bandLayer.dataSource = this.annotationBandData;
            bandLayer.targetAxis = this.xAxisBottom;
        }
        this._bind();

    }

    private _stockTesla: StockTesla = null;
    public get stockTesla(): StockTesla {
        if (this._stockTesla == null)
        {
            this._stockTesla = new StockTesla();
        }
        return this._stockTesla;
    }

    private _annotationBandData: AnnotationBandData = null;
    public get annotationBandData(): AnnotationBandData {
        if (this._annotationBandData == null)
        {
            this._annotationBandData = new AnnotationBandData();
        }
        return this._annotationBandData;
    }

}

export function initialize() {
  return new Sample();
}