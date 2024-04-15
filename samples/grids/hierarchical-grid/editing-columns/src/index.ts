import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule, WebPaginatorDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.nwindData;
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
            WebHierarchicalGridDescriptionModule.register(context);
            WebPaginatorDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
