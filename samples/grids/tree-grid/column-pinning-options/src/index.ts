import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import { IgcColumnTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private column5: IgcColumnComponent
    private column6: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatData
            column1.headerTemplate = this.webTreeGridPinHeaderTemplate
            column2.headerTemplate = this.webTreeGridPinHeaderTemplate
            column3.headerTemplate = this.webTreeGridPinHeaderTemplate
            column4.headerTemplate = this.webTreeGridPinHeaderTemplate
            column5.headerTemplate = this.webTreeGridPinHeaderTemplate
            column6.headerTemplate = this.webTreeGridPinHeaderTemplate
        }
        this._bind();

    }

    private _employeesFlatData: EmployeesFlatData = null;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
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
        return html`<div>
                     <span style="float:left">${column.field}</span>
                     <span style="float:right" @pointerdown=${(e: any) => this.toggleColumnPin(column.field)}>📌</span>
                   </div>`;
        };

    public toggleColumnPin(field: string) {
        var grid = document.getElementsByTagName("igc-tree-grid")[0] as IgcTreeGridComponent;
        var col = grid.getColumnByName(field);
        col.pinned = !col.pinned;
        grid.markForCheck();
    }
}

new Sample();
