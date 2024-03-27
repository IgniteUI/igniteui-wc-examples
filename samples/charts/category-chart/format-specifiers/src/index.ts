import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataLegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { HighestGrossingMoviesItem, HighestGrossingMovies } from './HighestGrossingMovies';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            DataLegendDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
