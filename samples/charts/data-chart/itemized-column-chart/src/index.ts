import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcStackedFragmentSeriesModule, IgcCalloutLayerModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcStackedFragmentSeriesModule,
    IgcCalloutLayerModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private columnSeries1: IgcColumnSeriesComponent
    private columnSeries2: IgcColumnSeriesComponent
    private columnSeries3: IgcColumnSeriesComponent
    private columnSeries4: IgcColumnSeriesComponent
    private columnSeries5: IgcColumnSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('ColumnSeries1') as IgcColumnSeriesComponent;
        var columnSeries2 = this.columnSeries2 = document.getElementById('ColumnSeries2') as IgcColumnSeriesComponent;
        var columnSeries3 = this.columnSeries3 = document.getElementById('ColumnSeries3') as IgcColumnSeriesComponent;
        var columnSeries4 = this.columnSeries4 = document.getElementById('ColumnSeries4') as IgcColumnSeriesComponent;
        var columnSeries5 = this.columnSeries5 = document.getElementById('ColumnSeries5') as IgcColumnSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            xAxis.dataSource = this.companyMarketCapItemized;
            columnSeries1.xAxis = this.xAxis;
            columnSeries1.yAxis = this.yAxis;
            columnSeries1.dataSource = this.companyMarketCapItemized;
            columnSeries2.xAxis = this.xAxis;
            columnSeries2.yAxis = this.yAxis;
            columnSeries2.dataSource = this.companyMarketCapItemized;
            columnSeries3.xAxis = this.xAxis;
            columnSeries3.yAxis = this.yAxis;
            columnSeries3.dataSource = this.companyMarketCapItemized;
            columnSeries4.xAxis = this.xAxis;
            columnSeries4.yAxis = this.yAxis;
            columnSeries4.dataSource = this.companyMarketCapItemized;
            columnSeries5.xAxis = this.xAxis;
            columnSeries5.yAxis = this.yAxis;
            columnSeries5.dataSource = this.companyMarketCapItemized;
        }
        this._bind();

    }

}

new Sample();
