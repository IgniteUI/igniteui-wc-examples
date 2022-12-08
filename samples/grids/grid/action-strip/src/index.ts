import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcActionStripComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent
    private actionStrip: IgcActionStripComponent
    private productName: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private unitsOnOrder: IgcColumnComponent
    private unitsInStock: IgcColumnComponent
    private quantityPerUnit: IgcColumnComponent
    private reorderLevel: IgcColumnComponent
    private discontinued: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var actionStrip = this.actionStrip = document.getElementById('actionStrip') as IgcActionStripComponent;
        var productName = this.productName = document.getElementById('ProductName') as IgcColumnComponent;
        var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        var unitsOnOrder = this.unitsOnOrder = document.getElementById('UnitsOnOrder') as IgcColumnComponent;
        var unitsInStock = this.unitsInStock = document.getElementById('UnitsInStock') as IgcColumnComponent;
        var quantityPerUnit = this.quantityPerUnit = document.getElementById('QuantityPerUnit') as IgcColumnComponent;
        var reorderLevel = this.reorderLevel = document.getElementById('ReorderLevel') as IgcColumnComponent;
        var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.nwindData
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

}

new Sample();
