import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { FinancialDataAllItem, FinancialDataAll } from './FinancialDataAll';
import { IgcBadgeComponent } from 'igniteui-webcomponents';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.financialDataAll;
            column1.bodyTemplate = this.webGridCurrencyCellTemplate;
            column2.bodyTemplate = this.webGridCurrencyCellTemplate;
            column3.bodyTemplate = this.webGridCurrencyCellTemplate;
        }
        this._bind();

    }

    private _financialDataAll: FinancialDataAll = null;
    public get financialDataAll(): FinancialDataAll {
        if (this._financialDataAll == null)
        {
            this._financialDataAll = new FinancialDataAll();
        }
        return this._financialDataAll;
    }


    public webGridCurrencyCellTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value > 0) {
            return html`<div style='width: 80px;
            float: right;'>
            <igc-badge variant="success" style="float: left;"><span>▲</span></igc-badge>
            <span style='color:green;float: right;'>${ctx.cell.value.toFixed(2)}</span>
            </div>`;
        } else {
            return html`<div style='width: 80px;
            float: right;'>
            <igc-badge variant="danger" style="float: left;"><span>▼</span></igc-badge>
            <span style='color:red;float: right;'>${ctx.cell.value.toFixed(2)}</span>
            </div>`;
        }
    }

}

new Sample();
