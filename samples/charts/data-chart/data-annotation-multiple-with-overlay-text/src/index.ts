import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcAnnotationLayerProxyModule, IgcDataChartAnnotationModule, IgcDataAnnotationSliceLayerModule, IgcNumberAbbreviatorModule, IgcValueOverlayModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent, IgcValueOverlayComponent, IgcValueLayerComponent, IgcDataAnnotationSliceLayerComponent } from 'igniteui-webcomponents-charts';
import { StockTeslaItem, StockTesla } from './StockTesla';
import { AnnotationSliceMultiOverlayDataItem, AnnotationSliceMultiOverlayData } from './AnnotationSliceMultiOverlayData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcAnnotationLayerProxyModule,
    IgcDataChartAnnotationModule,
    IgcDataAnnotationSliceLayerModule,
    IgcNumberAbbreviatorModule,
    IgcAnnotationLayerProxyModule,
    IgcValueOverlayModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private series1: IgcLineSeriesComponent
    private valueOverlay: IgcValueOverlayComponent
    private valueLayer: IgcValueLayerComponent
    private annoLayer: IgcDataAnnotationSliceLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcLineSeriesComponent;
        var valueOverlay = this.valueOverlay = document.getElementById('valueOverlay') as IgcValueOverlayComponent;
        var valueLayer = this.valueLayer = document.getElementById('valueLayer') as IgcValueLayerComponent;
        var annoLayer = this.annoLayer = document.getElementById('AnnoLayer') as IgcDataAnnotationSliceLayerComponent;

        this._bind = () => {
            xAxis.dataSource = this.stockTesla;
            series1.xAxis = this.xAxis;
            series1.yAxis = this.yAxis;
            series1.dataSource = this.stockTesla;
            valueOverlay.axis = this.yAxis;
            valueLayer.targetAxis = this.yAxis;
            annoLayer.dataSource = this.annotationSliceMultiOverlayData;
            annoLayer.targetAxis = this.yAxis;
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

    private _annotationSliceMultiOverlayData: AnnotationSliceMultiOverlayData = null;
    public get annotationSliceMultiOverlayData(): AnnotationSliceMultiOverlayData {
        if (this._annotationSliceMultiOverlayData == null)
        {
            this._annotationSliceMultiOverlayData = new AnnotationSliceMultiOverlayData();
        }
        return this._annotationSliceMultiOverlayData;
    }

}

new Sample();
