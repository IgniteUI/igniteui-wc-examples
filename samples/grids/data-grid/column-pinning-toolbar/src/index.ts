import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridToolbarModule } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridToolbarComponent } from 'igniteui-webcomponents-data-grids';
import { DataGridSharedData } from './DataGridSharedData';

ModuleManager.register(
    IgcDataGridModule,
    IgcDataGridToolbarModule,
    IgcGridColumnOptionsModule
);

export class DataGridColumnPinningToolbar {

    public data: any[] = [];

    public grid: IgcDataGridComponent;
    public toolbar: IgcDataGridToolbarComponent;

    constructor() {

        this.onGridRef = this.onGridRef.bind(this);
        this.data = DataGridSharedData.getEmployees();

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        this.toolbar = document.getElementById('toolbar') as IgcDataGridToolbarComponent;
        this.toolbar.targetGrid = this.grid;
    }

    public onGridRef(grid: IgcDataGridComponent) {
        this.grid = grid;
    }
}

new DataGridColumnPinningToolbar();
