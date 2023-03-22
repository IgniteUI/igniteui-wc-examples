import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private treeGrid1: IgcTreeGridComponent
    private unitsInStock: IgcColumnComponent
    private unitsOnOrder: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid1 = this.treeGrid1 = document.getElementById('treeGrid1') as IgcTreeGridComponent;
        this.webGridEditingEventsCellEdit = this.webGridEditingEventsCellEdit.bind(this);
        var unitsInStock = this.unitsInStock = document.getElementById('UnitsInStock') as IgcColumnComponent;
        var unitsOnOrder = this.unitsOnOrder = document.getElementById('UnitsOnOrder') as IgcColumnComponent;

        this._bind = () => {
            treeGrid1.data = this.nwindData;
            treeGrid1.addEventListener("cellEdit", this.webGridEditingEventsCellEdit);
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
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridEditingEventsCellEdit(args: any): void {
        var d = args.detail;

        if (d.column != null && d.column.field == "UnitsOnOrder") {
            if (d.newValue > d.rowData.UnitsInStock) {
                d.cancel = true;
                alert("You cannot order more than the units in stock!")
            }
        }
    }

}

new Sample();
