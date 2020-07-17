

// data chart's modules:
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
// series' modules:
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcMoneyFlowIndexIndicatorModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcMoneyFlowIndexIndicatorModule
);


export class DataChartAxisSharing {


    
    
        

    private chart: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        const data = SampleFinancialData.create();
        return data;
    }
}

let sample = new DataChartAxisSharing();