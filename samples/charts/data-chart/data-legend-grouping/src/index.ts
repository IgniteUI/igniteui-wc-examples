import { IgcLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataLegendModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, LegendDescriptionModule, NumberAbbreviatorDescriptionModule, DataChartCoreDescriptionModule, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule, DataLegendDescriptionModule, DataChartAnnotationDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { OlympicMedalsTopCountriesWithTotalsItem, OlympicMedalsTopCountriesWithTotals } from './OlympicMedalsTopCountriesWithTotals';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataLegendModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private columnSeries1: IgcColumnSeriesComponent
    private columnSeries2: IgcColumnSeriesComponent
    private columnSeries3: IgcColumnSeriesComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('ColumnSeries1') as IgcColumnSeriesComponent;
        var columnSeries2 = this.columnSeries2 = document.getElementById('ColumnSeries2') as IgcColumnSeriesComponent;
        var columnSeries3 = this.columnSeries3 = document.getElementById('ColumnSeries3') as IgcColumnSeriesComponent;

        this._bind = () => {
            legend.target = this.chart;
            xAxis.dataSource = this.olympicMedalsTopCountriesWithTotals;
            columnSeries1.xAxis = this.xAxis;
            columnSeries1.yAxis = this.yAxis;
            columnSeries1.dataSource = this.olympicMedalsTopCountriesWithTotals;
            columnSeries2.xAxis = this.xAxis;
            columnSeries2.yAxis = this.yAxis;
            columnSeries2.dataSource = this.olympicMedalsTopCountriesWithTotals;
            columnSeries3.xAxis = this.xAxis;
            columnSeries3.yAxis = this.yAxis;
            columnSeries3.dataSource = this.olympicMedalsTopCountriesWithTotals;
        }
        this._bind();

    }

    private _olympicMedalsTopCountriesWithTotals: OlympicMedalsTopCountriesWithTotals = null;
    public get olympicMedalsTopCountriesWithTotals(): OlympicMedalsTopCountriesWithTotals {
        if (this._olympicMedalsTopCountriesWithTotals == null)
        {
            this._olympicMedalsTopCountriesWithTotals = new OlympicMedalsTopCountriesWithTotals();
        }
        return this._olympicMedalsTopCountriesWithTotals;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            LegendDescriptionModule.register(context);
            NumberAbbreviatorDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
            DataChartCategoryDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataLegendDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}