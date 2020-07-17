

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';

import { DataGridSharedData } from './DataGridSharedData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);


export class DataGridCellActivation {


    
    
        

    private grid: IgcDataGridComponent;

    constructor() {
        
    
        

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();
    }
}


let sample = new DataGridCellActivation();