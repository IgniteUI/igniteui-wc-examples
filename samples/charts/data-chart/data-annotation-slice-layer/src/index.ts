import { AnnotationData1Item, AnnotationData1, AnnotationData2Item, AnnotationData2, AnnotationData3Item, AnnotationData3 } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataAnnotationSliceLayerModule, IgcNumberAbbreviatorModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcFinancialPriceSeriesComponent, IgcDataToolTipLayerComponent, IgcDataAnnotationSliceLayerComponent } from 'igniteui-webcomponents-charts';
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
    IgcDataAnnotationSliceLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxisBottom: IgcCategoryXAxisComponent
    private xAxisTop: IgcCategoryXAxisComponent
    private yAxisLeft: IgcNumericYAxisComponent
    private yAxisRight: IgcNumericYAxisComponent
    private series1: IgcFinancialPriceSeriesComponent
    private tooltip: IgcDataToolTipLayerComponent
    private sliceLayerStockSplit: IgcDataAnnotationSliceLayerComponent
    private sliceLayerEarningsMissAnnotations: IgcDataAnnotationSliceLayerComponent
    private sliceLayerEarningsBeatAnnotations: IgcDataAnnotationSliceLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxisBottom = this.xAxisBottom = document.getElementById('xAxisBottom') as IgcCategoryXAxisComponent;
        var xAxisTop = this.xAxisTop = document.getElementById('xAxisTop') as IgcCategoryXAxisComponent;
        var yAxisLeft = this.yAxisLeft = document.getElementById('yAxisLeft') as IgcNumericYAxisComponent;
        var yAxisRight = this.yAxisRight = document.getElementById('yAxisRight') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        var tooltip = this.tooltip = document.getElementById('Tooltip') as IgcDataToolTipLayerComponent;
        var sliceLayerStockSplit = this.sliceLayerStockSplit = document.getElementById('SliceLayerStockSplit') as IgcDataAnnotationSliceLayerComponent;
        var sliceLayerEarningsMissAnnotations = this.sliceLayerEarningsMissAnnotations = document.getElementById('SliceLayerEarningsMissAnnotations') as IgcDataAnnotationSliceLayerComponent;
        var sliceLayerEarningsBeatAnnotations = this.sliceLayerEarningsBeatAnnotations = document.getElementById('SliceLayerEarningsBeatAnnotations') as IgcDataAnnotationSliceLayerComponent;

        this._bind = () => {
            xAxisBottom.dataSource = this.stockTesla;
            xAxisTop.dataSource = this.stockTesla;
            series1.xAxis = this.xAxisTop;
            series1.yAxis = this.yAxisLeft;
            series1.dataSource = this.stockTesla;
            sliceLayerStockSplit.dataSource = this.annotationData1;
            sliceLayerStockSplit.targetAxis = this.xAxisBottom;
            sliceLayerEarningsMissAnnotations.dataSource = this.annotationData2;
            sliceLayerEarningsMissAnnotations.targetAxis = this.xAxisBottom;
            sliceLayerEarningsBeatAnnotations.dataSource = this.annotationData3;
            sliceLayerEarningsBeatAnnotations.targetAxis = this.xAxisBottom;
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

    private _annotationData3: AnnotationData3 = null;
    public get annotationData3(): AnnotationData3 {
        if (this._annotationData3 == null)
        {
            this._annotationData3 = new AnnotationData3();
        }
        return this._annotationData3;
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
