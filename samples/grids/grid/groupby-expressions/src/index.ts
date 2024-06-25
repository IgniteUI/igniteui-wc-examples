import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { InvoicesWorldDataItem, InvoicesWorldData } from './InvoicesWorldData';
import { IgcGroupByRecord, IgcGroupByRowTemplateContext, IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
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
            grid.data = this.invoicesWorldData;
            grid.groupRowTemplate = this.webGridGroupByRowTemplate;
            column1.bodyTemplate = this.webGridBooleanCellTemplate;
        }
        this._bind();

    }

    private _invoicesWorldData: InvoicesWorldData = null;
    public get invoicesWorldData(): InvoicesWorldData {
        if (this._invoicesWorldData == null)
        {
            this._invoicesWorldData = new InvoicesWorldData();
        }
        return this._invoicesWorldData;
    }


        public webGridGroupByRowTemplate = (ctx: IgcGroupByRowTemplateContext) => {

            const groupRow: IgcGroupByRecord = ctx.implicit;
            const values = groupRow.records;

            const startDate = new Date('1/1/2017');
            const endDate = new Date('12/31/2017');
            var calc2017 = values.filter((x) => new Date(x.OrderDate) >= startDate && new Date(x.OrderDate) <= endDate).length;

            return html`<div>
    <span style="color:#09f;">${groupRow.expression.fieldName} :</span>
    <span>${groupRow.value}</span>
    <igc-badge>${groupRow.records.length}</igc-badge>
    <span style="color:#09f;"> Ordered in 2017:</span><span>${calc2017}</span>
    </div>`;

        };

        public webGridBooleanCellTemplate = (ctx: IgcCellTemplateContext) => {
            if (ctx.cell.value) {
                return html`<img src="https://static.infragistics.com/xplatform/images/grid/active.png" title="Continued" alt="Continued" />`
            } else {
                return html`<img src="https://static.infragistics.com/xplatform/images/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
            }
    }

}

new Sample();
