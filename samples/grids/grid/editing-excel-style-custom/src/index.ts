import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcCellType, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindData } from './NwindData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private grid1: IgcGridComponent
    private _bind: () => void;
    private shouldAppendValue = false;

    constructor() {
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
    
        this._bind = () => {
            grid1.data = this.nwindData;

            grid1.addEventListener('activeNodeChange', (event: any) => {
                grid1.endEdit();
            });
            grid1.addEventListener('keydown', (event: KeyboardEvent) => {
                var code = event.code;
                var activeElem = grid1.selectedCells[0];

                if ((event.code >= 'Digit0' && event.code <= 'Digit9') || 
                    (event.code >= 'KeyA' && event.code <= 'KeyZ') ||
                    (event.code >= 'Numpad0' && event.code <= 'Numpad9') && 
                     event.code !== 'Enter' && event.code !== 'NumpadEnter') {
        
                    if (activeElem && activeElem.editMode === false) {
                        activeElem.editMode = true;
                        activeElem.editValue = event.key;
                        this.shouldAppendValue = true;
                        grid1.markForCheck();
                    } else
                    
                    if (activeElem && activeElem.editMode && this.shouldAppendValue) {
                        event.preventDefault();
                        activeElem.editValue = activeElem.editValue + event.key;
                        this.shouldAppendValue = false;
                      }
                }

                if (code === 'Backspace') {
                    if(activeElem == null) {
                        return;
                    }
                    const rowIndex = activeElem.row.index;
                    const columnKey = activeElem.column.field; 
            
                    grid1.data[rowIndex][columnKey] = '';
                    grid1.markForCheck();

                }
    
                if (code === 'Enter' || code === 'NumpadEnter') {
                    
                    if(activeElem == null) {
                        return;
                    }

                    const thisRow = activeElem.row.index;
                    const dataView = this.grid1.dataView;
                    const nextRowIndex = this.getNextEditableRowIndex(thisRow, dataView, event.shiftKey);    

                    grid1.navigateTo(nextRowIndex, activeElem.column.visibleIndex, (obj: any) => {
                        grid1.clearCellSelection();
                        
                        requestAnimationFrame(() => {
                            obj.target.activate();
                        });
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

    public getNextEditableRowIndex(currentRowIndex: number, dataView: any[], previous: boolean): number {
        if (currentRowIndex < 0 || (currentRowIndex === 0 && previous) || (currentRowIndex >= dataView.length - 1 && !previous)) {
            return currentRowIndex;
        }
        if(previous){
            for (let index = dataView.length - 1; index >= 0; index--) {
            if (index < currentRowIndex && this.isEditableDataRecordAtIndex(index, dataView)) {
                return index;
            }
        }
        return -1
        }
        return dataView.findIndex((rec, index) => index > currentRowIndex && this.isEditableDataRecordAtIndex(index, dataView));
      }
  

    private isEditableDataRecordAtIndex(rowIndex: number, dataView: any[]): boolean {
        const rec = dataView[rowIndex];
        return !rec.expression && !rec.summaries && !rec.childGridsData && !rec.detailsData
      }
}

new Sample();
