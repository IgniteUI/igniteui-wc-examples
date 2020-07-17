

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from './DataGridSharedData';
import { ColumnResizingMode } from 'igniteui-webcomponents-grids';
import { ColumnResizingAnimationMode } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);


export class DataGridColumnResizing {


    
    
        

    private grid: IgcDataGridComponent;

    constructor() {
        
        this.onColumnResizingAnimationModeValueChanged = this.onColumnResizingAnimationModeValueChanged.bind(this);
        this.onColumnResizingModeValueChanged = this.onColumnResizingModeValueChanged.bind(this);
        this.onSeparatorWidthRangeValueChanged = this.onSeparatorWidthRangeValueChanged.bind(this);
    
        

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        document.getElementById('columnResizingAnimationModeDropDown').addEventListener('change', this.onColumnResizingAnimationModeValueChanged);
        document.getElementById('separatorWidthRange').addEventListener('change', this.onSeparatorWidthRangeValueChanged);
        document.getElementById('columnResizingModeDropDown').addEventListener('change', this.onColumnResizingModeValueChanged);
    }

    onColumnResizingAnimationModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case 'Auto': {
                this.grid.columnResizingAnimationMode = ColumnResizingAnimationMode.Auto;
                break;
            }
            case 'Interpolate': {
                this.grid.columnResizingAnimationMode = ColumnResizingAnimationMode.Interpolate;
                break;
            }
            case 'None': {
                this.grid.columnResizingAnimationMode = ColumnResizingAnimationMode.None;
                break;
            }
        }
    }

    onSeparatorWidthRangeValueChanged(e: any) {
        this.grid.columnResizingSeparatorWidth = e.target.value;
    }

    onColumnResizingModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case 'Deferred': {
                this.grid.columnResizingMode = ColumnResizingMode.Deferred;
                break;
            }
            case 'Immediate': {
                this.grid.columnResizingMode = ColumnResizingMode.Immediate;
                break;
            }
            case 'None': {
                this.grid.columnResizingMode = ColumnResizingMode.None;
                break;
            }
        }
    }
}


let sample = new DataGridColumnResizing();