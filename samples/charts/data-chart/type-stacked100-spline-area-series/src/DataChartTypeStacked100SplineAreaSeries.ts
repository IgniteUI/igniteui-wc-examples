

import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartStackedModule } from 'igniteui-webcomponents-charts';
import { IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule,
    IgcLegendModule,
);



export class DataChartTypeStacked100SplineAreaSeries {


    
    
        

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const data = [
            { Country: 'Canada', Coal: 400, Oil: 100, Gas: 175, Nuclear: 225, Hydro: 350 },
            { Country: 'China', Coal: 925, Oil: 200, Gas: 350, Nuclear: 400, Hydro: 625 },
            { Country: 'Russia', Coal: 550, Oil: 200, Gas: 250, Nuclear: 475, Hydro: 425 },
            { Country: 'Australia', Coal: 450, Oil: 100, Gas: 150, Nuclear: 175, Hydro: 350 },
            { Country: 'United States', Coal: 800, Oil: 250, Gas: 475, Nuclear: 575, Hydro: 750 },
            { Country: 'France', Coal: 375, Oil: 150, Gas: 350, Nuclear: 275, Hydro: 325 }
        ];

        return data;
    }
}

let sample = new DataChartTypeStacked100SplineAreaSeries();