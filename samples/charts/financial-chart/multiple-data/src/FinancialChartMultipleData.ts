

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);


export class FinancialChartMultipleData {


    
    
        

    private chart: IgcFinancialChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, 'Amazon (AMZN)'),
            StocksUtility.GetStocks(6, 10, 'Tesla (TSLA)'),
            StocksUtility.GetStocks(6, 10, 'Microsoft (MSFT)')
        ];
        return data;
    }
}

let sample = new FinancialChartMultipleData();