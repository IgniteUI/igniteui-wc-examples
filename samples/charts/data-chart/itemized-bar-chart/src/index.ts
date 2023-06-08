import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcStackedFragmentSeriesModule, IgcCalloutLayerModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcBarSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

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
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private barSeries1: IgcBarSeriesComponent
    private barSeries2: IgcBarSeriesComponent
    private barSeries3: IgcBarSeriesComponent
    private barSeries4: IgcBarSeriesComponent
    private barSeries5: IgcBarSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;
        var barSeries2 = this.barSeries2 = document.getElementById('BarSeries2') as IgcBarSeriesComponent;
        var barSeries3 = this.barSeries3 = document.getElementById('BarSeries3') as IgcBarSeriesComponent;
        var barSeries4 = this.barSeries4 = document.getElementById('BarSeries4') as IgcBarSeriesComponent;
        var barSeries5 = this.barSeries5 = document.getElementById('BarSeries5') as IgcBarSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            yAxis.dataSource = this.companyMarketCapItemized;
            barSeries1.xAxis = this.xAxis;
            barSeries1.yAxis = this.yAxis;
            barSeries1.dataSource = this.companyMarketCapItemized;
            barSeries2.xAxis = this.xAxis;
            barSeries2.yAxis = this.yAxis;
            barSeries2.dataSource = this.companyMarketCapItemized;
            barSeries3.xAxis = this.xAxis;
            barSeries3.yAxis = this.yAxis;
            barSeries3.dataSource = this.companyMarketCapItemized;
            barSeries4.xAxis = this.xAxis;
            barSeries4.yAxis = this.yAxis;
            barSeries4.dataSource = this.companyMarketCapItemized;
            barSeries5.xAxis = this.xAxis;
            barSeries5.yAxis = this.yAxis;
            barSeries5.dataSource = this.companyMarketCapItemized;
        }
        this._bind();

    }

    private _companyMarketCapItemized: CompanyMarketCapItemized = null;
    public get companyMarketCapItemized(): CompanyMarketCapItemized {
        if (this._companyMarketCapItemized == null)
        {
            this._companyMarketCapItemized = new CompanyMarketCapItemized();
        }
        return this._companyMarketCapItemized;
    }

}

new Sample();
