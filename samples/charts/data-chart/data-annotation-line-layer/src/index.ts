import { AnnotationData1Item, AnnotationData1, AnnotationData2Item, AnnotationData2 } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataAnnotationLineLayerModule, IgcNumberAbbreviatorModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcFinancialPriceSeriesComponent, IgcDataToolTipLayerComponent, IgcDataAnnotationLineLayerComponent } from 'igniteui-webcomponents-charts';
import { StockTeslaItem, StockTesla } from './StockTesla';

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
    IgcDataAnnotationLineLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxisLeft: IgcNumericYAxisComponent
    private yAxisRight: IgcNumericYAxisComponent
    private series1: IgcFinancialPriceSeriesComponent
    private tooltip: IgcDataToolTipLayerComponent
    private lineLayer52WeekRange: IgcDataAnnotationLineLayerComponent
    private lineLayerGrowthAndDecline: IgcDataAnnotationLineLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxisLeft = this.yAxisLeft = document.getElementById('yAxisLeft') as IgcNumericYAxisComponent;
        var yAxisRight = this.yAxisRight = document.getElementById('yAxisRight') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        var tooltip = this.tooltip = document.getElementById('Tooltip') as IgcDataToolTipLayerComponent;
        var lineLayer52WeekRange = this.lineLayer52WeekRange = document.getElementById('LineLayer52WeekRange') as IgcDataAnnotationLineLayerComponent;
        var lineLayerGrowthAndDecline = this.lineLayerGrowthAndDecline = document.getElementById('LineLayerGrowthAndDecline') as IgcDataAnnotationLineLayerComponent;

        this._bind = () => {
            xAxis.dataSource = this.stockTesla;
            series1.xAxis = this.xAxis;
            series1.yAxis = this.yAxisLeft;
            series1.dataSource = this.stockTesla;
            lineLayer52WeekRange.dataSource = this.annotationData1;
            lineLayer52WeekRange.targetAxis = this.yAxisRight;
            lineLayerGrowthAndDecline.dataSource = this.annotationData2;
            lineLayerGrowthAndDecline.targetAxis = this.xAxis;
        }
        this._bind();

    }

    private _annotationData1: AnnotationData1 = null;
    public get annotationData1(): AnnotationData1 {
        if (this._annotationData1 == null)
        {
            this._annotationData1 = new AnnotationData1();
        }
        return this._annotationData1;
    }

    private _annotationData2: AnnotationData2 = null;
    public get annotationData2(): AnnotationData2 {
        if (this._annotationData2 == null)
        {
            this._annotationData2 = new AnnotationData2();
        }
        return this._annotationData2;
    }

    private _stockTesla: StockTesla = null;
    public get stockTesla(): StockTesla {
        if (this._stockTesla == null)
        {
            this._stockTesla = new StockTesla();
        }
        return this._stockTesla;
    }

}

new Sample();
