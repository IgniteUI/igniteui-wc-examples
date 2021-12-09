import { DataGridSharedData } from './DataGridSharedData';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcColumnGroupingModule } from 'igniteui-webcomponents-grids'

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);
ModuleManager.register(IgcColumnGroupingModule);

export class DataGridRowGrouping {

    private grid: IgcDataGridComponent;

    constructor() {

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(50);
    }
}

new DataGridRowGrouping();
