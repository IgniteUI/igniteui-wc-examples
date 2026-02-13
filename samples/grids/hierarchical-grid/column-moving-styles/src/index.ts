import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcPaginatorComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import HierarchicalCustomers from './HierarchicalCustomers.json';
import { IgcColumnTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcHierarchicalGridComponent
    private paginator: IgcPaginatorComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private column5: IgcColumnComponent
    private column6: IgcColumnComponent
    private column7: IgcColumnComponent
    private column8: IgcColumnComponent
    private column9: IgcColumnComponent
    private column10: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;
        var column7 = this.column7 = document.getElementById('column7') as IgcColumnComponent;
        var column8 = this.column8 = document.getElementById('column8') as IgcColumnComponent;
        var column9 = this.column9 = document.getElementById('column9') as IgcColumnComponent;
        var column10 = this.column10 = document.getElementById('column10') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.hierarchicalCustomers;
            column1.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column2.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column3.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column4.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column5.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column6.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column7.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column8.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column9.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column10.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
        }
        this._bind();

    }

    private _hierarchicalCustomers: any[] = HierarchicalCustomers;
    public get hierarchicalCustomers(): any[] {
        return this._hierarchicalCustomers;
    }


    public hierarchicalGridPinHeaderTemplate = (ctx: IgcColumnTemplateContext) => {

        const column = (ctx as any).column;
        return html`<div style="display:flex;">
                     <span>${column.field}</span>
                     <span style="margin-left: auto; cursor: pointer;" @click=${(e: any) => this.toggleColumnPin(column)}>📌</span>
                   </div>`;
    };

        public toggleColumnPin(field: IgcColumnComponent) {
            if(field) {
              field.pinned = !field.pinned;
            }
        }
}

export function initialize() {
  return new Sample();
}