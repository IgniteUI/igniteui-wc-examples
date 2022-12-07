import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent
    private orderID: IgcColumnComponent
    private shipCountry: IgcColumnComponent
    private orderDate: IgcColumnComponent
    private postalCode: IgcColumnComponent
    private discontinued: IgcColumnComponent
    private shipName: IgcColumnComponent
    private shipperName: IgcColumnComponent
    private salesPerson: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private quantity: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        // var orderID = this.orderID = document.getElementById('OrderID') as IgcColumnComponent;
        // var shipCountry = this.shipCountry = document.getElementById('ShipCountry') as IgcColumnComponent;
        // var orderDate = this.orderDate = document.getElementById('OrderDate') as IgcColumnComponent;
        // var postalCode = this.postalCode = document.getElementById('PostalCode') as IgcColumnComponent;
        // var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;
        // var shipName = this.shipName = document.getElementById('ShipName') as IgcColumnComponent;
        // var shipperName = this.shipperName = document.getElementById('ShipperName') as IgcColumnComponent;
        // var salesPerson = this.salesPerson = document.getElementById('SalesPerson') as IgcColumnComponent;
        // var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        // var quantity = this.quantity = document.getElementById('Quantity') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.invoicesData
        }
        this._bind();

    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
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

}

new Sample();
