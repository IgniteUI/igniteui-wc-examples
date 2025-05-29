import { DataGridSharedData } from './DataGridSharedData';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcColumnGroupingModule } from 'igniteui-webcomponents-data-grids'

ModuleManager.register(
    IgcDataGridModule,
    IgcGridColumnOptionsModule,
    IgcColumnGroupingModule
);

export class DataGridRowGrouping {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(50);
    }
}

new DataGridRowGrouping();
