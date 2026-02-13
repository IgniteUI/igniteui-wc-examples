import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { InvoicesData } from './InvoicesData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private leftGrid: IgcGridComponent;
    private rightGrid: IgcGridComponent;

    private leftGridData: InvoicesData;

    private _bind: () => void;

    constructor() {
        var leftGrid = this.leftGrid = document.getElementById('leftGrid') as IgcGridComponent;
        var rightGrid = this.rightGrid = document.getElementById('rightGrid') as IgcGridComponent;

        this.onGridRangeSelected = this.onGridRangeSelected.bind(this);

        this.leftGridData = new InvoicesData();

        this._bind = () => {
            leftGrid.data = this.leftGridData;
            leftGrid.addEventListener("rangeSelected", this.onGridRangeSelected);
        }
        this._bind();
    }

    public onGridRangeSelected(): void {
        this.rightGrid.data = this.leftGrid.getSelectedData();
    }
}

export function initialize() {
  return new Sample();
}