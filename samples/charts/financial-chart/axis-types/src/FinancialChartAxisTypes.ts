

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartXAxisMode } from 'igniteui-webcomponents-charts';
import { FinancialChartYAxisMode } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);


export class FinancialChartAxisTypes {


    
    
        

    private chart: IgcFinancialChartComponent;
    private xAxisMode = FinancialChartXAxisMode.Time;
    private yAxisMode = FinancialChartYAxisMode.PercentChange;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.xAxisMode = this.xAxisMode;
        this.chart.yAxisMode = this.yAxisMode;
        this.chart.isWindowSyncedToVisibleRange = true;

        let xAxisSelect = document.getElementById('xAxisSelect');
        xAxisSelect.addEventListener('change', this.onXAxisModeChanged);

        let yAxisSelect = document.getElementById('yAxisSelect');
        yAxisSelect.addEventListener('change', this.onYAxisModeChanged);
    }

    public onXAxisModeChanged = (e: any) => {
        const mode = e.target.value;
        if (mode === 'Time') {
            this.xAxisMode = FinancialChartXAxisMode.Time;
        }
        else if (mode === 'Ordinal') {
            this.xAxisMode = FinancialChartXAxisMode.Ordinal;
        }
        this.chart.xAxisMode = this.xAxisMode;
    }

    public onYAxisModeChanged = (e: any) => {
        const mode = e.target.value;
        if (mode === 'PercentChange') {
            this.yAxisMode = FinancialChartYAxisMode.PercentChange;
        }
        else if (mode === 'Numeric') {
            this.yAxisMode = FinancialChartYAxisMode.Numeric;
        }
        this.chart.yAxisMode = this.yAxisMode;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, 'Amazon (AMZN)'),
            StocksUtility.GetStocks(6, 10, 'Tesla (TSLA)'),
        ];
        return data;
    }
}

let sample = new FinancialChartAxisTypes();