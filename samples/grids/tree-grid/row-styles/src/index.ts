import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcRowType } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatDetails;
            treeGrid.rowStyles = this.webTreeGridRowStylesHandler;
        }
        this._bind();

    }

    private _employeesFlatDetails: EmployeesFlatDetails = null;
    public get employeesFlatDetails(): EmployeesFlatDetails {
        if (this._employeesFlatDetails == null)
        {
            this._employeesFlatDetails = new EmployeesFlatDetails();
        }
        return this._employeesFlatDetails;
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

    public webTreeGridRowStylesHandler = {
        'background': (row: IgcRowType) => row.data['Title'] === 'CEO' ? '#6c757d' : row.data['Title'].includes('President') ? '#adb5bd' :
            row.data['Title'].includes('Director') ? '#ced4da' : row.data['Title'].includes('Manager') ? '#dee2e6' :
            row.data['Title'].includes('Lead') ? '#e9ecef' : row.data['Title'].includes('Senior') ? '#f8f9fa' : null,
        'border-left': (row: IgcRowType) => row.data['Title'] === 'CEO' || row.data['Title'].includes('President') ? '2px solid' : null,
        'border-color': (row: IgcRowType) => row.data['Title'] === 'CEO' ? '#495057' : null,
        'color': (row: IgcRowType) => row.data['Title'] === 'CEO' ? '#fff' : null
    };

}

new Sample();
