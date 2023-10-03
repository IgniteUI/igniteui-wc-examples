import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid1: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        this.webGridEditingExcelStyle = this.webGridEditingExcelStyle.bind(this);

        this._bind = () => {
            grid1.data = this.nwindData;
            grid1.addEventListener("gridKeydown", this.webGridEditingExcelStyle);
        }
        this._bind();

    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridEditingExcelStyle(args: any): void {
        var key = args.detail.event.keyCode;
        var grid = args.detail.target.grid;
        var activeElem = grid.navigation.activeNode;

        if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
            var columnName = grid.getColumnByVisibleIndex(activeElem.column).field;
            var cell = grid.getCellByColumn(activeElem.row, columnName);

            if (cell && !grid.crudService.cellInEditMode) {
                grid.crudService.enterEditMode(cell);
                cell.editValue = key;
            }
        }

        if (key == 13) {
            var thisRow = activeElem.row;
            var column = activeElem.column;
            var rowInfo = grid.dataView;

            var nextRow = this.getNextEditableRowIndex(thisRow, rowInfo, args.detail.event.shiftKey);

            grid.navigateTo(nextRow, column, (obj) => {
                obj.target.activate();
                grid.clearCellSelection();
            });
        }
    }

    public getNextEditableRowIndex(currentRowIndex, dataView, previous) {
        if (currentRowIndex < 0 || (currentRowIndex === 0 && previous) || (currentRowIndex >= dataView.length - 1 && !previous)) {
            return currentRowIndex;
        }
        if (previous) {
            return dataView.findLastIndex((rec, index) => index < currentRowIndex && this.isEditableDataRecordAtIndex(index, dataView));
        }
        return dataView.findIndex((rec, index) => index > currentRowIndex && this.isEditableDataRecordAtIndex(index, dataView));
    }

    public isEditableDataRecordAtIndex(dataViewIndex, dataView) {
        const rec = dataView[dataViewIndex];
        return !rec.expression && !rec.summaries && !rec.childGridsData && !rec.detailsData;
    }

}

new Sample();
