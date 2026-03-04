import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcColumnTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private column5: IgcColumnComponent
    private column6: IgcColumnComponent
    private column7: IgcColumnComponent
    private column8: IgcColumnComponent
    private column9: IgcColumnComponent
    private column10: IgcColumnComponent
    private column11: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;
        var column7 = this.column7 = document.getElementById('column7') as IgcColumnComponent;
        var column8 = this.column8 = document.getElementById('column8') as IgcColumnComponent;
        var column9 = this.column9 = document.getElementById('column9') as IgcColumnComponent;
        var column10 = this.column10 = document.getElementById('column10') as IgcColumnComponent;
        var column11 = this.column11 = document.getElementById('column11') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.employeesFlatDetails;
            column1.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column2.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column3.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column4.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column5.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column6.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column7.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column8.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column9.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column10.headerTemplate = this.webTreeGridPinHeaderTemplate;
            column11.headerTemplate = this.webTreeGridPinHeaderTemplate;
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

    public webTreeGridPinHeaderTemplate = (ctx: IgcColumnTemplateContext) => {

        const column = (ctx as any).column;
        return html`<div style="display:flex;">
                     <span>${column.field}</span>
                     <span style="margin-left: auto; cursor: pointer;" @pointerdown=${(e: any) => this.toggleColumnPin(column.field)}>📌</span>
                   </div>`;
        };

    public toggleColumnPin(field: string) {
        var grid = this.grid;
        var col = grid.getColumnByName(field);
        col.pinned = !col.pinned;
        grid.markForCheck();
    }
}

new Sample();
