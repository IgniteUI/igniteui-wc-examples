import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, LegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
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

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private initialGroups: IgcPropertyEditorPropertyDescriptionComponent
    private initialSummaries: IgcPropertyEditorPropertyDescriptionComponent
    private groupSorts: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var initialGroups = this.initialGroups = document.getElementById('InitialGroups') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateInitialGroups = this.editorChangeUpdateInitialGroups.bind(this);
        var initialSummaries = this.initialSummaries = document.getElementById('InitialSummaries') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateInitialSummaries = this.editorChangeUpdateInitialSummaries.bind(this);
        var groupSorts = this.groupSorts = document.getElementById('GroupSorts') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateGroupSorts = this.editorChangeUpdateGroupSorts.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.chart;
            initialGroups.changed = this.editorChangeUpdateInitialGroups;
            initialSummaries.changed = this.editorChangeUpdateInitialSummaries;
            groupSorts.changed = this.editorChangeUpdateGroupSorts;
            chart.dataSource = this.salesData;
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

    public editorChangeUpdateInitialGroups(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

        var intialGroupVal = args.newValue.toString();
        this.chart.initialGroups = intialGroupVal;
    }

    public editorChangeUpdateInitialSummaries(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

        var intialSummaryVal = args.newValue.toString();
        this.chart.initialSummaries = intialSummaryVal;
    }

    public editorChangeUpdateGroupSorts(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

        var groupSortsVal = args.newValue.toString();
        this.chart.groupSorts = groupSortsVal;
    }

}

new Sample();
