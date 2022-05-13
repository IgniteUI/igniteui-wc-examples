import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartXAxisMode } from 'igniteui-webcomponents-charts';
import { FinancialChartYAxisMode } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StockIndexData } from './StockIndexData';
import { IgRect } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartIndexChart {
// FinancialChartAxisTypes
    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = StockIndexData.getData();
        this.chart.yAxisMode = FinancialChartYAxisMode.Numeric;

        this.chart.windowRect = { left: 1, top: 1, width: 0.90, height: 0.90};
      
    }
}

new FinancialChartIndexChart();
