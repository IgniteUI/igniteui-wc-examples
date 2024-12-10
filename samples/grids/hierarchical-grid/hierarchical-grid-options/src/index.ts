import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcPaginatorComponent, IgcPaginatorResourceStrings } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private grid: IgcHierarchicalGridComponent
    private paginator: IgcPaginatorComponent
    private _paginatorResourceStrings1: IgcPaginatorResourceStrings | null = null;
    public get paginatorResourceStrings1(): IgcPaginatorResourceStrings {
        if (this._paginatorResourceStrings1 == null)
        {
            var paginatorResourceStrings1: IgcPaginatorResourceStrings = {} as IgcPaginatorResourceStrings;
            paginatorResourceStrings1.igx_paginator_label = "Records per page";

            this._paginatorResourceStrings1 = paginatorResourceStrings1;
        }
        return this._paginatorResourceStrings1;
    }

    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;

        this._bind = () => {
            grid.data = this.singersData;
            paginator.resourceStrings = this.paginatorResourceStrings1;
        }
        this._bind();
    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

}

new Sample();
