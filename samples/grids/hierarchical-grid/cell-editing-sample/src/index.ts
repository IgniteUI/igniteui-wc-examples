import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule, WebSelectDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import HGridDndData from './HGridDndData.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.hGridDndData;
            column1.inlineEditorTemplate = this.hGridCellEditCellTemplate;
            column2.inlineEditorTemplate = this.hGridCellEditCellTemplate;
            column3.inlineEditorTemplate = this.hGridCellEditCellTemplate;
        }
        this._bind();

    }

    private _hGridDndData: any[] = HGridDndData;
    public get hGridDndData(): any[] {
        return this._hGridDndData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebHierarchicalGridDescriptionModule.register(context);
            WebSelectDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public hGridCellEditCellTemplate = (ctx: IgcCellTemplateContext) => {
        let cellValues: any = [];
        let uniqueValues: any = [];
        for(const i of (this.hGridDndData as any)){
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
        <igc-select style="width:100%; height:100%" size="large" @igcChange=${(e: any) => ctx.cell.editValue = e.detail.value}>
              ${cellValues}
        </igc-select>
    `;
    }

}

new Sample();
