import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataLegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifierComponent } from 'igniteui-webcomponents-core';
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
    private _numberFormatSpecifier1: IgcNumberFormatSpecifierComponent[] | null = null;
    public get numberFormatSpecifier1(): IgcNumberFormatSpecifierComponent[] {
        if (this._numberFormatSpecifier1 == null)
        {
            let numberFormatSpecifier1: IgcNumberFormatSpecifierComponent[] = [];
            var numberFormatSpecifier2 = new IgcNumberFormatSpecifierComponent();
            numberFormatSpecifier2.style = "currency";
            numberFormatSpecifier2.currency = "USD";
            numberFormatSpecifier2.currencyDisplay = "symbol";
            numberFormatSpecifier2.minimumFractionDigits = 0;

            numberFormatSpecifier1.push(numberFormatSpecifier2)
            this._numberFormatSpecifier1 = numberFormatSpecifier1;
        }
        return this._numberFormatSpecifier1;
    }
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            legend.target = this.chart;
            chart.dataSource = this.highestGrossingMovies;
            chart.yAxisLabelFormatSpecifiers = this.numberFormatSpecifier1;
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
