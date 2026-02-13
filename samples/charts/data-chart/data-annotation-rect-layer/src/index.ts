import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataAnnotationRectLayerModule, IgcNumberAbbreviatorModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcFinancialPriceSeriesComponent, IgcDataToolTipLayerComponent, IgcDataAnnotationRectLayerComponent } from 'igniteui-webcomponents-charts';
import { StockTeslaItem, StockTesla } from './StockTesla';
import { AnnotationRectDataItem, AnnotationRectData } from './AnnotationRectData';

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
    IgcDataAnnotationRectLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private series1: IgcFinancialPriceSeriesComponent
    private tooltip: IgcDataToolTipLayerComponent
    private rectLayer: IgcDataAnnotationRectLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        var tooltip = this.tooltip = document.getElementById('Tooltip') as IgcDataToolTipLayerComponent;
        var rectLayer = this.rectLayer = document.getElementById('RectLayer') as IgcDataAnnotationRectLayerComponent;

        this._bind = () => {
            xAxis.dataSource = this.stockTesla;
            series1.xAxis = this.xAxis;
            series1.yAxis = this.yAxis;
            series1.dataSource = this.stockTesla;
            rectLayer.dataSource = this.annotationRectData;
            rectLayer.targetAxis = this.xAxis;
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

    private _annotationRectData: AnnotationRectData = null;
    public get annotationRectData(): AnnotationRectData {
        if (this._annotationRectData == null)
        {
            this._annotationRectData = new AnnotationRectData();
        }
        return this._annotationRectData;
    }

}

export function initialize() {
  return new Sample();
}