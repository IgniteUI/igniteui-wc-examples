import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, LegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { SalesDataItem, SalesData } from './SalesData';
import { MarkerType, MarkerType_$type } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs, PropertyEditorValueType } from 'igniteui-webcomponents-layouts';
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

    private editor: IgcPropertyEditorPanelComponent
    private initialGroups: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var editor = this.editor = document.getElementById('editor') as IgcPropertyEditorPanelComponent;
        var initialGroups = this.initialGroups = document.getElementById('InitialGroups') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateInitialGroups = this.editorChangeUpdateInitialGroups.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            editor.componentRenderer = this.renderer;
            editor.target = this.chart;
            initialGroups.changed = this.editorChangeUpdateInitialGroups;
            chart.dataSource = this.salesData;
        }
        this._bind();

        this.propertyEditorInitAggregationsOnViewInit();
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

    public propertyEditorInitAggregationsOnViewInit(): void {

        var editor = this.editor;
        var initialSummariesDropdown = new IgcPropertyEditorPropertyDescriptionComponent();
        var sortGroupsDropdown = new IgcPropertyEditorPropertyDescriptionComponent();

        initialSummariesDropdown.label = "Initial Summaries";
        initialSummariesDropdown.valueType = PropertyEditorValueType.EnumValue;
        initialSummariesDropdown.shouldOverrideDefaultEditor = true;
        initialSummariesDropdown.dropDownNames = ["Sum(Sales) as Sales", "Avg(Sales) as Sales", "Min(Sales) as Sales", "Max(Sales) as Sales", "Count(Sales) as Sales" ];
        initialSummariesDropdown.dropDownValues = ["Sum(Sales) as Sales", "Avg(Sales) as Sales", "Min(Sales) as Sales", "Max(Sales) as Sales", "Count(Sales) as Sales" ];

        sortGroupsDropdown.label = "Sort Groups"
        sortGroupsDropdown.valueType = PropertyEditorValueType.EnumValue;
        sortGroupsDropdown.shouldOverrideDefaultEditor = true;
        sortGroupsDropdown.dropDownNames = ["Sales Asc", "Sales Desc"];
        sortGroupsDropdown.dropDownValues = ["Sales Asc","Sales Desc"];

        editor.properties.add(initialSummariesDropdown);
        editor.properties.add(sortGroupsDropdown);

        this.editorChangeUpdateInitialSummaries = this.editorChangeUpdateInitialSummaries.bind(this);
        this.editorChangeUpdateGroupSorts = this.editorChangeUpdateGroupSorts.bind(this);
        initialSummariesDropdown.changed = this.editorChangeUpdateInitialSummaries;
        sortGroupsDropdown.changed = this.editorChangeUpdateGroupSorts;
    }

    public editorChangeUpdateInitialSummaries(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

        var chart = this.chart;
        var intialSummaryVal = args.newValue.toString();
        chart.initialSummaries = intialSummaryVal;
    }

    public editorChangeUpdateGroupSorts(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var chart = this.chart;
        var groupSortsVal = args.newValue.toString();
        chart.groupSorts = groupSortsVal;
    }

    public editorChangeUpdateInitialGroups(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var chart = this.chart;
        chart.initialGroups = args.newValue.toString();
    }

}

new Sample();
