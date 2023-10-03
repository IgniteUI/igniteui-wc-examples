import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcSortingExpression, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import { FinancialDataAllItem, FinancialDataAll } from './FinancialDataAll';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _sortingExpression1: IgcSortingExpression[] | null = null;
    public get sortingExpression1(): IgcSortingExpression[] {
        if (this._sortingExpression1 == null)
        {
            let sortingExpression1: IgcSortingExpression[] = [];
            var sortingExpression2 = new IgcSortingExpression();
            sortingExpression2.dir = SortingDirection.Asc;
            sortingExpression2.fieldName = "Settlement";
            sortingExpression2.ignoreCase = true;

            sortingExpression1.push(sortingExpression2)
            var sortingExpression3 = new IgcSortingExpression();
            sortingExpression3.dir = SortingDirection.Desc;
            sortingExpression3.fieldName = "Type";
            sortingExpression3.ignoreCase = true;

            sortingExpression1.push(sortingExpression3)
            var sortingExpression4 = new IgcSortingExpression();
            sortingExpression4.dir = SortingDirection.Asc;
            sortingExpression4.fieldName = "Region";
            sortingExpression4.ignoreCase = true;

            sortingExpression1.push(sortingExpression4)
            var sortingExpression5 = new IgcSortingExpression();
            sortingExpression5.dir = SortingDirection.Asc;
            sortingExpression5.fieldName = "Country";
            sortingExpression5.ignoreCase = true;

            sortingExpression1.push(sortingExpression5)
            var sortingExpression6 = new IgcSortingExpression();
            sortingExpression6.dir = SortingDirection.Asc;
            sortingExpression6.fieldName = "Price";
            sortingExpression6.ignoreCase = true;

            sortingExpression1.push(sortingExpression6)
            var sortingExpression7 = new IgcSortingExpression();
            sortingExpression7.dir = SortingDirection.Asc;
            sortingExpression7.fieldName = "Buy";
            sortingExpression7.ignoreCase = true;

            sortingExpression1.push(sortingExpression7)
            this._sortingExpression1 = sortingExpression1;
        }
        return this._sortingExpression1;
    }
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.financialDataAll;
            grid.sortingExpressions = this.sortingExpression1;
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

}

new Sample();
