import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(
    IgcFinancialChartModule,
    IgcLegendModule
);

export class FinancialChartOverview {

    private chart: IgcFinancialChartComponent;
    private legend: IgcLegendComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.isWindowSyncedToVisibleRange = true;

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, 'Tesla (TSLA)'),
            StocksUtility.GetStocks(6, 10, 'Amazon (AMZN)'),
        ];
        return data;
    }
}

let sample = new FinancialChartOverview();
