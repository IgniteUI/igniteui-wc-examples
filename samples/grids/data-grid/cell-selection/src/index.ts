import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { DataGridSelectionMode } from 'igniteui-webcomponents-data-grids';
import { GridActivationMode } from 'igniteui-webcomponents-data-grids';
import { IgcGridSelectedItemsChangedEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcGridSelectedKeysChangedEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcGridSelectedCellsChangedEventArgs } from 'igniteui-webcomponents-data-grids';
import { IgcGridSelectedCellRangesChangedEventArgs } from 'igniteui-webcomponents-data-grids';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

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
        this.grid.selectionMode = DataGridSelectionMode.SingleRow;
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
                grid.selectionMode = DataGridSelectionMode.None;
                break;
            }
            case 'SingleCell': {
                grid.selectionMode = DataGridSelectionMode.SingleCell;
                break;
            }
            case 'SingleRow': {
                grid.selectionMode = DataGridSelectionMode.SingleRow;
                break;
            }
            case 'MultipleCell': {
                grid.selectionMode = DataGridSelectionMode.MultipleCell;
                break;
            }
            case 'MultipleRow': {
                grid.selectionMode = DataGridSelectionMode.MultipleRow;
                break;
            }
            case 'RangeCell': {
                grid.selectionMode = DataGridSelectionMode.RangeCell;
                break;
            }
        }
    }
}

export function initialize() {
  return new DataGridCellSelection();
}