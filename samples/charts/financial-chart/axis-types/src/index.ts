import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { FinancialChartXAxisMode } from 'igniteui-webcomponents-charts';
import { FinancialChartYAxisMode } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartAxisTypes {

    private chart: IgcFinancialChartComponent;
    private xAxisMode = FinancialChartXAxisMode.Ordinal;
    private yAxisMode = FinancialChartYAxisMode.Numeric;
    private yAxisIsLogarithmic = false;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.initData();
        this.chart.xAxisMode = this.xAxisMode;
        this.chart.yAxisMode = this.yAxisMode;
        this.chart.yAxisIsLogarithmic = this.yAxisIsLogarithmic;

        let xAxisSelect = <HTMLSelectElement>document.getElementById('xAxisSelect');
        xAxisSelect!.addEventListener('change', this.onXAxisModeChanged);
        xAxisSelect!.value = "Ordinal";

        let yAxisSelect = <HTMLSelectElement>document.getElementById('yAxisSelect');
        yAxisSelect!.addEventListener('change', this.onYAxisModeChanged);
        yAxisSelect!.value = "Numeric";

        let yAxisIsLogarithmicSelect = document.getElementById('yAxisIsLogarithmicSelect');
        yAxisIsLogarithmicSelect!.addEventListener('change', this.onYAxisIsLogarithmicChanged);
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

    public onYAxisIsLogarithmicChanged = (e: any) => {
        this.yAxisIsLogarithmic = e.target.checked;
        this.chart.yAxisIsLogarithmic = this.yAxisIsLogarithmic;
    }

    initData(): any[] {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const dateEnd = new Date(year, month, 1);
        const dateStart = new Date(year - 1, month, 1);

        return StocksUtility.GetStocksBetween(dateStart, dateEnd);
    }
}

new FinancialChartAxisTypes();
