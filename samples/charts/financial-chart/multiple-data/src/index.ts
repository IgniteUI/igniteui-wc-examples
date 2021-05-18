import { FinancialChartYAxisMode, IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksHistory } from './StocksHistory';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartMultipleData {

    private chart: IgcFinancialChartComponent;

    constructor() {
        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.yAxisMode = FinancialChartYAxisMode.PercentChange;
        this.chart.yAxisTitle = "Percent Changed";
        this.getData();
    }

    getData(): void {
        StocksHistory.getMultipleStocks().then((stocks: any[]) => {
            this.chart.dataSource = stocks;
        });
    }
}

new FinancialChartMultipleData();
