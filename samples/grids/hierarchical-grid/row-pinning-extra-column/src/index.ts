import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcHierarchicalGridComponent, IgcPinningConfig, RowPinningPosition, ColumnPinningPosition, IgcColumnComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcCellTemplateContext, IgcRowType } from 'igniteui-webcomponents-grids/grids';
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

    private propertyEditorHierarchicalGrid: IgcPropertyEditorPanelComponent
    private rowPinningEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcHierarchicalGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;
            pinningConfig1.columns = ColumnPinningPosition.End;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private column1: IgcColumnComponent
    private rowIsland1: IgcRowIslandComponent
    private _pinningConfig2: IgcPinningConfig | null = null;
    public get pinningConfig2(): IgcPinningConfig {
        if (this._pinningConfig2 == null)
        {
            var pinningConfig2: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig2.rows = RowPinningPosition.Top;
            pinningConfig2.columns = ColumnPinningPosition.End;

            this._pinningConfig2 = pinningConfig2;
        }
        return this._pinningConfig2;
    }
    private column2: IgcColumnComponent
    private rowIsland2: IgcRowIslandComponent
    private _pinningConfig3: IgcPinningConfig | null = null;
    public get pinningConfig3(): IgcPinningConfig {
        if (this._pinningConfig3 == null)
        {
            var pinningConfig3: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig3.rows = RowPinningPosition.Top;
            pinningConfig3.columns = ColumnPinningPosition.End;

            this._pinningConfig3 = pinningConfig3;
        }
        return this._pinningConfig3;
    }
    private column3: IgcColumnComponent
    private rowIsland3: IgcRowIslandComponent
    private _pinningConfig4: IgcPinningConfig | null = null;
    public get pinningConfig4(): IgcPinningConfig {
        if (this._pinningConfig4 == null)
        {
            var pinningConfig4: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig4.rows = RowPinningPosition.Top;
            pinningConfig4.columns = ColumnPinningPosition.End;

            this._pinningConfig4 = pinningConfig4;
        }
        return this._pinningConfig4;
    }
    private column4: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorHierarchicalGrid = this.propertyEditorHierarchicalGrid = document.getElementById('PropertyEditorHierarchicalGrid') as IgcPropertyEditorPanelComponent;
        var rowPinningEditor = this.rowPinningEditor = document.getElementById('rowPinningEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webHierarchicalGridChangePinningConfig = this.webHierarchicalGridChangePinningConfig.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var rowIsland1 = this.rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var rowIsland2 = this.rowIsland2 = document.getElementById('rowIsland2') as IgcRowIslandComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var rowIsland3 = this.rowIsland3 = document.getElementById('rowIsland3') as IgcRowIslandComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorHierarchicalGrid.componentRenderer = this.renderer;
            propertyEditorHierarchicalGrid.target = this.grid;
            rowPinningEditor.changed = this.webHierarchicalGridChangePinningConfig;
            grid.data = this.singersData;
            grid.pinning = this.pinningConfig1;
            column1.bodyTemplate = this.webHierarchicalGridRowPinCellTemplate;
            rowIsland1.pinning = this.pinningConfig2;
            column2.bodyTemplate = this.webHierarchicalGridRowPinCellTemplate;
            rowIsland2.pinning = this.pinningConfig3;
            column3.bodyTemplate = this.webHierarchicalGridRowPinCellTemplate;
            rowIsland3.pinning = this.pinningConfig4;
            column4.bodyTemplate = this.webHierarchicalGridRowPinCellTemplate;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebHierarchicalGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webHierarchicalGridChangePinningConfig(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var newPinningPosition = args.newValue === "Top" ? RowPinningPosition.Top : RowPinningPosition.Bottom;
        var hierarchicalGrid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        hierarchicalGrid.pinning.rows = newPinningPosition;
        if (rowIsland1) {
            var rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
            rowIsland1.pinning.rows = newPinningPosition;
        }
        if (rowIsland2) {
            var rowIsland2 = document.getElementById('rowIsland2') as IgcRowIslandComponent;
            if (rowIsland2) {
                rowIsland2.pinning.rows = newPinningPosition;
            }
        }
        if (rowIsland3) {
            var rowIsland3 = document.getElementById('rowIsland3') as IgcRowIslandComponent;
            if (rowIsland3) {
                rowIsland3.pinning.rows = newPinningPosition;
            }
        }
    }

        public webHierarchicalGridRowPinCellTemplate = (ctx: IgcCellTemplateContext) => {
    		const row = ctx.cell.row;
            return html`<span @pointerdown=${(e: any) => this.toggleRowPin(row)}>📌</span>`
    }

    public toggleRowPin(row: IgcRowType) {
        row.pinned = !row.pinned;
    }
}

new Sample();
