import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { OrdersTreeDataItem, OrdersTreeData } from './OrdersTreeData';
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
    private summaryCalculationModeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private summaryPositionEditor: IgcPropertyEditorPropertyDescriptionComponent
    private showSummaryOnCollapseEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var summaryCalculationModeEditor = this.summaryCalculationModeEditor = document.getElementById('SummaryCalculationModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridChangeSummaryCalculationMode = this.webTreeGridChangeSummaryCalculationMode.bind(this);
        var summaryPositionEditor = this.summaryPositionEditor = document.getElementById('SummaryPositionEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridChangeSummaryPosition = this.webTreeGridChangeSummaryPosition.bind(this);
        var showSummaryOnCollapseEditor = this.showSummaryOnCollapseEditor = document.getElementById('ShowSummaryOnCollapseEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.treeGrid;
            summaryCalculationModeEditor.changed = this.webTreeGridChangeSummaryCalculationMode;
            summaryPositionEditor.changed = this.webTreeGridChangeSummaryPosition;
            treeGrid.data = this.ordersTreeData;
        }
        this._bind();

    }

    private _ordersTreeData: OrdersTreeData = null;
    public get ordersTreeData(): OrdersTreeData {
        if (this._ordersTreeData == null)
        {
            this._ordersTreeData = new OrdersTreeData();
        }
        return this._ordersTreeData;
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

    public webTreeGridChangeSummaryCalculationMode(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        treeGrid.summaryCalculationMode = args.newValue;
    }

    public webTreeGridChangeSummaryPosition(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        treeGrid.summaryPosition = args.newValue;
    }

}

new Sample();
