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
                grid1.markForCheck();

            });
            grid1.addEventListener('keydown', (event: KeyboardEvent) => {
                var key = event.key; 
                var activeElem = grid1.selectedCells[0];

                if(key === 'Escape') {
                    activeElem.editMode = false;
                    return;
                }

                if ((key >= '0' && key <= '9') || (key.toLowerCase() >= 'a' && key.toLowerCase() <= 'z') && key != 'Enter') {
        
                    if (activeElem && activeElem.editMode === false) {
                        activeElem.value = key;
                        
                        activeElem.editMode = true;
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
    
                if (key === 'Enter') {

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

}

new Sample();
