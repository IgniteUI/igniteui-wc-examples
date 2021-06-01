import { MonthsItem, Months, SeasonsItem, Seasons } from './SampleData';

import { IgcLegendModule, IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent, IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDoughnutChartModule
);

export class Sample {

    private chart: IgcDoughnutChartComponent
    private series1: IgcRingSeriesComponent
    private series2: IgcRingSeriesComponent

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcRingSeriesComponent;
        var series2 = this.series2 = document.getElementById('series2') as IgcRingSeriesComponent;

        series1.dataSource = this.seasons
        series2.dataSource = this.months
   }

    private _months: Months = null;
    public get months(): Months {
        if (this._months == null)
        {
            this._months = new Months();
        }
        return this._months;
    }
    
    private _seasons: Seasons = null;
    public get seasons(): Seasons {
        if (this._seasons == null)
        {
            this._seasons = new Seasons();
        }
        return this._seasons;
    }
    
}

new Sample();
