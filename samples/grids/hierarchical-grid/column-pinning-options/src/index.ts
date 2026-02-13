import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import HierarchicalCustomersData from './HierarchicalCustomersData.json';
import { IgcColumnTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcHierarchicalGridComponent
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
    private column11: IgcColumnComponent
    private column12: IgcColumnComponent
    private column13: IgcColumnComponent
    private column14: IgcColumnComponent
    private column15: IgcColumnComponent
    private column16: IgcColumnComponent
    private column17: IgcColumnComponent
    private column18: IgcColumnComponent
    private column19: IgcColumnComponent
    private column20: IgcColumnComponent
    private column21: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
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
        var column11 = this.column11 = document.getElementById('column11') as IgcColumnComponent;
        var column12 = this.column12 = document.getElementById('column12') as IgcColumnComponent;
        var column13 = this.column13 = document.getElementById('column13') as IgcColumnComponent;
        var column14 = this.column14 = document.getElementById('column14') as IgcColumnComponent;
        var column15 = this.column15 = document.getElementById('column15') as IgcColumnComponent;
        var column16 = this.column16 = document.getElementById('column16') as IgcColumnComponent;
        var column17 = this.column17 = document.getElementById('column17') as IgcColumnComponent;
        var column18 = this.column18 = document.getElementById('column18') as IgcColumnComponent;
        var column19 = this.column19 = document.getElementById('column19') as IgcColumnComponent;
        var column20 = this.column20 = document.getElementById('column20') as IgcColumnComponent;
        var column21 = this.column21 = document.getElementById('column21') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.hierarchicalCustomersData;
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
            column11.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column12.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column13.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column14.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column15.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column16.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column17.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column18.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column19.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column20.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
            column21.headerTemplate = this.hierarchicalGridPinHeaderTemplate;
        }
        this._bind();

    }

    private _hierarchicalCustomersData: any[] = HierarchicalCustomersData;
    public get hierarchicalCustomersData(): any[] {
        return this._hierarchicalCustomersData;
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