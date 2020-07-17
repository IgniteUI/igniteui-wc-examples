

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksHistory } from './StocksHistory';

ModuleManager.register(IgcFinancialChartModule);


export class FinancialChartTitles {


    
    
        

    private chart: IgcFinancialChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        const data = [
            StocksHistory.getAmazon(),
            StocksHistory.getTesla()
        ];
        return data;
    }
}

let sample = new FinancialChartTitles();