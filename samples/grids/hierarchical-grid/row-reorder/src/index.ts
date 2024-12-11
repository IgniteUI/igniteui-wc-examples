import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcRowDragEndEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        this.webHierarchicalGridReorderRowHandler = this.webHierarchicalGridReorderRowHandler.bind(this);

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            hierarchicalGrid.addEventListener("rowDragEnd", this.webHierarchicalGridReorderRowHandler);
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridReorderRowHandler(args: CustomEvent<IgcRowDragEndEventArgs>): void {
        const ghostElement = args.detail.dragDirective.ghostElement;
        const dragElementPos = ghostElement.getBoundingClientRect();
        const grid = this.hierarchicalGrid;
        const rows = Array.prototype.slice.call(document.getElementsByTagName("igx-hierarchical-grid-row"));
        const currRowIndex = this.getCurrentRowIndex(rows,
        { x: dragElementPos.x, y: dragElementPos.y });
        if (currRowIndex === -1) { return; }
        // remove the row that was dragged and place it onto its new location
        grid.deleteRow(args.detail.dragData.key);
        grid.data.splice(currRowIndex, 0, args.detail.dragData.data);
    }

    public getCurrentRowIndex(rowList: any[], cursorPosition: any) {
        for (const row of rowList) {
            const rowRect = row.getBoundingClientRect();
            if (cursorPosition.y > rowRect.top + window.scrollY && cursorPosition.y < rowRect.bottom + window.scrollY &&
                cursorPosition.x > rowRect.left + window.scrollX && cursorPosition.x < rowRect.right + window.scrollX) {
                // return the index of the targeted row
                return parseInt(row.attributes["data-rowindex"].value);
            }
        }
        return -1;
    }

}

new Sample();
