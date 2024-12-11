import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifierModule } from 'igniteui-webcomponents-core';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataLegendDescriptionModule, CategoryChartDescriptionModule, NumberFormatSpecifierDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifier } from 'igniteui-webcomponents-core';
import { HighestGrossingMoviesItem, HighestGrossingMovies } from './HighestGrossingMovies';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataLegendModule,
    IgcCategoryChartModule,
    IgcNumberFormatSpecifierModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private _numberFormatSpecifier1: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier1(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier1 == null)
        {
            let numberFormatSpecifier1: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier2 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier2.style = "currency";
            numberFormatSpecifier2.currency = "USD";
            numberFormatSpecifier2.currencyDisplay = "symbol";
            numberFormatSpecifier2.maximumFractionDigits = 2;
            numberFormatSpecifier2.minimumFractionDigits = 2;

            numberFormatSpecifier1.push(numberFormatSpecifier2)
            this._numberFormatSpecifier1 = numberFormatSpecifier1;
        }
        return this._numberFormatSpecifier1;
    }
    private chart: IgcCategoryChartComponent
    private _numberFormatSpecifier3: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier3(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier3 == null)
        {
            let numberFormatSpecifier3: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier4 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier4.style = "currency";
            numberFormatSpecifier4.currency = "USD";
            numberFormatSpecifier4.currencyDisplay = "symbol";
            numberFormatSpecifier4.maximumFractionDigits = 2;
            numberFormatSpecifier4.minimumFractionDigits = 2;

            numberFormatSpecifier3.push(numberFormatSpecifier4)
            this._numberFormatSpecifier3 = numberFormatSpecifier3;
        }
        return this._numberFormatSpecifier3;
    }
    private _numberFormatSpecifier5: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier5(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier5 == null)
        {
            let numberFormatSpecifier5: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier6 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier6.style = "currency";
            numberFormatSpecifier6.currency = "USD";
            numberFormatSpecifier6.currencyDisplay = "symbol";
            numberFormatSpecifier6.minimumFractionDigits = 0;

            numberFormatSpecifier5.push(numberFormatSpecifier6)
            this._numberFormatSpecifier5 = numberFormatSpecifier5;
        }
        return this._numberFormatSpecifier5;
    }
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            legend.target = this.chart;
            legend.valueFormatSpecifiers = this.numberFormatSpecifier1;
            chart.dataSource = this.highestGrossingMovies;
            chart.dataToolTipValueFormatSpecifiers = this.numberFormatSpecifier3;
            chart.yAxisLabelFormatSpecifiers = this.numberFormatSpecifier5;
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
            NumberFormatSpecifierDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
