import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartHighVolume {

    private chart: IgcFinancialChartComponent;

    constructor() {

        const dateEnd = new Date(2020, 11, 1);
        const dateStart = new Date(1900, 1, 1);
        const yearStart = dateStart.getFullYear();
        const yearEnd = dateEnd.getFullYear();
        const data = StocksUtility.GetStocksBetween(dateStart, dateEnd, true, 60);

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = data;
        this.chart.chartTitle = 'Stock Prices ' + yearStart + '-' + yearEnd;
        this.chart.subtitle = StocksUtility.toShortString(data.length) + ' data points';
    }

}

let sample = new FinancialChartHighVolume();
