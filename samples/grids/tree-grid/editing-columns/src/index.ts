import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule, WebPaginatorDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private treeGrid1: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid1 = this.treeGrid1 = document.getElementById('treeGrid1') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid1.data = this.nwindData;
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
            WebPaginatorDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
