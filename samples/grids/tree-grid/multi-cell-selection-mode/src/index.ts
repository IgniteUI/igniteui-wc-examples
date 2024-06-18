import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatData } from './EmployeesFlatData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {
    private leftTreeGrid: IgcTreeGridComponent;
    private rightTreeGrid: IgcGridComponent;

    private leftTreeGridData: EmployeesFlatData;

    private _bind: () => void;

    constructor() {
        var leftTreeGrid = this.leftTreeGrid = document.getElementById("leftTreeGrid") as IgcTreeGridComponent;
        var rightTreeGrid = this.rightTreeGrid = document.getElementById("rightTreeGrid") as IgcGridComponent;

        this.onTreeGridRangeSelected = this.onTreeGridRangeSelected.bind(this);

        this.leftTreeGridData = new EmployeesFlatData();

        this._bind = () => {
            leftTreeGrid.data = this.leftTreeGridData;
            leftTreeGrid.addEventListener("rangeSelected", this.onTreeGridRangeSelected);
        };
        this._bind();
    }

    public onTreeGridRangeSelected(): void {
        this.rightTreeGrid.data = this.leftTreeGrid.getSelectedData();
    }
}

new Sample();
