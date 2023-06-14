import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { HighestGrossingMoviesItem, HighestGrossingMovies } from './HighestGrossingMovies';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            chart.dataSource = this.highestGrossingMovies;
            chart.legend = this.legend;
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
