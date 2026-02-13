import { IgcFinancialChartModule, IgcFinancialChartComponent, FinancialChartYAxisMode } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksHistory } from './StocksHistory';

ModuleManager.register(IgcFinancialChartModule);

export class Styling {

    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.yAxisMode = FinancialChartYAxisMode.PercentChange;

        StocksHistory.getMultipleStocks().then((stocks: any[]) => {
            this.chart.dataSource = stocks;
        });
    }
}

export function initialize() {
  return new Styling();
}