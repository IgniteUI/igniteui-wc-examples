import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridRowPinning {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        const data = DataGridSharedData.getEmployees();
        this.grid.dataSource = data;

        this.grid.pinnedItems.add(data[2]);
        this.grid.pinnedItems.add(data[4]);
    }
}

new DataGridRowPinning();
