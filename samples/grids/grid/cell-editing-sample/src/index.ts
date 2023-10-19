import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebSelectDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { WebGridCellEditSampleRoleplayItem, WebGridCellEditSampleRoleplay } from './WebGridCellEditSampleRoleplay';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private grid1: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            grid1.data = this.webGridCellEditSampleRoleplay;
            column1.inlineEditorTemplate = this.webGridCellEditCellTemplate;
            column2.inlineEditorTemplate = this.webGridCellEditCellTemplate;
            column3.inlineEditorTemplate = this.webGridCellEditCellTemplate;
        }
        this._bind();

    }

    private _webGridCellEditSampleRoleplay: WebGridCellEditSampleRoleplay = null;
    public get webGridCellEditSampleRoleplay(): WebGridCellEditSampleRoleplay {
        if (this._webGridCellEditSampleRoleplay == null)
        {
            this._webGridCellEditSampleRoleplay = new WebGridCellEditSampleRoleplay();
        }
        return this._webGridCellEditSampleRoleplay;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            WebSelectDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridCellEditCellTemplate = (ctx: IgcCellTemplateContext) => {
        let cellValues: any = [];
        let uniqueValues: any = [];
        for(const i of (this.webGridCellEditSampleRoleplay as any)){
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
