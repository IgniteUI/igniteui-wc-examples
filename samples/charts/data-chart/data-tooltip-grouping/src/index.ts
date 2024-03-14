import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCoreDescriptionModule, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { OlympicMedalsTopCountriesWithTotalsItem, OlympicMedalsTopCountriesWithTotals } from './OlympicMedalsTopCountriesWithTotals';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private columnSeries1: IgcColumnSeriesComponent
    private columnSeries2: IgcColumnSeriesComponent
    private columnSeries3: IgcColumnSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('ColumnSeries1') as IgcColumnSeriesComponent;
        var columnSeries2 = this.columnSeries2 = document.getElementById('ColumnSeries2') as IgcColumnSeriesComponent;
        var columnSeries3 = this.columnSeries3 = document.getElementById('ColumnSeries3') as IgcColumnSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
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
            PropertyEditorPanelDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
            DataChartCategoryDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();