
import { SamplePolarData } from './SamplePolarData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule
);


export class DataChartTypePolarScatterSeries {


    
    
        

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SamplePolarData.create();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }
}

let sample = new DataChartTypePolarScatterSeries();