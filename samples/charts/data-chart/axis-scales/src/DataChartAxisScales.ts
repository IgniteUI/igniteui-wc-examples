

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataChartCoreModule);


export class DataChartAxisScales {


    
    
        

    private chart: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        // this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        return [{
            label: 'Item1',
            close: 1,
            x: 0,
            y: 0
        },{
            label: 'Item2',
            close: 2,
            x: 10,
            y: 10
        },{
            label: 'Item3',
            close: 3,
            x: 20,
            y: 20
        },{
            label: 'Item4',
            close: 4,
            x: 40,
            y: 40
        },{
            label: 'Item5',
            close: 5,
            x: 20,
            y: 20
        }]
    }
}

let sample = new DataChartAxisScales();