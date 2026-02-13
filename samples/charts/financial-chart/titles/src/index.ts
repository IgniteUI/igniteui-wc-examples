import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksHistory } from './StocksHistory';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartTitles {

    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;

        StocksHistory.getAmazonStock().then((stocks: any[]) => {
            this.chart.dataSource = stocks;
        });
    }
}

export function initialize() {
  return new FinancialChartTitles();
}