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
            sortingExpression2.fieldName = "Artist";
            sortingExpression2.dir = SortingDirection.Asc;
            sortingExpression2.ignoreCase = true;

            sortingExpression1.push(sortingExpression2)
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

new Sample();
