import { IgcDataLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartVerticalCategoryModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcBarSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { HighestGrossingMoviesItem, HighestGrossingMovies } from './HighestGrossingMovies';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartVerticalCategoryModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private barSeries1: IgcBarSeriesComponent
    private barSeries2: IgcBarSeriesComponent
    private tooltips: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var barSeries1 = this.barSeries1 = document.getElementById('BarSeries1') as IgcBarSeriesComponent;
        var barSeries2 = this.barSeries2 = document.getElementById('BarSeries2') as IgcBarSeriesComponent;
        var tooltips = this.tooltips = document.getElementById('Tooltips') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            legend.target = this.chart;
            chart.legend = this.legend;
            yAxis.dataSource = this.highestGrossingMovies;
            barSeries1.xAxis = this.xAxis;
            barSeries1.yAxis = this.yAxis;
            barSeries1.dataSource = this.highestGrossingMovies;
            barSeries2.xAxis = this.xAxis;
            barSeries2.yAxis = this.yAxis;
            barSeries2.dataSource = this.highestGrossingMovies;
        }
        this._bind();

    }

    private _highestGrossingMovies: HighestGrossingMovies = null;
    public get highestGrossingMovies(): HighestGrossingMovies {
        if (this._highestGrossingMovies == null)
        {
            this._highestGrossingMovies = new HighestGrossingMovies();
        }
        return this._highestGrossingMovies;
    }

}

new Sample();
