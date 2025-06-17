import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebPaginatorDescriptionModule, WebInputDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridOnEditEnter = this.webGridOnEditEnter.bind(this);
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.nwindData;
            grid.addEventListener("cellEditEnter", this.webGridOnEditEnter);
            column1.inlineEditorTemplate = this.webGridNumericColEditCellTemplate;
        }
        this._bind();

    }

    private _nwindData: any[] = NwindData;
    public get nwindData(): any[] {
        return this._nwindData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            WebPaginatorDescriptionModule.register(context);
            WebInputDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridOnEditEnter(args: any): void {
        const column = args.detail.column;
        if(column.field === 'ReorderLevel') {
            setTimeout(() => {
                const rowId = args.detail.cellID.rowID;
                const columnId = args.detail.cellID.columnID;
                const inputTemplateId = `edit-cell-${rowId}-${columnId}`;
                const element = document.getElementById(inputTemplateId);
                element?.focus();
            });
        }
    }

    public webGridNumericColEditCellTemplate = (ctx: IgcCellTemplateContext) => {
        const cell = ctx.cell;
        const columnName = cell.column.field;
        const cellValue = cell.row.data[columnName];
        const rowId = cell.id.rowID;
        const columnId = cell.id.columnID;
        const inputTemplateId = `edit-cell-${rowId}-${columnId}`;

        return html`
            <igc-input
                type="number"
                id="${inputTemplateId}"
                name="${cell.id.rowID}"
                style="width: 100%;"
                value="${cellValue}"
                @igcChange=${(e: any) => {
                    cell.editValue = e.detail;
                }}>
            </igc-input>`;
    }

}

new Sample();
