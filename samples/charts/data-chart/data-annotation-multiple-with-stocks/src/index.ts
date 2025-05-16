import { StripAnnotationDataItem, StripAnnotationData, LineAnnotationData1Item, LineAnnotationData1, LineAnnotationData2Item, LineAnnotationData2, SliceAnnotationData1Item, SliceAnnotationData1, SliceAnnotationData2Item, SliceAnnotationData2, SliceAnnotationData3Item, SliceAnnotationData3 } from './SampleData';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataAnnotationStripLayerModule, IgcDataAnnotationSliceLayerModule, IgcDataAnnotationLineLayerModule, IgcNumberAbbreviatorModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcFinancialPriceSeriesComponent, IgcDataToolTipLayerComponent, IgcDataAnnotationStripLayerComponent, IgcDataAnnotationLineLayerComponent, IgcDataAnnotationSliceLayerComponent } from 'igniteui-webcomponents-charts';
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
    IgcDataAnnotationStripLayerModule,
    IgcDataAnnotationSliceLayerModule,
    IgcDataAnnotationLineLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxisBottom: IgcCategoryXAxisComponent
    private xAxis: IgcCategoryXAxisComponent
    private xAxisTop: IgcCategoryXAxisComponent
    private yAxisLeft: IgcNumericYAxisComponent
    private yAxisRight: IgcNumericYAxisComponent
    private series1: IgcFinancialPriceSeriesComponent
    private tooltip: IgcDataToolTipLayerComponent
    private stripLayer: IgcDataAnnotationStripLayerComponent
    private lineLayer52WeekRange: IgcDataAnnotationLineLayerComponent
    private lineLayerGrowthAndDecline: IgcDataAnnotationLineLayerComponent
    private sliceLayerStockSplit: IgcDataAnnotationSliceLayerComponent
    private sliceLayerEarningsMissAnnotations: IgcDataAnnotationSliceLayerComponent
    private sliceLayerEarningsBeatAnnotations: IgcDataAnnotationSliceLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxisBottom = this.xAxisBottom = document.getElementById('xAxisBottom') as IgcCategoryXAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var xAxisTop = this.xAxisTop = document.getElementById('xAxisTop') as IgcCategoryXAxisComponent;
        var yAxisLeft = this.yAxisLeft = document.getElementById('yAxisLeft') as IgcNumericYAxisComponent;
        var yAxisRight = this.yAxisRight = document.getElementById('yAxisRight') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        var tooltip = this.tooltip = document.getElementById('Tooltip') as IgcDataToolTipLayerComponent;
        var stripLayer = this.stripLayer = document.getElementById('StripLayer') as IgcDataAnnotationStripLayerComponent;
        var lineLayer52WeekRange = this.lineLayer52WeekRange = document.getElementById('LineLayer52WeekRange') as IgcDataAnnotationLineLayerComponent;
        var lineLayerGrowthAndDecline = this.lineLayerGrowthAndDecline = document.getElementById('LineLayerGrowthAndDecline') as IgcDataAnnotationLineLayerComponent;
        var sliceLayerStockSplit = this.sliceLayerStockSplit = document.getElementById('SliceLayerStockSplit') as IgcDataAnnotationSliceLayerComponent;
        var sliceLayerEarningsMissAnnotations = this.sliceLayerEarningsMissAnnotations = document.getElementById('SliceLayerEarningsMissAnnotations') as IgcDataAnnotationSliceLayerComponent;
        var sliceLayerEarningsBeatAnnotations = this.sliceLayerEarningsBeatAnnotations = document.getElementById('SliceLayerEarningsBeatAnnotations') as IgcDataAnnotationSliceLayerComponent;

        this._bind = () => {
            xAxisBottom.dataSource = this.stockTesla;
            xAxis.dataSource = this.stockTesla;
            xAxisTop.dataSource = this.stockTesla;
            series1.xAxis = this.xAxis;
            series1.yAxis = this.yAxisLeft;
            series1.dataSource = this.stockTesla;
            stripLayer.dataSource = this.stripAnnotationData;
            stripLayer.targetAxis = this.xAxisTop;
            lineLayer52WeekRange.dataSource = this.lineAnnotationData1;
            lineLayer52WeekRange.targetAxis = this.yAxisRight;
            lineLayerGrowthAndDecline.dataSource = this.lineAnnotationData2;
            lineLayerGrowthAndDecline.targetAxis = this.xAxis;
            sliceLayerStockSplit.dataSource = this.sliceAnnotationData1;
            sliceLayerStockSplit.targetAxis = this.xAxisBottom;
            sliceLayerEarningsMissAnnotations.dataSource = this.sliceAnnotationData2;
            sliceLayerEarningsMissAnnotations.targetAxis = this.xAxisBottom;
            sliceLayerEarningsBeatAnnotations.dataSource = this.sliceAnnotationData3;
            sliceLayerEarningsBeatAnnotations.targetAxis = this.xAxisBottom;
        }
        this._bind();

    }

    private _stripAnnotationData: StripAnnotationData = null;
    public get stripAnnotationData(): StripAnnotationData {
        if (this._stripAnnotationData == null)
        {
            this._stripAnnotationData = new StripAnnotationData();
        }
        return this._stripAnnotationData;
    }

    private _lineAnnotationData1: LineAnnotationData1 = null;
    public get lineAnnotationData1(): LineAnnotationData1 {
        if (this._lineAnnotationData1 == null)
        {
            this._lineAnnotationData1 = new LineAnnotationData1();
        }
        return this._lineAnnotationData1;
    }

    private _lineAnnotationData2: LineAnnotationData2 = null;
    public get lineAnnotationData2(): LineAnnotationData2 {
        if (this._lineAnnotationData2 == null)
        {
            this._lineAnnotationData2 = new LineAnnotationData2();
        }
        return this._lineAnnotationData2;
    }

    private _sliceAnnotationData1: SliceAnnotationData1 = null;
    public get sliceAnnotationData1(): SliceAnnotationData1 {
        if (this._sliceAnnotationData1 == null)
        {
            this._sliceAnnotationData1 = new SliceAnnotationData1();
        }
        return this._sliceAnnotationData1;
    }

    private _sliceAnnotationData2: SliceAnnotationData2 = null;
    public get sliceAnnotationData2(): SliceAnnotationData2 {
        if (this._sliceAnnotationData2 == null)
        {
            this._sliceAnnotationData2 = new SliceAnnotationData2();
        }
        return this._sliceAnnotationData2;
    }

    private _sliceAnnotationData3: SliceAnnotationData3 = null;
    public get sliceAnnotationData3(): SliceAnnotationData3 {
        if (this._sliceAnnotationData3 == null)
        {
            this._sliceAnnotationData3 = new SliceAnnotationData3();
        }
        return this._sliceAnnotationData3;
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
