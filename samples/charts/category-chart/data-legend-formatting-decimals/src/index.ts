import { IgcDataLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { HighestGrossingMoviesItem, HighestGrossingMovies } from './HighestGrossingMovies';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            legend.target = this.chart;
            chart.dataSource = this.highestGrossingMovies;
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
