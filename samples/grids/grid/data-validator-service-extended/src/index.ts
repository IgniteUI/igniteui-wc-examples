import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription2: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription3: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
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
        this.webGridUndo = this.webGridUndo.bind(this);
        var propertyEditorPropertyDescription2 = this.propertyEditorPropertyDescription2 = document.getElementById('propertyEditorPropertyDescription2') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridRedo = this.webGridRedo.bind(this);
        var propertyEditorPropertyDescription3 = this.propertyEditorPropertyDescription3 = document.getElementById('propertyEditorPropertyDescription3') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridCommit = this.webGridCommit.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
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
            propertyEditorPropertyDescription1.buttonClicked = this.webGridUndo;
            propertyEditorPropertyDescription2.buttonClicked = this.webGridRedo;
            propertyEditorPropertyDescription3.buttonClicked = this.webGridCommit;
            grid.data = this.nwindData;
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

}

new Sample();
