

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcValueOverlayModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcValueOverlayModule
);


export class DataChartValueOverlay {


    
    
        

    private chart: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        const data = [
            { 'Label': 1, 'Value': 1.0 },
            { 'Label': 2, 'Value': 2.0 },
            { 'Label': 3, 'Value': 6.0 },
            { 'Label': 4, 'Value': 8.0 },
            { 'Label': 5, 'Value': 2.0 },
            { 'Label': 6, 'Value': 6.0 },
            { 'Label': 7, 'Value': 4.0 },
            { 'Label': 8, 'Value': 2.0 },
            { 'Label': 9, 'Value': 1.0 },
        ];

        return data;
    }
}

let sample = new DataChartValueOverlay();