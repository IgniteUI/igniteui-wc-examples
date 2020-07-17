
import { SampleFinancialData } from './SampleFinancialData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule
);


export class DataChartSynchronization {


    
    
        

    private chart1: IgcDataChartComponent;
    private chart2: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart1 = document.getElementById('chart1') as IgcDataChartComponent;
        this.chart1.dataSource = SampleFinancialData.create();

        this.chart2 = document.getElementById('chart2') as IgcDataChartComponent;
        this.chart2.dataSource = SampleFinancialData.create();
    }

}

let sample = new DataChartSynchronization();