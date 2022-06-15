import { DataGridSharedData } from './DataGridSharedData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';

ModuleManager.register(
    IgcDataGridModule,
);

export class DataGridRowPaging {

    private grid: IgcDataGridComponent;
    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(100);
    }
}

new DataGridRowPaging();
