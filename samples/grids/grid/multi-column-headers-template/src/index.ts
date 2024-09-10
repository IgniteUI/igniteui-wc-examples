import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnGroupDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnGroupComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcColumnTemplateContext, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private columnGroup1: IgcColumnGroupComponent
    private columnGroup2: IgcColumnGroupComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var columnGroup1 = this.columnGroup1 = document.getElementById('columnGroup1') as IgcColumnGroupComponent;
        var columnGroup2 = this.columnGroup2 = document.getElementById('columnGroup2') as IgcColumnGroupComponent;

        this._bind = () => {
            grid.data = this.customersData;
            columnGroup1.headerTemplate = this.webGridColumnGroupHeaderTemplate;
            columnGroup2.headerTemplate = this.webGridColumnGroupHeaderTemplate;
        }
        this._bind();

    }

    private _customersData: CustomersData = null;
    public get customersData(): CustomersData {
        if (this._customersData == null)
        {
            this._customersData = new CustomersData();
        }
        return this._customersData;
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

    public webGridColumnGroupHeaderTemplate = (ctx: IgcColumnTemplateContext) => {
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
