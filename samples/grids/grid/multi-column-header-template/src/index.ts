import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnGroupDescriptionModule, PropertyEditorPanelDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcColumnComponent, IgcColumnGroupComponent, IgcColumnTemplateContext, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { html } from 'lit-html';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {
    private grid: IgcGridComponent
    private _bind: () => void;
    public columnGroupStates = new Map<IgcColumnGroupComponent, boolean>();

    constructor() {
        var columnGroup1 = document.getElementById("column-group-1") as IgcColumnGroupComponent;
        var columnGroup2 = document.getElementById("column-group-2") as IgcColumnGroupComponent;

        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {

            grid.data = this.customersData;
            columnGroup1.headerTemplate = this.webGridColumnGroupHeaderTemplate;
            columnGroup2.headerTemplate = this.webGridColumnGroupHeaderTemplate;
        }
        this._bind();

    }

    private _customersData: CustomersData = null;
    public get customersData(): CustomersData {
        if (this._customersData == null) {
            this._customersData = new CustomersData();
        }
        for (const item of this._customersData) {
            item.Location = `${item.Address}, ${item.City}, ${item.Country}`;
        }
        return this._customersData;
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

    public toggleColumnGroup(columnGroup: IgcColumnGroupComponent) {
        const columns = Array.from(columnGroup.children);
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
