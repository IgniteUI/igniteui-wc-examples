import { IgcDataChartCoreModule, IgcDataChartCategoryCoreModule, IgcDataChartCategoryModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcCategoryHighlightLayerComponent, IgcBarSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { OnlineShoppingSearchesItem, OnlineShoppingSearches } from './OnlineShoppingSearches';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private categoryHighlightLayer: IgcCategoryHighlightLayerComponent
    private barSeries1: IgcBarSeriesComponent
    private tooltips: IgcDataToolTipLayerComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('Chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var categoryHighlightLayer = this.categoryHighlightLayer = document.getElementById('CategoryHighlightLayer') as IgcCategoryHighlightLayerComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;
        var tooltips = this.tooltips = document.getElementById('Tooltips') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            yAxis.dataSource = this.onlineShoppingSearches
            barSeries1.xAxis = this.xAxis
            barSeries1.yAxis = this.yAxis
            barSeries1.dataSource = this.onlineShoppingSearches
        }
        this._bind();
    }

    private _onlineShoppingSearches: OnlineShoppingSearches = null;
    public get onlineShoppingSearches(): OnlineShoppingSearches {
        if (this._onlineShoppingSearches == null)
        {
            this._onlineShoppingSearches = new OnlineShoppingSearches();
        }
        return this._onlineShoppingSearches;
    }
    



}

new Sample();
