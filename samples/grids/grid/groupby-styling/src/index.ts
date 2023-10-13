import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcGroupingExpression, SortingDirection, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
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
            var groupingExpression3: IgcGroupingExpression = {} as IgcGroupingExpression;
            groupingExpression3.dir = SortingDirection.Asc;
            groupingExpression3.fieldName = "ShipCity";
            groupingExpression3.ignoreCase = false;

            groupingExpression1.push(groupingExpression3)
            this._groupingExpression1 = groupingExpression1;
        }
        return this._groupingExpression1;
    }
    private orderID: IgcColumnComponent
    private shipCountry: IgcColumnComponent
    private orderDate: IgcColumnComponent
    private postalCode: IgcColumnComponent
    private discontinued: IgcColumnComponent
    private shipName: IgcColumnComponent
    private shipCity: IgcColumnComponent
    private shipperName: IgcColumnComponent
    private salesperson: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.digitsInfo = "1.2-2";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private quantity: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var orderID = this.orderID = document.getElementById('OrderID') as IgcColumnComponent;
        var shipCountry = this.shipCountry = document.getElementById('ShipCountry') as IgcColumnComponent;
        var orderDate = this.orderDate = document.getElementById('OrderDate') as IgcColumnComponent;
        var postalCode = this.postalCode = document.getElementById('PostalCode') as IgcColumnComponent;
        var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;
        var shipName = this.shipName = document.getElementById('ShipName') as IgcColumnComponent;
        var shipCity = this.shipCity = document.getElementById('ShipCity') as IgcColumnComponent;
        var shipperName = this.shipperName = document.getElementById('ShipperName') as IgcColumnComponent;
        var salesperson = this.salesperson = document.getElementById('Salesperson') as IgcColumnComponent;
        var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        var quantity = this.quantity = document.getElementById('Quantity') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.invoicesData;
            grid.groupingExpressions = this.groupingExpression1;
            discontinued.bodyTemplate = this.webGridBooleanCellTemplate;
            unitPrice.pipeArgs = this.columnPipeArgs1;
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

        public webGridBooleanCellTemplate = (ctx: IgcCellTemplateContext) => {
            if (ctx.cell.value) {
                return html`<img src="https://www.infragistics.com/angular-demos-lob/assets/images/grid/active.png" title="Continued" alt="Continued" />`
            } else {
                return html`<img src="https://www.infragistics.com/angular-demos-lob/assets/images/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
            }
    }

}

new Sample();
