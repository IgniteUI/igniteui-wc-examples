import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';
import { IgcButtonComponent } from 'igniteui-webcomponents';

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
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription2: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription3: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription4: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private productID: IgcColumnComponent
    private productName: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private unitsOnOrder: IgcColumnComponent
    private unitsInStock: IgcColumnComponent
    private quantityPerUnit: IgcColumnComponent
    private reorderLevel: IgcColumnComponent
    private supplierID: IgcColumnComponent
    private categoryID: IgcColumnComponent
    private discontinued: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridAddRow = this.webGridAddRow.bind(this);
        var propertyEditorPropertyDescription2 = this.propertyEditorPropertyDescription2 = document.getElementById('propertyEditorPropertyDescription2') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridUndo = this.webGridUndo.bind(this);
        var propertyEditorPropertyDescription3 = this.propertyEditorPropertyDescription3 = document.getElementById('propertyEditorPropertyDescription3') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridRedo = this.webGridRedo.bind(this);
        var propertyEditorPropertyDescription4 = this.propertyEditorPropertyDescription4 = document.getElementById('propertyEditorPropertyDescription4') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridCommit = this.webGridCommit.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var productID = this.productID = document.getElementById('ProductID') as IgcColumnComponent;
        var productName = this.productName = document.getElementById('ProductName') as IgcColumnComponent;
        var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        var unitsOnOrder = this.unitsOnOrder = document.getElementById('UnitsOnOrder') as IgcColumnComponent;
        var unitsInStock = this.unitsInStock = document.getElementById('UnitsInStock') as IgcColumnComponent;
        var quantityPerUnit = this.quantityPerUnit = document.getElementById('QuantityPerUnit') as IgcColumnComponent;
        var reorderLevel = this.reorderLevel = document.getElementById('ReorderLevel') as IgcColumnComponent;
        var supplierID = this.supplierID = document.getElementById('SupplierID') as IgcColumnComponent;
        var categoryID = this.categoryID = document.getElementById('CategoryID') as IgcColumnComponent;
        var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.grid;
            propertyEditorPropertyDescription1.buttonClicked = this.webGridAddRow;
            propertyEditorPropertyDescription2.buttonClicked = this.webGridUndo;
            propertyEditorPropertyDescription3.buttonClicked = this.webGridRedo;
            propertyEditorPropertyDescription4.buttonClicked = this.webGridCommit;
            grid.data = this.nwindData;
            column1.bodyTemplate = this.webGridDeleteCellTemplate;
        }
        this._bind();

    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
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

    public webGridAddRow(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        //TODO
        var grid = this.grid;
        const randomInteger = (start: number, end: number) => Math.floor(Math.random() * (end - start + 1)) + start;
        const randomFloat = (start: number, end: number) => Math.random() * (end - start) + start;

        //TODO Refactor later
        if (!(grid as any).__productId) {
            (grid as any).__productId = 0;
        }
        var year = randomInteger(2000, 2050);
        var month = randomInteger(0, 11);
        var day = randomInteger(1, 25);
        grid.addRow({
            CategoryID: randomInteger(1, 10),
            Discontinued: randomInteger(1, 10) % 2 === 0,
            OrderDate: new Date(year, month, day).toISOString().slice(0, 10),
            ProductID: (grid as any).__productId++,
            ProductName: 'Product with index ' + randomInteger(0, 20),
            QuantityPerUnit: (randomInteger(1, 10) * 10).toString() + ' pcs.',
            ReorderLevel: randomInteger(10, 20),
            SupplierID: randomInteger(1, 20),
            UnitPrice: randomInteger(10, 1000),
            UnitsInStock: randomInteger(1, 100),
            UnitsOnOrder: randomInteger(1, 20)
        });

        console.log("test");
    }

    public webGridUndo(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        //TODO

        var grid = this.grid;
        //grid.endEdit(true);
        //grid.transactions.undo();

    }

    public webGridRedo(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        //TODO

        var grid = this.grid;

        //grid.endEdit(true);
        //grid.transactions.redo();

    }

    public webGridCommit(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        //TODO

        var grid = this.grid;

        // grid.transactions.commit(grid.data);
        //dialog.close();

        console.log("test");
    }

    public webGridDeleteCellTemplate = (ctx: IgcCellTemplateContext) => {
        var grid = this.grid;
        var id = ctx.cell.id.rowID;
        return html`<igc-button @click=${(e: any) => grid.deleteRow(id)}>Delete</igc-button>`;
    }

}

new Sample();
