import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcSortingExpression, SortingDirection, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { ProductSalesItem, ProductSales } from './ProductSales';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';

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
    private propertyEditorPropertyDescription2: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private _sortingExpression1: IgcSortingExpression[] | null = null;
    public get sortingExpression1(): IgcSortingExpression[] {
        if (this._sortingExpression1 == null)
        {
            let sortingExpression1: IgcSortingExpression[] = [];
            var sortingExpression2: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression2.fieldName = "Category";
            sortingExpression2.dir = SortingDirection.Asc;
            sortingExpression2.ignoreCase = true;

            sortingExpression1.push(sortingExpression2)
            this._sortingExpression1 = sortingExpression1;
        }
        return this._sortingExpression1;
    }
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
        var propertyEditorPropertyDescription2 = this.propertyEditorPropertyDescription2 = document.getElementById('propertyEditorPropertyDescription2') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridClearGrouping = this.webGridClearGrouping.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.grid;
            propertyEditorPropertyDescription1.buttonClicked = this.webGridClearSort;
            propertyEditorPropertyDescription2.buttonClicked = this.webGridClearGrouping;
            grid.data = this.productSales;
            grid.sortingExpressions = this.sortingExpression1;
            column1.pipeArgs = this.columnPipeArgs1;
        }
        this._bind();

    }

    private _productSales: ProductSales = null;
    public get productSales(): ProductSales {
        if (this._productSales == null)
        {
            this._productSales = new ProductSales();
        }
        return this._productSales;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridClearSort(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        var grid = this.grid;
        grid.clearSort("");
    }

    public webGridClearGrouping(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        var grid = this.grid;
        grid.clearGrouping("");
    }

}

new Sample();
