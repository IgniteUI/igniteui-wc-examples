import { FinancialIndicatorType, IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartIndicatorTypes {

    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.indicatorTypes.add(FinancialIndicatorType.MovingAverageConvergenceDivergence);
        this.chart.indicatorTypes.add(FinancialIndicatorType.RelativeStrengthIndex);
        this.chart.indicatorThickness = 2;
        this.chart.indicatorNegativeBrushes = ["Red"];
        this.chart.indicatorBrushes = ["Green", "Blue"]
        this.chart.dataSource = this.initData();
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

new FinancialChartIndicatorTypes();
