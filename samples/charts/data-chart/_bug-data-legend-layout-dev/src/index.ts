
// samples
// import { 
//     IgcDataChartCoreModule, 
//     IgcDataChartCategoryModule, 
//     IgcDataChartCategoryCoreModule, 

//     IgcDataChartFinancialCoreModule, 
//     IgcDataChartFinancialModule, 
//     IgcDataChartFinancialOverlaysModule, 

//     IgcDataChartInteractivityModule, 
//     IgcDataChartAnnotationModule, 
//     // IgcDataAnnotationStripLayerModule, 
//     // IgcDataAnnotationSliceLayerModule, 
//     // IgcDataAnnotationLineLayerModule, 
//     IgcNumberAbbreviatorModule, 
//     IgcAnnotationLayerProxyModule 
// } from 'igniteui-webcomponents-charts';
// import { 
//     IgcDataChartComponent, 
//     IgcCategoryXAxisComponent, 
//     IgcNumericYAxisComponent, 
//     IgcFinancialPriceSeriesComponent, 
//     IgcDataToolTipLayerComponent, 
//     // IgcDataAnnotationStripLayerComponent, 
//     // IgcDataAnnotationLineLayerComponent, 
//     // IgcDataAnnotationSliceLayerComponent 
// } from 'igniteui-webcomponents-charts';

// dev
import { IgcDataChartCoreModule } from 'igniteui-charts/igc-data-chart-core-module';
import { IgcDataChartCategoryModule } from 'igniteui-charts/igc-data-chart-category-module';
import { IgcDataChartCategoryCoreModule } from 'igniteui-charts/igc-data-chart-category-core-module';
import { IgcDataChartFinancialCoreModule }   from 'igniteui-charts/igc-data-chart-financial-core-module';
import { IgcDataChartFinancialModule } from 'igniteui-charts/igc-data-chart-financial-module';
import { IgcDataChartFinancialOverlaysModule } from 'igniteui-charts/igc-data-chart-financial-overlays-module';
import { IgcDataChartInteractivityModule } from 'igniteui-charts/igc-data-chart-interactivity-module';
import { IgcDataChartAnnotationModule } from 'igniteui-charts/igc-data-chart-annotation-module';
import { IgcNumberAbbreviatorModule } from 'igniteui-charts/igc-number-abbreviator-module';
import { IgcAnnotationLayerProxyModule } from 'igniteui-charts/igc-annotation-layer-proxy-module';
import { IgcDataToolTipLayerComponent } from 'igniteui-charts/igc-data-tool-tip-layer-component';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-charts/igc-financial-price-series-component';
import { IgcCategoryXAxisComponent } from 'igniteui-charts/igc-category-x-axis-component';
import { IgcNumericYAxisComponent } from 'igniteui-charts/igc-numeric-y-axis-component';
import { IgcDataChartComponent } from 'igniteui-charts/igc-data-chart-component';
import { IgcDataLegendComponent } from 'igniteui-charts/igc-data-legend-component';
import { IgcDataLegendModule } from 'igniteui-charts/igc-data-legend-module';




import { StockTeslaItem, StockTesla } from './StockTesla';
// import { AnnotationStripDataItem, AnnotationStripData } from './AnnotationStripData';
// import { AnnotationLineData1Item, AnnotationLineData1 } from './AnnotationLineData1';
// import { AnnotationLineData2Item, AnnotationLineData2 } from './AnnotationLineData2';
// import { AnnotationSliceStockSplitDataItem, AnnotationSliceStockSplitData } from './AnnotationSliceStockSplitData';
// import { AnnotationSliceEarningsMissDataItem, AnnotationSliceEarningsMissData } from './AnnotationSliceEarningsMissData';
// import { AnnotationSliceEarningsBeatDataItem, AnnotationSliceEarningsBeatData } from './AnnotationSliceEarningsBeatData';

import { ModuleManager } from 'igniteui-webcomponents-core';

