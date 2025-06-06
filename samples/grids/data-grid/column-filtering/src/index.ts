import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from './DataGridSharedData';
import { FilterUIType } from 'igniteui-webcomponents-data-grids';

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule
);

export class DataGridColumnFiltering {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.filterUIType = FilterUIType.FilterRow;
        this.grid.dataSource = DataGridSharedData.getEmployees(4000);
    }
}

new DataGridColumnFiltering();
