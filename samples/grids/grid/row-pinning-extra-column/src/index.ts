import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import CustomersDataLocal from './CustomersDataLocal.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.customersDataLocal;
            column1.bodyTemplate = this.webGridRowPinCellTemplate;
        }
        this._bind();

    }

    private _customersDataLocal: any[] = CustomersDataLocal;
    public get customersDataLocal(): any[] {
        return this._customersDataLocal;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

        public webGridRowPinCellTemplate = (ctx: IgcCellTemplateContext) => {
            const index = ctx.cell.id.rowIndex;
            const grid = this.grid;
            const row = grid.rowList.find((x:any) => x.index === index);
            if (row && row.pinned && row.disabled) {
                return html``;
            }
            return html`<div class='customIcon'><span class='customIconSpan' @pointerdown=${(e: any) => this.toggleRowPin(index)}>📌</span></div>`
    }

    public toggleRowPin(index: number) {
        var grid = this.grid;
        grid.getRowByIndex(index).pinned = !grid.getRowByIndex(index).pinned;
        grid.markForCheck();
    }
}

new Sample();
