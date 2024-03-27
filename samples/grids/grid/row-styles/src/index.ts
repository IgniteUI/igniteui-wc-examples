import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { FinancialDataAllItem, FinancialDataAll } from './FinancialDataAll';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcRowType, IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { IgcBadgeComponent } from 'igniteui-webcomponents';
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
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.financialDataAll;
            grid.rowStyles = this.webGridRowStylesHandler;
            column1.bodyTemplate = this.webGridCurrencyCellTemplate;
            column2.bodyTemplate = this.webGridCurrencyCellTemplate;
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


    public webGridRowStylesHandler = {
        'background': (row: IgcRowType) => (+row.data['Change'] < 0 && +row.data['AnnualChange'] < 0) ? '#FF000088' : '#00000000',
        'border': (row: IgcRowType) => (+row.data['Change'] < 0 && +row.data['AnnualChange'] < 0) ? '2px solid' : '1px solid',
        'border-color': (row: IgcRowType) => (+row.data['Change'] < 0 && +row.data['AnnualChange'] < 0) ? '#FF000099' : '#E9E9E9'
    };

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
        };
    }

}

new Sample();
