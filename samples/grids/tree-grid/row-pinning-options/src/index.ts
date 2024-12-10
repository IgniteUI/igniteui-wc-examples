import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule, WebActionStripDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent, IgcPinningConfig, RowPinningPosition, IgcActionStripComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedTreeDataItem, EmployeesNestedTreeData } from './EmployeesNestedTreeData';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
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
    private rowPinningEditor: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }

    private actionStrip: IgcActionStripComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var rowPinningEditor = this.rowPinningEditor = document.getElementById('rowPinningEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridSetRowPinning = this.webGridSetRowPinning.bind(this);
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webTreeGridPinRowOnRendered = this.webTreeGridPinRowOnRendered.bind(this);
        var actionStrip = this.actionStrip = document.getElementById('actionStrip') as IgcActionStripComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.treeGrid;
            rowPinningEditor.changed = this.webGridSetRowPinning;
            treeGrid.data = this.employeesNestedTreeData;
            treeGrid.addEventListener("rendered", this.webTreeGridPinRowOnRendered);
            treeGrid.pinning = this.pinningConfig1;
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
            WebActionStripDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridSetRowPinning(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var item = sender as IgcPropertyEditorPropertyDescriptionComponent;
        var newVal = item.primitiveValue;
        var grid = this.treeGrid;
        grid.pinning.rows = newVal === "Top" ? RowPinningPosition.Top : RowPinningPosition.Bottom;
    }

    public webTreeGridPinRowOnRendered(args:any): void {
        const treeGrid = document.getElementById("treeGrid") as IgcTreeGridComponent || document.getElementById("grid") as IgcTreeGridComponent;
        treeGrid.data = [...treeGrid.data];
        treeGrid.pinRow(1);
        treeGrid.pinRow(11);
    }

}

new Sample();
