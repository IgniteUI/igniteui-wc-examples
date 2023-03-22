import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcGroupingExpression, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';
import { IgcGroupByRowTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

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
            grid.data = this.invoicesData;
            grid.groupingExpressions = this.groupingExpression1;
            grid.groupRowTemplate = this.webGridGroupByRowTemplate;
        }
        this._bind();

    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }


        public webGridGroupByRowTemplate = (ctx: IgcGroupByRowTemplateContext) => {

            const groupRow: any = ctx["$implicit"];
            const values = groupRow.records;

            const startDate = new Date('1/1/2022');
            const endDate = new Date('12/31/2022');
            var calc2022 = values.filter((x) => new Date(x.orderDate) >= startDate && new Date(x.orderDate) <= endDate).length;

            return html`<div>
    <span style="color:#09f;">${groupRow.expression.fieldName} :</span>
    <span>${groupRow.value}</span>
    <igc-badge>${groupRow.records.length}</igc-badge>
    <span style="color:#09f;"> Ordered in 2022:</span><span>${calc2022}</span>
    </div>`;

        };

}

new Sample();
