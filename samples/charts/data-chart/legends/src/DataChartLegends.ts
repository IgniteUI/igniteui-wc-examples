

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataChartSharedData } from './DataChartSharedData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcLegendModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcNumberAbbreviatorModule
);


export class DataChartLegends {


    
    
        

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const data = DataChartSharedData.getEnergyProduction();
        return data;
    }
}

let sample = new DataChartLegends();