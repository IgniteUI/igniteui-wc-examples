import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { GridSelectionMode } from 'igniteui-webcomponents-grids';
import { GridActivationMode } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedItemsChangedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedKeysChangedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedCellsChangedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedCellRangesChangedEventArgs } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridCellSelection {

    private grid: IgcDataGridComponent;

    constructor() {

        this.onSelectedItemsChanged = this.onSelectedItemsChanged.bind(this);
        this.onSelectedCellsChanged = this.onSelectedCellsChanged.bind(this);
        this.onSelectedKeysChanged = this.onSelectedKeysChanged.bind(this);
        this.onSelectedCellRangesChanged = this.onSelectedCellRangesChanged.bind(this);

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        // this.grid.activationMode = GridActivationMode.Cell;
        this.grid.selectionMode = GridSelectionMode.SingleRow;
        this.grid.selectedItemsChanged = this.onSelectedItemsChanged;
        this.grid.selectedCellsChanged = this.onSelectedCellsChanged;
        this.grid.selectedKeysChanged = this.onSelectedKeysChanged;
        this.grid.selectedCellRangesChanged = this.onSelectedCellRangesChanged;

        let dropDown = document.getElementById('selectionDropBox');
        dropDown!.addEventListener('change', this.dropDownValueChanged);
    }

    public onSelectedItemsChanged(s: IgcDataGridComponent, e: IgcGridSelectedItemsChangedEventArgs) {
        let item = this.grid.selectedItems.toArray()[0];
        console.log('onSelectedItemsChanged ' + this.grid.selectedItems.count);
        console.log('onSelectedItemsChanged ' + item);
    }

    public onSelectedKeysChanged(s: IgcDataGridComponent, e: IgcGridSelectedKeysChangedEventArgs) {
        console.log('onSelectedKeysChanged ' + this.grid.selectedKeys.count);
    }

    public onSelectedCellsChanged(s: IgcDataGridComponent, e: IgcGridSelectedCellsChangedEventArgs) {
        console.log('onSelectedCellsChanged ' + this.grid.selectedCells.count);
    }

    public onSelectedCellRangesChanged(s: IgcDataGridComponent, e: IgcGridSelectedCellRangesChangedEventArgs) {
        console.log('onSelectedCellRangesChanged ' + this.grid.selectedCells.count);
    }

    dropDownValueChanged() {

        let dropDown = document.getElementById('selectionDropBox') as any;
        let grid = document.getElementById('grid') as IgcDataGridComponent;

        switch (dropDown.value) {
            case 'None': {
                grid.selectionMode = GridSelectionMode.None;
                break;
            }
            case 'SingleCell': {
                grid.selectionMode = GridSelectionMode.SingleCell;
                break;
            }
            case 'SingleRow': {
                grid.selectionMode = GridSelectionMode.SingleRow;
                break;
            }
            case 'MultipleCell': {
                grid.selectionMode = GridSelectionMode.MultipleCell;
                break;
            }
            case 'MultipleRow': {
                grid.selectionMode = GridSelectionMode.MultipleRow;
                break;
            }
            case 'RangeCell': {
                grid.selectionMode = GridSelectionMode.RangeCell;
                break;
            }
        }
    }
}

let sample = new DataGridCellSelection();
