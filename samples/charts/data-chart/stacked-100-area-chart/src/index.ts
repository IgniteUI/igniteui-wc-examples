import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartStackedModule, IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcStacked100AreaSeriesComponent, IgcStackedFragmentSeriesComponent } from 'igniteui-webcomponents-charts';
import { ContinentsBirthRateItem, ContinentsBirthRate } from './ContinentsBirthRate';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private stacked100AreaSeries: IgcStacked100AreaSeriesComponent
    private s1: IgcStackedFragmentSeriesComponent
    private s2: IgcStackedFragmentSeriesComponent
    private s3: IgcStackedFragmentSeriesComponent
    private s4: IgcStackedFragmentSeriesComponent
    private s5: IgcStackedFragmentSeriesComponent

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var stacked100AreaSeries = this.stacked100AreaSeries = document.getElementById('Stacked100AreaSeries') as IgcStacked100AreaSeriesComponent;
        var s1 = this.s1 = document.getElementById('s1') as IgcStackedFragmentSeriesComponent;
        var s2 = this.s2 = document.getElementById('s2') as IgcStackedFragmentSeriesComponent;
        var s3 = this.s3 = document.getElementById('s3') as IgcStackedFragmentSeriesComponent;
        var s4 = this.s4 = document.getElementById('s4') as IgcStackedFragmentSeriesComponent;
        var s5 = this.s5 = document.getElementById('s5') as IgcStackedFragmentSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend
            xAxis.dataSource = this.continentsBirthRate
            stacked100AreaSeries.xAxis = this.xAxis
            stacked100AreaSeries.yAxis = this.yAxis
            stacked100AreaSeries.dataSource = this.continentsBirthRate
        }
        this._bind();
    }

    private _continentsBirthRate: ContinentsBirthRate = null;
    public get continentsBirthRate(): ContinentsBirthRate {
        if (this._continentsBirthRate == null)
        {
            this._continentsBirthRate = new ContinentsBirthRate();
        }
        return this._continentsBirthRate;
    }
    



}

new Sample();
