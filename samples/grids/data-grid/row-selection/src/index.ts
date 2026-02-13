import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridRowSelection {

    private grid: IgcDataGridComponent;
    public selectAllButton: HTMLButtonElement;
    public deSelectAllButton: HTMLButtonElement;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        this.selectAllButton = document.getElementById('selectAllClick') as HTMLButtonElement;
        if (this.selectAllButton !== null){
            this.selectAllButton.onclick = this.onSelectAllButton;
        }

        this.deSelectAllButton = document.getElementById('deSelectAllClick') as HTMLButtonElement;
        if (this.deSelectAllButton !== null){
            this.deSelectAllButton.onclick = this.onDeselectAllButton;
        }
    }

    public onSelectAllButton = () =>{
        this.grid.selectAllRows();
    }

    public onDeselectAllButton = () =>{
        this.grid.deselectAllRows();
    }

}

export function initialize() {
  return new DataGridRowSelection();
}