// import "./index.css";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartFinancialCoreModule,
    IgcDataChartFinancialModule,
    IgcDataChartFinancialOverlaysModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    // IgcDataAnnotationStripLayerModule,
    // IgcDataAnnotationSliceLayerModule,
    // IgcDataAnnotationLineLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    // private xAxisBottom: IgcCategoryXAxisComponent
    private xAxis: IgcCategoryXAxisComponent
    // private xAxisTop: IgcCategoryXAxisComponent
    private yAxisLeft: IgcNumericYAxisComponent
    // private yAxisRight: IgcNumericYAxisComponent
    private series1: IgcFinancialPriceSeriesComponent
    // private tooltip: IgcDataToolTipLayerComponent
    // private stripLayer: IgcDataAnnotationStripLayerComponent
    // private lineLayer52WeekRange: IgcDataAnnotationLineLayerComponent
    // private lineLayerGrowthAndDecline: IgcDataAnnotationLineLayerComponent
    // private sliceLayerStockSplit: IgcDataAnnotationSliceLayerComponent
    // private sliceLayerEarningsMissAnnotations: IgcDataAnnotationSliceLayerComponent
    // private sliceLayerEarningsBeatAnnotations: IgcDataAnnotationSliceLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        // var xAxisBottom = this.xAxisBottom = document.getElementById('xAxisBottom') as IgcCategoryXAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        // var xAxisTop = this.xAxisTop = document.getElementById('xAxisTop') as IgcCategoryXAxisComponent;
        var yAxisLeft = this.yAxisLeft = document.getElementById('yAxisLeft') as IgcNumericYAxisComponent;
        // var yAxisRight = this.yAxisRight = document.getElementById('yAxisRight') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        // var tooltip = this.tooltip = document.getElementById('Tooltip') as IgcDataToolTipLayerComponent;
        // var stripLayer = this.stripLayer = document.getElementById('StripLayer') as IgcDataAnnotationStripLayerComponent;
        // var lineLayer52WeekRange = this.lineLayer52WeekRange = document.getElementById('LineLayer52WeekRange') as IgcDataAnnotationLineLayerComponent;
        // var lineLayerGrowthAndDecline = this.lineLayerGrowthAndDecline = document.getElementById('LineLayerGrowthAndDecline') as IgcDataAnnotationLineLayerComponent;
        // var sliceLayerStockSplit = this.sliceLayerStockSplit = document.getElementById('SliceLayerStockSplit') as IgcDataAnnotationSliceLayerComponent;
        // var sliceLayerEarningsMissAnnotations = this.sliceLayerEarningsMissAnnotations = document.getElementById('SliceLayerEarningsMissAnnotations') as IgcDataAnnotationSliceLayerComponent;
        // var sliceLayerEarningsBeatAnnotations = this.sliceLayerEarningsBeatAnnotations = document.getElementById('SliceLayerEarningsBeatAnnotations') as IgcDataAnnotationSliceLayerComponent;

        this._bind = () => {
            // xAxisBottom.dataSource = this.stockTesla;
            xAxis.dataSource = this.stockTesla;
            // xAxisTop.dataSource = this.stockTesla;
            series1.xAxis = this.xAxis;
            series1.yAxis = this.yAxisLeft;
            series1.dataSource = this.stockTesla;
            // stripLayer.dataSource = this.annotationStripData;
            // stripLayer.targetAxis = this.xAxisTop;
            // lineLayer52WeekRange.dataSource = this.annotationLineData1;
            // lineLayer52WeekRange.targetAxis = this.yAxisRight;
            // lineLayerGrowthAndDecline.dataSource = this.annotationLineData2;
            // lineLayerGrowthAndDecline.targetAxis = this.xAxis;
            // sliceLayerStockSplit.dataSource = this.annotationSliceStockSplitData;
            // sliceLayerStockSplit.targetAxis = this.xAxisBottom;
            // sliceLayerEarningsMissAnnotations.dataSource = this.annotationSliceEarningsMissData;
            // sliceLayerEarningsMissAnnotations.targetAxis = this.xAxisBottom;
            // sliceLayerEarningsBeatAnnotations.dataSource = this.annotationSliceEarningsBeatData;
            // sliceLayerEarningsBeatAnnotations.targetAxis = this.xAxisBottom;
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

    // private _annotationStripData: AnnotationStripData = null;
    // public get annotationStripData(): AnnotationStripData {
    //     if (this._annotationStripData == null)
    //     {
    //         this._annotationStripData = new AnnotationStripData();
    //     }
    //     return this._annotationStripData;
    // }

    // private _annotationLineData1: AnnotationLineData1 = null;
    // public get annotationLineData1(): AnnotationLineData1 {
    //     if (this._annotationLineData1 == null)
    //     {
    //         this._annotationLineData1 = new AnnotationLineData1();
    //     }
    //     return this._annotationLineData1;
    // }

    // private _annotationLineData2: AnnotationLineData2 = null;
    // public get annotationLineData2(): AnnotationLineData2 {
    //     if (this._annotationLineData2 == null)
    //     {
    //         this._annotationLineData2 = new AnnotationLineData2();
    //     }
    //     return this._annotationLineData2;
    // }

    // private _annotationSliceStockSplitData: AnnotationSliceStockSplitData = null;
    // public get annotationSliceStockSplitData(): AnnotationSliceStockSplitData {
    //     if (this._annotationSliceStockSplitData == null)
    //     {
    //         this._annotationSliceStockSplitData = new AnnotationSliceStockSplitData();
    //     }
    //     return this._annotationSliceStockSplitData;
    // }

    // private _annotationSliceEarningsMissData: AnnotationSliceEarningsMissData = null;
    // public get annotationSliceEarningsMissData(): AnnotationSliceEarningsMissData {
    //     if (this._annotationSliceEarningsMissData == null)
    //     {
    //         this._annotationSliceEarningsMissData = new AnnotationSliceEarningsMissData();
    //     }
    //     return this._annotationSliceEarningsMissData;
    // }

    // private _annotationSliceEarningsBeatData: AnnotationSliceEarningsBeatData = null;
    // public get annotationSliceEarningsBeatData(): AnnotationSliceEarningsBeatData {
    //     if (this._annotationSliceEarningsBeatData == null)
    //     {
    //         this._annotationSliceEarningsBeatData = new AnnotationSliceEarningsBeatData();
    //     }
    //     return this._annotationSliceEarningsBeatData;
    // }

}

new Sample();
