import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid1: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
    
        this._bind = () => {
            grid1.data = this.nwindData;
            grid1.addEventListener('keydown', (event: KeyboardEvent) => {
                var key = event.key; // Correct variable name used
                const activeElem = grid1.selectedCells[0];

                if ((key >= '0' && key <= '9') || (key.toLowerCase() >= 'a' && key.toLowerCase() <= 'z')) {
        
                    if (activeElem && activeElem.editMode === false) {
                        activeElem.setEditMode(true);
                        activeElem.value = key;
                    }
                }
    
                if (key === 'Enter') {

                    var nextRow = this.getNextEditableRowIndex(activeElem.row.index, activeElem.row.cells, event.shiftKey);

                    grid1.navigateTo(nextRow, activeElem.column.index, (obj: any) => {    
                        obj.target.activate();
                        grid1.clearCellSelection();
                    });

            }
        });
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

    public getNextEditableRowIndex(currentRowIndex: number, dataView: any, previous: boolean) {
        if (currentRowIndex < 0 || (currentRowIndex === 0 && previous) || (currentRowIndex >= dataView.length - 1 && !previous)) {
            return currentRowIndex;
        }
        if (previous) {
            return dataView.findLastIndex((rec: any, index: number) => index < currentRowIndex && this.isEditableDataRecordAtIndex(index, dataView));
        }
        return dataView.findIndex((rec: any, index: number) => index > currentRowIndex && this.isEditableDataRecordAtIndex(index, dataView));
    }

    public isEditableDataRecordAtIndex(dataViewIndex: number, dataView: any) {
        const rec = dataView[dataViewIndex];
        return !rec.expression && !rec.summaries && !rec.childGridsData && !rec.detailsData;
    }

}

new Sample();
