

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { LiveFinancialData} from './LiveFinancialData';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);


export class DataGridBindingDataService {


    
    
        

    private grid: IgcDataGridComponent;

    constructor() {
        
    
        

        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = LiveFinancialData.generateData(200);
    }
}


let sample = new DataGridBindingDataService();