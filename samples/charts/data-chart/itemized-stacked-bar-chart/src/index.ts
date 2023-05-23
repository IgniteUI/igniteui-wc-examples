import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataChartStackedModule, IgcStackedFragmentSeriesModule, IgcCalloutLayerModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcStackedBarSeriesComponent, IgcStackedFragmentSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule,
    IgcCalloutLayerModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private stackedBarSeries: IgcStackedBarSeriesComponent
    private s1: IgcStackedFragmentSeriesComponent
    private s2: IgcStackedFragmentSeriesComponent
    private s3: IgcStackedFragmentSeriesComponent
    private s4: IgcStackedFragmentSeriesComponent
    private s5: IgcStackedFragmentSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var stackedBarSeries = this.stackedBarSeries = document.getElementById('StackedBarSeries') as IgcStackedBarSeriesComponent;
        var s1 = this.s1 = document.getElementById('s1') as IgcStackedFragmentSeriesComponent;
        var s2 = this.s2 = document.getElementById('s2') as IgcStackedFragmentSeriesComponent;
        var s3 = this.s3 = document.getElementById('s3') as IgcStackedFragmentSeriesComponent;
        var s4 = this.s4 = document.getElementById('s4') as IgcStackedFragmentSeriesComponent;
        var s5 = this.s5 = document.getElementById('s5') as IgcStackedFragmentSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            yAxis.dataSource = this.companyMarketCapItemized;
            stackedBarSeries.dataSource = this.companyMarketCapItemized;
            stackedBarSeries.xAxis = this.xAxis;
            stackedBarSeries.yAxis = this.yAxis;
        }
        this._bind();

    }

}

new Sample();
