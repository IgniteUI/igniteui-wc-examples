import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { FinancialDataAllItem, FinancialDataAll } from './FinancialDataAll';
import { IgcColumnTemplateContext, IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';
import { IgcBadgeComponent } from 'igniteui-webcomponents';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.currencyCode = "USD";
            columnPipeArgs1.digitsInfo = "1.2-2";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private column4: IgcColumnComponent
    private _columnPipeArgs2: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs2(): IgcColumnPipeArgs {
        if (this._columnPipeArgs2 == null)
        {
            var columnPipeArgs2: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs2.currencyCode = "USD";
            columnPipeArgs2.digitsInfo = "1.2-2";

            this._columnPipeArgs2 = columnPipeArgs2;
        }
        return this._columnPipeArgs2;
    }
    private column5: IgcColumnComponent
    private _columnPipeArgs3: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs3(): IgcColumnPipeArgs {
        if (this._columnPipeArgs3 == null)
        {
            var columnPipeArgs3: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs3.currencyCode = "USD";
            columnPipeArgs3.digitsInfo = "1.2-2";

            this._columnPipeArgs3 = columnPipeArgs3;
        }
        return this._columnPipeArgs3;
    }
    private column6: IgcColumnComponent
    private column7: IgcColumnComponent
    private column8: IgcColumnComponent
    private column9: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;
        var column7 = this.column7 = document.getElementById('column7') as IgcColumnComponent;
        var column8 = this.column8 = document.getElementById('column8') as IgcColumnComponent;
        var column9 = this.column9 = document.getElementById('column9') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.financialDataAll;
            column1.headerTemplate = this.webGridPinHeaderTemplate;
            column2.headerTemplate = this.webGridPinHeaderTemplate;
            column3.pipeArgs = this.columnPipeArgs1;
            column3.headerTemplate = this.webGridPinHeaderTemplate;
            column4.pipeArgs = this.columnPipeArgs2;
            column4.headerTemplate = this.webGridPinHeaderTemplate;
            column5.pipeArgs = this.columnPipeArgs3;
            column5.headerTemplate = this.webGridPinHeaderTemplate;
            column6.headerTemplate = this.webGridPinHeaderTemplate;
            column7.bodyTemplate = this.webGridCurrencyCellTemplate;
            column7.headerTemplate = this.webGridPinHeaderTemplate;
            column8.bodyTemplate = this.webGridCurrencyCellTemplate;
            column8.headerTemplate = this.webGridPinHeaderTemplate;
            column9.bodyTemplate = this.webGridCurrencyCellTemplate;
            column9.headerTemplate = this.webGridPinHeaderTemplate;
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


    public webGridPinHeaderTemplate = (ctx: IgcColumnTemplateContext) => {

        const column = (ctx as any).column;
        return html`<div>
                     <span style="float:left">${column.field}</span>
                     <span style="float:right" @pointerdown=${(e: any) => this.toggleColumnPin(column.field)}>📌</span>
                   </div>`;
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

    public toggleColumnPin(field: string) {
        var grid = document.getElementsByTagName("igc-grid")[0] as IgcGridComponent;
        var col = grid.getColumnByName(field);
        col.pinned = !col.pinned;
        grid.markForCheck();
    }
}

new Sample();
