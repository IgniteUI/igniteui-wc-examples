import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { OrdersTreeDataItem, OrdersTreeData } from './OrdersTreeData';
import { IgcColumnTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

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
            treeGrid.data = this.ordersTreeData;
            column1.headerTemplate = this.webTreeGridSummariesHeaderTemplate;
            column2.headerTemplate = this.webTreeGridSummariesHeaderTemplate;
            column3.headerTemplate = this.webTreeGridSummariesHeaderTemplate;
            column4.headerTemplate = this.webTreeGridSummariesHeaderTemplate;
            column5.headerTemplate = this.webTreeGridSummariesHeaderTemplate;
            column6.headerTemplate = this.webTreeGridSummariesHeaderTemplate;
        }
        this._bind();

    }

    private _ordersTreeData: OrdersTreeData = null;
    public get ordersTreeData(): OrdersTreeData {
        if (this._ordersTreeData == null)
        {
            this._ordersTreeData = new OrdersTreeData();
        }
        return this._ordersTreeData;
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

    public webTreeGridSummariesHeaderTemplate = (ctx: IgcColumnTemplateContext) => {

      const column = (ctx as any).column;
      return html`<div>
                   <span style="float:left">${column.field}</span>
                   <span style="float:right; color: ${column.hasSummary ? '#e41c77' : ''}" @pointerdown=${(e: any) => this.toggleSummary(column)}>∑</span>
                 </div>`;
    };

      public toggleSummary(field: IgcColumnComponent) {
        if (field) {
          field.hasSummary = !field.hasSummary;
        }
      }
}

export function initialize() {
  return new Sample();
}