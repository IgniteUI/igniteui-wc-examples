import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import { SingersDataItem, SingersDataItem_ToursItem, SingersDataItem_AlbumsItem, SingersDataItem_AlbumsItem_SongsItem, SingersData } from './SingersData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    public hierarchicalGrid2: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var hierarchicalGrid2 = this.hierarchicalGrid2 = document.getElementById('hierarchicalGrid2') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            this.hierarchicalGrid2.data = [];
            this.hierarchicalGrid2.emptyGridMessage = "Drag and Drop a row from the left grid to this grid";
            hierarchicalGrid1.addEventListener("rowDragEnd", this.onGridRowDragEnd.bind(this));
        }
        this._bind();
    }

    public onGridRowDragEnd(args: any): void {
        const ghostElement = args.detail.dragDirective.ghostElement;

        if (ghostElement != null) {

            const dragElementPos = ghostElement.getBoundingClientRect();

            const gridPosition = this.hierarchicalGrid2.getBoundingClientRect();
            const withinXBounds = dragElementPos.x >= gridPosition.x && dragElementPos.x <= gridPosition.x + gridPosition.width;
            const withinYBounds = dragElementPos.y >= gridPosition.y && dragElementPos.y <= gridPosition.y + gridPosition.height;
            if (withinXBounds && withinYBounds) {
                this.hierarchicalGrid2.addRow(args.detail.dragData.data);
            }
        }
    }

    private _singersData: SingersData = null;
    public get singersData(): SingersData {
        if (this._singersData == null)
        {
            this._singersData = new SingersData();
        }
        return this._singersData;
    }
}
export function initialize() {
  return new Sample();
}