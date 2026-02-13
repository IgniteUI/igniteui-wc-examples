import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersData } from './CustomersData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private leftGrid: IgcGridComponent;
    private rightGrid: IgcGridComponent;

    private leftGridData: CustomersData;

    private _bind: () => void;

    constructor() {
        var leftGrid = this.leftGrid = document.getElementById('leftGrid') as IgcGridComponent;
        var rightGrid = this.rightGrid = document.getElementById('rightGrid') as IgcGridComponent;

        this.onGridRowDragEnd = this.onGridRowDragEnd.bind(this);

        this.leftGridData = new CustomersData();

        this._bind = () => {
            leftGrid.data = this.leftGridData;
            rightGrid.data = [];
            leftGrid.addEventListener("rowDragEnd", this.onGridRowDragEnd);
        }
        this._bind();
    }

    public onGridRowDragEnd(args: any): void {
        const ghostElement = args.detail.dragDirective.ghostElement;

        if (ghostElement != null) {

            const dragElementPos = ghostElement.getBoundingClientRect();

            const gridPosition = this.rightGrid.getBoundingClientRect();
            const withinXBounds = dragElementPos.x >= gridPosition.x && dragElementPos.x <= gridPosition.x + gridPosition.width;
            const withinYBounds = dragElementPos.y >= gridPosition.y && dragElementPos.y <= gridPosition.y + gridPosition.height;
            if (withinXBounds && withinYBounds) {
                this.leftGrid.deleteRow(args.detail.dragData.index);
                this.rightGrid.addRow(args.detail.dragData.data);
            }
        }
    }
}

export function initialize() {
  return new Sample();
}