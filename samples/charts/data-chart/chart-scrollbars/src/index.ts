import { ModuleManager } from 'igniteui-webcomponents-core';
// data chart's modules:
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
// financial series modules:
import { IgcDataChartFinancialModule } from 'igniteui-webcomponents-charts';
// data chart's elements:
import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartFinancialModule,
    IgcDataChartInteractivityModule,
);

export class DataChartScrolling {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();

        this.chart.actualWindowScaleHorizontal = 0.60;
        this.chart.actualWindowScaleVertical = 0.60;
        this.chart.actualWindowPositionVertical = 0.20;
        this.chart.actualWindowPositionHorizontal = 0.20;
    }
}

new DataChartScrolling();
