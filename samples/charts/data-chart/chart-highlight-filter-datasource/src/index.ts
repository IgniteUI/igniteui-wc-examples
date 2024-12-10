import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCoreDescriptionModule, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { OnlineTrafficHighlightTotalsItem, OnlineTrafficHighlightTotals } from './OnlineTrafficHighlightTotals';
import { OnlineTrafficHighlightDesktopOnlyItem, OnlineTrafficHighlightDesktopOnly } from './OnlineTrafficHighlightDesktopOnly';
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
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var highlightedValuesDisplayModeEditor = this.highlightedValuesDisplayModeEditor = document.getElementById('HighlightedValuesDisplayModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('ColumnSeries1') as IgcColumnSeriesComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.chart;
            xAxis.dataSource = this.onlineTrafficHighlightTotals;
            columnSeries1.xAxis = this.xAxis;
            columnSeries1.yAxis = this.yAxis;
            columnSeries1.dataSource = this.onlineTrafficHighlightTotals;
            columnSeries1.highlightedDataSource = this.onlineTrafficHighlightDesktopOnly;
        }
        this._bind();
    }

    private _onlineTrafficHighlightTotals: OnlineTrafficHighlightTotals = null;
    public get onlineTrafficHighlightTotals(): OnlineTrafficHighlightTotals {
        if (this._onlineTrafficHighlightTotals == null)
        {
            this._onlineTrafficHighlightTotals = new OnlineTrafficHighlightTotals();
        }
        return this._onlineTrafficHighlightTotals;
    }

    private _onlineTrafficHighlightDesktopOnly: OnlineTrafficHighlightDesktopOnly = null;
    public get onlineTrafficHighlightDesktopOnly(): OnlineTrafficHighlightDesktopOnly {
        if (this._onlineTrafficHighlightDesktopOnly == null)
        {
            this._onlineTrafficHighlightDesktopOnly = new OnlineTrafficHighlightDesktopOnly();
        }
        return this._onlineTrafficHighlightDesktopOnly;
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

new Sample();
