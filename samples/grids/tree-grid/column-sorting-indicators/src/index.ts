import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcSortingExpression, SortingDirection, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { OrdersTreeDataItem, OrdersTreeData } from './OrdersTreeData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcTreeGridComponent
    private _sortingExpression1: IgcSortingExpression[] | null = null;
    public get sortingExpression1(): IgcSortingExpression[] {
        if (this._sortingExpression1 == null)
        {
            let sortingExpression1: IgcSortingExpression[] = [];
            var sortingExpression2: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression2.dir = SortingDirection.Asc;
            sortingExpression2.fieldName = "ID";
            sortingExpression2.ignoreCase = true;

            sortingExpression1.push(sortingExpression2)
            var sortingExpression3: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression3.dir = SortingDirection.Desc;
            sortingExpression3.fieldName = "Name";
            sortingExpression3.ignoreCase = true;

            sortingExpression1.push(sortingExpression3)
            var sortingExpression4: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression4.dir = SortingDirection.Asc;
            sortingExpression4.fieldName = "Category";
            sortingExpression4.ignoreCase = true;

            sortingExpression1.push(sortingExpression4)
            var sortingExpression5: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression5.dir = SortingDirection.Asc;
            sortingExpression5.fieldName = "OrderDate";
            sortingExpression5.ignoreCase = true;

            sortingExpression1.push(sortingExpression5)
            var sortingExpression6: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression6.dir = SortingDirection.Asc;
            sortingExpression6.fieldName = "Price";
            sortingExpression6.ignoreCase = true;

            sortingExpression1.push(sortingExpression6)
            var sortingExpression7: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression7.dir = SortingDirection.Asc;
            sortingExpression7.fieldName = "Units";
            sortingExpression7.ignoreCase = true;

            sortingExpression1.push(sortingExpression7)
            var sortingExpression8: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression8.dir = SortingDirection.Asc;
            sortingExpression8.fieldName = "Delivered";
            sortingExpression8.ignoreCase = true;

            sortingExpression1.push(sortingExpression8)
            this._sortingExpression1 = sortingExpression1;
        }
        return this._sortingExpression1;
    }
    private column1: IgcColumnComponent
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
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.ordersTreeData;
            grid.sortingExpressions = this.sortingExpression1;
            column1.pipeArgs = this.columnPipeArgs1;
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

}

new Sample();
