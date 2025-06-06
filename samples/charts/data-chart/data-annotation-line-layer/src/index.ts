import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataAnnotationLineLayerModule, IgcNumberAbbreviatorModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcFinancialPriceSeriesComponent, IgcDataToolTipLayerComponent, IgcDataAnnotationLineLayerComponent } from 'igniteui-webcomponents-charts';
import { StockTeslaItem, StockTesla } from './StockTesla';
import { AnnotationLineData1Item, AnnotationLineData1 } from './AnnotationLineData1';
import { AnnotationLineData2Item, AnnotationLineData2 } from './AnnotationLineData2';

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
            lineLayer52WeekRange.dataSource = this.annotationLineData1;
            lineLayer52WeekRange.targetAxis = this.yAxisRight;
            lineLayerGrowthAndDecline.dataSource = this.annotationLineData2;
            lineLayerGrowthAndDecline.targetAxis = this.xAxis;
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

    private _annotationLineData1: AnnotationLineData1 = null;
    public get annotationLineData1(): AnnotationLineData1 {
        if (this._annotationLineData1 == null)
        {
            this._annotationLineData1 = new AnnotationLineData1();
        }
        return this._annotationLineData1;
    }

    private _annotationLineData2: AnnotationLineData2 = null;
    public get annotationLineData2(): AnnotationLineData2 {
        if (this._annotationLineData2 == null)
        {
            this._annotationLineData2 = new AnnotationLineData2();
        }
        return this._annotationLineData2;
    }

}

new Sample();
