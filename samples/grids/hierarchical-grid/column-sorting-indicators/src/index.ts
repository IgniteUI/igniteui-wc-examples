import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcSortingExpression, SortingDirection } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private _sortingExpression1: IgcSortingExpression[] | null = null;
    public get sortingExpression1(): IgcSortingExpression[] {
        if (this._sortingExpression1 == null)
        {
            let sortingExpression1: IgcSortingExpression[] = [];
            var sortingExpression2: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression2.dir = SortingDirection.Asc;
            sortingExpression2.fieldName = "Artist";
            sortingExpression2.ignoreCase = true;

            sortingExpression1.push(sortingExpression2)
            var sortingExpression3: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression3.dir = SortingDirection.Desc;
            sortingExpression3.fieldName = "Debut";
            sortingExpression3.ignoreCase = true;

            sortingExpression1.push(sortingExpression3)
            var sortingExpression4: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression4.dir = SortingDirection.Asc;
            sortingExpression4.fieldName = "GrammyNominations";
            sortingExpression4.ignoreCase = true;

            sortingExpression1.push(sortingExpression4)
            var sortingExpression5: IgcSortingExpression = {} as IgcSortingExpression;
            sortingExpression5.dir = SortingDirection.Asc;
            sortingExpression5.fieldName = "GrammyAwards";
            sortingExpression5.ignoreCase = true;

            sortingExpression1.push(sortingExpression5)
            this._sortingExpression1 = sortingExpression1;
        }
        return this._sortingExpression1;
    }
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            hierarchicalGrid1.sortingExpressions = this.sortingExpression1;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

}

export function initialize() {
  return new Sample();
}