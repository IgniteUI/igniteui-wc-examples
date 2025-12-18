import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedTreeDataItem, EmployeesNestedTreeData } from './EmployeesNestedTreeData';
import { IgcRowDragStartEventArgs, IgcRowDragEndEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webTreeGridReorderRowStartHandler = this.webTreeGridReorderRowStartHandler.bind(this);
        this.webTreeGridReorderRowHandler = this.webTreeGridReorderRowHandler.bind(this);

        this._bind = () => {
            treeGrid.data = this.employeesNestedTreeData;
            treeGrid.addEventListener("rowDragStart", this.webTreeGridReorderRowStartHandler);
            treeGrid.addEventListener("rowDragEnd", this.webTreeGridReorderRowHandler);
        }
        this._bind();

    }

    private _employeesNestedTreeData: EmployeesNestedTreeData = null;
    public get employeesNestedTreeData(): EmployeesNestedTreeData {
        if (this._employeesNestedTreeData == null)
        {
            this._employeesNestedTreeData = new EmployeesNestedTreeData();
        }
        return this._employeesNestedTreeData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridReorderRowStartHandler(args: CustomEvent<IgcRowDragStartEventArgs>){
        const draggedRow = args.detail.dragData;
        if(draggedRow.expanded){
            draggedRow.expanded = false;
        }
    }

    public webTreeGridReorderRowHandler(args: CustomEvent<IgcRowDragEndEventArgs>): void {
        const ghostElement = args.detail.dragDirective.ghostElement;
        if (!ghostElement) {
            return;
        }
        const dragElementPos = ghostElement.getBoundingClientRect();
        const grid = this.treeGrid;
        const rows = Array.prototype.slice.call(document.getElementsByTagName("igx-tree-grid-row"));
        const currRowIndex = this.getCurrentRowIndex(rows,
        { x: dragElementPos.x, y: dragElementPos.y });
        if (currRowIndex === -1) { return; }
        const draggedRow = args.detail.dragData.data;
        const childRows = this.findChildRows(grid.data, draggedRow);
        //remove the row that was dragged and place it onto its new location
        grid.deleteRow(args.detail.dragData.key);
        grid.data.splice(currRowIndex, 0, args.detail.dragData.data);
        // reinsert the child rows
        childRows.reverse().forEach(childRow => {
            grid.data.splice(currRowIndex + 1, 0, childRow);
        });
    }

    private findChildRows(rows: any[], parent: any): any[] {
        const childRows: any[] = [];
        rows.forEach(row => {
            if (row.ParentID === parent.ID) {
                childRows.push(row);
                // Recursively find children of current row
                const grandchildren = this.findChildRows(rows, row);
                childRows.push(...grandchildren);
            }
        });
        return childRows;
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
