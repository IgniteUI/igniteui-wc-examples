import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule, WebSelectDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { RoleplayTreeGridDataItem, RoleplayTreeGridData } from './RoleplayTreeGridData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private treeGrid1: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid1 = this.treeGrid1 = document.getElementById('treeGrid1') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            treeGrid1.data = this.roleplayTreeGridData;
            column1.inlineEditorTemplate = this.webTreeGridCellEditCellTemplate;
            column2.inlineEditorTemplate = this.webTreeGridCellEditCellTemplate;
            column3.inlineEditorTemplate = this.webTreeGridCellEditCellTemplate;
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

    public webTreeGridCellEditCellTemplate = (ctx: IgcCellTemplateContext) => {
        let cellValues: any = [];
        let uniqueValues: any = [];
        let roleplayData = this.roleplayTreeGridData
        for (const i of (roleplayData as any)){
            const field: string = ctx.cell.column.field;
            if(uniqueValues.indexOf(i[field]) === -1 )
            {
                if (ctx.cell.value == i[field]) {
                    cellValues.push(html`<igc-select-item selected value=${i[field]}>${(i[field])}</igc-select-item>`);
                } else cellValues.push(html`<igc-select-item value=${i[field]}>${(i[field])}</igc-select-item>`);
                uniqueValues.push(i[field]);
            }
        }
        return html`
        <igc-select style="width:100%; height:100%; --ig-size: var(--ig-size-large);" @igcChange=${(e: any) => ctx.cell.editValue = e.detail.value}>
              ${cellValues}
        </igc-select>
    `;
    }

}

export function initialize() {
  return new Sample();
}