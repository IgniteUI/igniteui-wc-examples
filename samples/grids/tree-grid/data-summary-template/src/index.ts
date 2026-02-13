import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedTreeDataItem, EmployeesNestedTreeData } from './EmployeesNestedTreeData';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcSummaryResult, IgcSummaryTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

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
    private sizeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var summaryRowHeightEditor = this.summaryRowHeightEditor = document.getElementById('SummaryRowHeightEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var toggleSummariesEditor = this.toggleSummariesEditor = document.getElementById('ToggleSummariesEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridHasSummariesChange = this.webTreeGridHasSummariesChange.bind(this);
        var sizeEditor = this.sizeEditor = document.getElementById('SizeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridSetGridSize = this.webTreeGridSetGridSize.bind(this);
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.treeGrid;
            toggleSummariesEditor.changed = this.webTreeGridHasSummariesChange;
            sizeEditor.changed = this.webTreeGridSetGridSize;
            treeGrid.data = this.employeesNestedTreeData;
            column1.summaryTemplate = this.webTreeGridSummaryTemplate;
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

    public webTreeGridSetGridSize(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var newVal = (args.newValue as string).toLowerCase();
        var grid = document.getElementById("treeGrid");
        grid.style.setProperty('--ig-size', `var(--ig-size-${newVal})`);
    }

    public webTreeGridSummaryTemplate = (ctx: IgcSummaryTemplateContext) => {
        const summaryResults = ctx.implicit as IgcSummaryResult[];
        return html`<div class="summary-temp">
        <span><strong>${summaryResults[0].label}</strong><span>${summaryResults[0].summaryResult}</span></span>
        <span><strong>${summaryResults[1].label}</strong><span>${summaryResults[1].summaryResult}</span></span>
        <span><strong>${summaryResults[2].label}</strong><span>${summaryResults[2].summaryResult}</span></span>
    	<span><strong>${summaryResults[3].label}</strong><span>${summaryResults[3].summaryResult}</span></span>
    </div>`;
    }

}

export function initialize() {
  return new Sample();
}