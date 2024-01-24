import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, LegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { SalesData } from './SalesData';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { MarkerType, MarkerType_$type } from 'igniteui-webcomponents-charts';
import { EnumUtil } from 'igniteui-webcomponents-core';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcLegendComponent
    private editor: IgcPropertyEditorPanelComponent
    private initialFilter: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var editor = this.editor = document.getElementById('editor') as IgcPropertyEditorPanelComponent;
        var initialFilter = this.initialFilter = document.getElementById('InitialFilter') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateInitialFilter = this.editorChangeUpdateInitialFilter.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            editor.componentRenderer = this.renderer;
            editor.target = this.chart;
            initialFilter.changed = this.editorChangeUpdateInitialFilter;
            chart.dataSource = this.salesData;
            chart.legend = this.legend;
        }
        this._bind();

    }

    private _salesData: SalesData = null;
    public get salesData(): SalesData {
        if (this._salesData == null)
        {
            this._salesData = new SalesData();
        }
        return this._salesData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            LegendDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public editorChangeUpdateInitialFilter(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

        var chart = this.chart;
        var intialFilterVal = args.newValue.toString();
        chart.initialFilter = intialFilterVal;
    }

}

new Sample();
