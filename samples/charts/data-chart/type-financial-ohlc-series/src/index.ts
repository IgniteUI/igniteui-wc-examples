import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule
);

export class DataChartTypeFinancialOhlcSeries {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();
    }
}

new DataChartTypeFinancialOhlcSeries();
