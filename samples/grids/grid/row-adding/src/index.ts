import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private grid: IgcGridComponent
    private iD: IgcColumnComponent
    private reorderLevel: IgcColumnComponent
    private productName: IgcColumnComponent
    private unitsInStock: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private orderDate: IgcColumnComponent
    private discontinued: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var iD = this.iD = document.getElementById('ID') as IgcColumnComponent;
        var reorderLevel = this.reorderLevel = document.getElementById('ReorderLevel') as IgcColumnComponent;
        var productName = this.productName = document.getElementById('ProductName') as IgcColumnComponent;
        var unitsInStock = this.unitsInStock = document.getElementById('UnitsInStock') as IgcColumnComponent;
        var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        var orderDate = this.orderDate = document.getElementById('OrderDate') as IgcColumnComponent;
        var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.nwindData;
        }
        this._bind();
    }

    private _nwindData: any[] = NwindData;
    public get nwindData(): any[] {
        return this._nwindData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
