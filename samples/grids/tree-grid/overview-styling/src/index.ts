import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedDataItem, EmployeesNestedDataItem_EmployeesItem, EmployeesNestedData } from './EmployeesNestedData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid.data = this.employeesNestedData;
        }
        this._bind();

    }

    private _employeesNestedData: EmployeesNestedData = null;
    public get employeesNestedData(): EmployeesNestedData {
        if (this._employeesNestedData == null)
        {
            this._employeesNestedData = new EmployeesNestedData();
        }
        return this._employeesNestedData;
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

}

export function initialize() {
  return new Sample();
}