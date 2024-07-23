import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcCellType, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
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

            grid1.addEventListener('activeNodeChange', (event: any) => {
                grid1.endEdit();
                (grid1.getElementsByClassName("igx-grid__tbody-content")[0] as any).focus();

            });
            grid1.addEventListener('keydown', (event: KeyboardEvent) => {
                var code = event.code;
                var activeElem = grid1.selectedCells[0];

                if ((event.code >= 'Digit0' && event.code <= 'Digit9') || 
                    (event.code >= 'KeyA' && event.code <= 'KeyZ') && 
                    event.code !== 'Enter') {
        
                    if (activeElem && activeElem.editMode === false) {
                        activeElem.editMode = true;
                        activeElem.editValue = event.key;
                        grid1.markForCheck();
                    }
                        const inputElem = grid1.querySelector('input');
                        if (inputElem) {
                            if (inputElem.type === 'number') {
                                inputElem.type = 'text';
                                inputElem.setSelectionRange(inputElem.value.length, inputElem.value.length);
                                inputElem.type = 'number';
                            } else {
                                inputElem.selectionStart = inputElem.selectionEnd = inputElem.value.length;
                            }
                        }
                }

                if (code === 'Backspace') {
                    if(activeElem == null) {
                        return;
                    }
                    const rowIndex = activeElem.row.index;
                    const columnKey = activeElem.column.field; 
            
                    grid1.data[rowIndex][columnKey] = '';

                }
    
                if (code === 'Enter') {

                    if(activeElem == null) {
                        return;
                    }
                    var nextRowIndex = activeElem.row.index + 1;
                    if(event.shiftKey) {
                        nextRowIndex = activeElem.row.index - 1;
                    }
                    const maxRows = grid1.data.length;
                    if (nextRowIndex >= maxRows) {
                        nextRowIndex--;
                    }
                    if(nextRowIndex < 0) {
                        nextRowIndex = 0;
                    }

                    while (!this.isEditableDataRecordAtIndex(nextRowIndex, grid1.data)) {
                        if (event.shiftKey) {
                            nextRowIndex--;
                        } else {
                            nextRowIndex++;
                        }
                        if (nextRowIndex >= maxRows) {
                            nextRowIndex--;
                            break;
                        }
                        if (nextRowIndex < 0) {
                            nextRowIndex = 0;
                            break;
                        }
                    }
                    grid1.navigateTo(nextRowIndex, activeElem.column.visibleIndex, (obj: any) => {
                        grid1.clearCellSelection(); 
                        obj.target.activate(); 
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

    private isEditableDataRecordAtIndex(rowIndex: number, dataView: any[]): boolean {
        const rec = dataView[rowIndex];
        return !rec.expression && !rec.summaries && !rec.childGridsData && !rec.detailsData
      }

}

new Sample();
