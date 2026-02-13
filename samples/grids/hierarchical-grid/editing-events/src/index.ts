import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule, WebPaginatorDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import { IgcGridComponent, IgcGridEditEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        this.webGridEditingEventsCellEdit = this.webGridEditingEventsCellEdit.bind(this);

        this._bind = () => {
            grid.data = this.nwindData;
            grid.addEventListener("cellEdit", this.webGridEditingEventsCellEdit);
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
            WebHierarchicalGridDescriptionModule.register(context);
            WebPaginatorDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridEditingEventsCellEdit(args: CustomEvent<IgcGridEditEventArgs>): void {
        var d = args.detail;

        if (d.column != null && d.column.field == "UnitsOnOrder") {
            if (d.newValue > d.rowData.UnitsInStock) {
                d.cancel = true;
                alert("You cannot order more than the units in stock!")
            }
        }
    }

}

export function initialize() {
  return new Sample();
}