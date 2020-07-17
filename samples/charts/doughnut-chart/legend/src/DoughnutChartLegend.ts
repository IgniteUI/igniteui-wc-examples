


import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcItemLegendModule
);


export class DoughnutChartLegend {


    
    
        

    private chart: IgcDoughnutChartComponent;
    private series: IgcRingSeriesComponent;

    constructor() {
        
    
        

        this.series = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        this.series.dataSource = this.getData();
        this.series.legend = document.getElementById('legend') as IgcItemLegendComponent;
    }

    public getData(): any[] {
        return[
                { MarketShare: 30, Company: 'Google',    },
                { MarketShare: 15, Company: 'Microsoft', },
                { MarketShare: 30, Company: 'Apple',     },
                { MarketShare: 15, Company: 'Samsung',   },
                { MarketShare: 10, Company: 'Other',     },
        ];
    }
}

let sample = new DoughnutChartLegend();