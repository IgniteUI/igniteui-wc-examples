import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule, WebSelectDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { RoleplayTreeGridDataItem, RoleplayTreeGridData } from './RoleplayTreeGridData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private treeGrid1: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid1 = this.treeGrid1 = document.getElementById('treeGrid1') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid1.data = this.roleplayTreeGridData;
        }
        this._bind();

    }

    private _roleplayTreeGridData: RoleplayTreeGridData = null;
    public get roleplayTreeGridData(): RoleplayTreeGridData {
        if (this._roleplayTreeGridData == null)
        {
            this._roleplayTreeGridData = new RoleplayTreeGridData();
        }
        return this._roleplayTreeGridData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
            WebSelectDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
