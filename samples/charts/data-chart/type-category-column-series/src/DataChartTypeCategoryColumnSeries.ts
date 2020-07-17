

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleCategoryData } from './SampleCategoryData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcLegendModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule
);


export class DataChartTypeCategoryColumnSeries {


    
    
        

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleCategoryData.create();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

}

let sample = new DataChartTypeCategoryColumnSeries();