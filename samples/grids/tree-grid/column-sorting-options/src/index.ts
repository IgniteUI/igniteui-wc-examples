import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { OrdersTreeDataItem, OrdersTreeData } from './OrdersTreeData';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
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

    private propertyEditor: IgcPropertyEditorPanelComponent
    private sortingOptionsEditor: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.currencyCode = "USD";
            columnPipeArgs1.digitsInfo = "1.2-2";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var sortingOptionsEditor = this.sortingOptionsEditor = document.getElementById('SortingOptionsEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridClearSort = this.webGridClearSort.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.grid;
            propertyEditorPropertyDescription1.buttonClicked = this.webGridClearSort;
            grid.data = this.ordersTreeData;
            column1.pipeArgs = this.columnPipeArgs1;
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

    public webGridClearSort(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        var grid = this.grid;
        grid.clearSort("");
    }

}

new Sample();
