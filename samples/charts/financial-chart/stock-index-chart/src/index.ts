import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartXAxisMode } from 'igniteui-webcomponents-charts';
import { FinancialChartYAxisMode } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StockIndexData } from './StockIndexData';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartIndexChart {
// FinancialChartAxisTypes
    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = StockIndexData.getData();
        this.chart.yAxisMode = FinancialChartYAxisMode.Numeric;
    }
}

new FinancialChartIndexChart();
