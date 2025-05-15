import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridHorizontalScrolling {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();
    }
}

new DataGridHorizontalScrolling();
