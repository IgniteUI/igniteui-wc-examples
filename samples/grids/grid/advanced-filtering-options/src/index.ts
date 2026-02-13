import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.nwindData;
            column1.bodyTemplate = this.webGridDiscontinuedCellTemplate;
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
        }
        return this._componentRenderer;
    }

    public webGridDiscontinuedCellTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value) {
            return html`<img src="https://dl.infragistics.com/x/img/grid/active.png" title="Continued" alt="Continued" />`
        } else {
            return html`<img src="https://dl.infragistics.com/x/img/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
        }
    };

}

export function initialize() {
  return new Sample();
}