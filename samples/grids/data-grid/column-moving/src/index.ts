import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { ColumnMovingAnimationMode } from 'igniteui-webcomponents-grids';
import { ColumnMovingMode } from 'igniteui-webcomponents-grids';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridColumnMoving {

    private grid: IgcDataGridComponent;

    constructor() {

        this.onColumnMovingAnimationModeValueChanged = this.onColumnMovingAnimationModeValueChanged.bind(this);
        this.onColumnMovingModeValueChanged = this.onColumnMovingModeValueChanged.bind(this);
        this.onSeparatorWidthRangeValueChanged = this.onSeparatorWidthRangeValueChanged.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        document.getElementById('columnMovingAnimationModeDropDown')!.addEventListener('change', this.onColumnMovingAnimationModeValueChanged);
        document.getElementById('separatorWidthRange')!.addEventListener('change', this.onSeparatorWidthRangeValueChanged);
        document.getElementById('columnMovingModeDropDown')!.addEventListener('change', this.onColumnMovingModeValueChanged);
    }

    onColumnMovingAnimationModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case 'Auto': {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.Auto;
                break;
            }
            case 'SlideOver': {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.SlideOver;
                break;
            }
            case 'None': {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.None;
                break;
            }
        }
    }

    onSeparatorWidthRangeValueChanged(e: any) {
        this.grid.columnMovingSeparatorWidth = e.target.value;
    }

    onColumnMovingModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case 'Deferred': {
                this.grid.columnMovingMode = ColumnMovingMode.Deferred;
                break;
            }
            case 'None': {
                this.grid.columnMovingMode = ColumnMovingMode.None;
                break;
            }
        }
    }
}

new DataGridColumnMoving();
