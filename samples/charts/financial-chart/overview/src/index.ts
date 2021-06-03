import { FinancialChartYAxisMode, IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksHistory } from './StocksHistory';

ModuleManager.register(
    IgcFinancialChartModule,
    IgcLegendModule
);

export class FinancialChartOverview {

    private chart: IgcFinancialChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.excludedProperties = ["Date"];
        this.chart.yAxisMode = FinancialChartYAxisMode.PercentChange;

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;

        this.getData();
    }

    getData(): void {
        StocksHistory.getMultipleStocks().then((stocks: any[]) => {
            this.chart.dataSource = stocks;
        });
    }
}

new FinancialChartOverview();
