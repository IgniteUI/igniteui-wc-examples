import { SampleDensityData } from './SampleDensityData';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcHighDensityScatterSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcHighDensityScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcHighDensityScatterSeriesModule,
    IgcNumericYAxisModule,
    IgcNumericXAxisModule
);

export class DataChartTypeScatterDensitySeries {
    constructor() {
        let chart = document.getElementById('chart') as IgcDataChartComponent;
        chart.dataSource = SampleDensityData.create();
    }
}

new DataChartTypeScatterDensitySeries();
