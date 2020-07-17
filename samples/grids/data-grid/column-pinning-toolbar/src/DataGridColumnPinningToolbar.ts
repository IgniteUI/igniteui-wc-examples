
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarComponent } from 'igniteui-webcomponents-grids';
import { DataGridSharedData } from './DataGridSharedData';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcDataGridToolbarModule);
ModuleManager.register(IgcGridColumnOptionsModule);

export class DataGridColumnPinningToolbar {


    public data: any[];
    
    
        
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

let sample = new DataGridColumnPinningToolbar();