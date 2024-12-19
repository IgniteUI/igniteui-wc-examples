import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnGroupDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnGroupComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcGridComponent, IgcColumnTemplateContext, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private columnGroup1: IgcColumnGroupComponent
    private columnGroup2: IgcColumnGroupComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var columnGroup1 = this.columnGroup1 = document.getElementById('columnGroup1') as IgcColumnGroupComponent;
        var columnGroup2 = this.columnGroup2 = document.getElementById('columnGroup2') as IgcColumnGroupComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatDetails;
            columnGroup1.headerTemplate = this.webTreeGridColumnGroupHeaderTemplate;
            columnGroup2.headerTemplate = this.webTreeGridColumnGroupHeaderTemplate;
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
            WebGridDescriptionModule.register(context);
            WebColumnGroupDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridColumnGroupHeaderTemplate = (ctx: IgcColumnTemplateContext) => {
        const column = (ctx as any).column;
        return html`<div style="display:flex;align-items:center;gap:5px;">
                    <span draggable="false"  @click=${(e: any) => this.toggleColumnGroup(column)}>
                ${this.columnGroupStates.get(column) ? "🔽" : "🔼"}
                    </span>
                        <span>${column.header}</span>
                    </div>`;
    };

    public columnGroupStates = new Map<IgcColumnGroupComponent, boolean>();
    public toggleColumnGroup(columnGroup: IgcColumnGroupComponent) {
        const columns = columnGroup.childColumns;
        if (columnGroup.header === 'General Information') {
            const col = columns[1] as IgcColumnComponent;
            col.hidden = !col.hidden;
        } else if (columnGroup.header === 'Address Information') {
            for (const col of columns) {
                const c = col as IgcColumnComponent;
                c.hidden = !c.hidden;
            }
        }
        this.columnGroupStates.set(columnGroup, !this.columnGroupStates.get(columnGroup));
    }
}

new Sample();
