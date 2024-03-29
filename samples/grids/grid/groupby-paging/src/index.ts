import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcGroupingExpression, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { InvoicesWorldDataItem, InvoicesWorldData } from './InvoicesWorldData';
import { IgcGroupByRecord, IgcGroupByRowTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _groupingExpression1: IgcGroupingExpression[] | null = null;
    public get groupingExpression1(): IgcGroupingExpression[] {
        if (this._groupingExpression1 == null)
        {
            let groupingExpression1: IgcGroupingExpression[] = [];
            var groupingExpression2: IgcGroupingExpression = {} as IgcGroupingExpression;
            groupingExpression2.dir = SortingDirection.Asc;
            groupingExpression2.fieldName = "ShipCountry";
            groupingExpression2.ignoreCase = false;

            groupingExpression1.push(groupingExpression2)
            this._groupingExpression1 = groupingExpression1;
        }
        return this._groupingExpression1;
    }
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.invoicesWorldData;
            grid.groupingExpressions = this.groupingExpression1;
            grid.groupRowTemplate = this.webGridGroupByRowTemplate;
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

}

new Sample();
