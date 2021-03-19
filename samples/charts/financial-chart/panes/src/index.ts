import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartPanes {

    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = StocksUtility.GetStocks();
    }

}

new FinancialChartPanes();
