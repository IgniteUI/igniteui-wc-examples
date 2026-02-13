import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatData } from './EmployeesFlatData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {
    private leftTreeGrid: IgcTreeGridComponent;
    private rightGrid: IgcGridComponent;

    private leftTreeGridData: EmployeesFlatData;

    private _bind: () => void;

    constructor() {
        var leftTreeGrid = this.leftTreeGrid = document.getElementById("leftTreeGrid") as IgcTreeGridComponent;
        var rightGrid = this.rightGrid = document.getElementById("rightGrid") as IgcGridComponent;

        this.onTreeGridRangeSelected = this.onTreeGridRangeSelected.bind(this);

        this.leftTreeGridData = new EmployeesFlatData();

        this._bind = () => {
            leftTreeGrid.data = this.leftTreeGridData;
            leftTreeGrid.addEventListener("rangeSelected", this.onTreeGridRangeSelected);
        };
        this._bind();
    }

    public onTreeGridRangeSelected(): void {
        this.rightGrid.data = this.leftTreeGrid.getSelectedData();
    }
}

export function initialize() {
  return new Sample();
}