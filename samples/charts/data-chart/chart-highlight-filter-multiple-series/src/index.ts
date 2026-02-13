import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCoreDescriptionModule, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';
import { CountryRenewableElectricityFilteredItem, CountryRenewableElectricityFiltered } from './CountryRenewableElectricityFiltered';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private highlightedValuesDisplayModeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private columnSeries1: IgcColumnSeriesComponent
    private columnSeries2: IgcColumnSeriesComponent
    private columnSeries3: IgcColumnSeriesComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var highlightedValuesDisplayModeEditor = this.highlightedValuesDisplayModeEditor = document.getElementById('HighlightedValuesDisplayModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('ColumnSeries1') as IgcColumnSeriesComponent;
        var columnSeries2 = this.columnSeries2 = document.getElementById('ColumnSeries2') as IgcColumnSeriesComponent;
        var columnSeries3 = this.columnSeries3 = document.getElementById('ColumnSeries3') as IgcColumnSeriesComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.chart;
            xAxis.dataSource = this.countryRenewableElectricity;
            columnSeries1.xAxis = this.xAxis;
            columnSeries1.yAxis = this.yAxis;
            columnSeries1.dataSource = this.countryRenewableElectricity;
            columnSeries1.highlightedDataSource = this.countryRenewableElectricityFiltered;
            columnSeries2.xAxis = this.xAxis;
            columnSeries2.yAxis = this.yAxis;
            columnSeries2.dataSource = this.countryRenewableElectricity;
            columnSeries2.highlightedDataSource = this.countryRenewableElectricityFiltered;
            columnSeries3.xAxis = this.xAxis;
            columnSeries3.yAxis = this.yAxis;
            columnSeries3.dataSource = this.countryRenewableElectricity;
            columnSeries3.highlightedDataSource = this.countryRenewableElectricityFiltered;
        }
        this._bind();

    }

    private _countryRenewableElectricity: CountryRenewableElectricity = null;
    public get countryRenewableElectricity(): CountryRenewableElectricity {
        if (this._countryRenewableElectricity == null)
        {
            this._countryRenewableElectricity = new CountryRenewableElectricity();
        }
        return this._countryRenewableElectricity;
    }

    private _countryRenewableElectricityFiltered: CountryRenewableElectricityFiltered = null;
    public get countryRenewableElectricityFiltered(): CountryRenewableElectricityFiltered {
        if (this._countryRenewableElectricityFiltered == null)
        {
            this._countryRenewableElectricityFiltered = new CountryRenewableElectricityFiltered();
        }
        return this._countryRenewableElectricityFiltered;
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
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}