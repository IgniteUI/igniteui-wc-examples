import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedTreeDataItem, EmployeesNestedTreeData } from './EmployeesNestedTreeData';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private summaryRowHeightEditor: IgcPropertyEditorPropertyDescriptionComponent
    private toggleSummariesEditor: IgcPropertyEditorPropertyDescriptionComponent
    private displayDensityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var summaryRowHeightEditor = this.summaryRowHeightEditor = document.getElementById('SummaryRowHeightEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var toggleSummariesEditor = this.toggleSummariesEditor = document.getElementById('ToggleSummariesEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridHasSummariesChange = this.webTreeGridHasSummariesChange.bind(this);
        var displayDensityEditor = this.displayDensityEditor = document.getElementById('DisplayDensityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.treeGrid;
            toggleSummariesEditor.changed = this.webTreeGridHasSummariesChange;
            treeGrid.data = this.employeesNestedTreeData;
        }
        this._bind();

    }

    private _employeesNestedTreeData: EmployeesNestedTreeData = null;
    public get employeesNestedTreeData(): EmployeesNestedTreeData {
        if (this._employeesNestedTreeData == null)
        {
            this._employeesNestedTreeData = new EmployeesNestedTreeData();
        }
        return this._employeesNestedTreeData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridHasSummariesChange(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        let newValue = sender.primitiveValue as boolean;
        const grid = this.treeGrid;
        var column1 = grid.getColumnByName("Age");
        var column2 = grid.getColumnByName("Title");
        var column3 = grid.getColumnByName("OnPTO");

        column1.hasSummary = newValue;
        column2.hasSummary = newValue;
        column3.hasSummary = newValue;
    }

}

new Sample();
