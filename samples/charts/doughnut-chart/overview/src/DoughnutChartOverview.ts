

import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule
);


export class DoughnutChartOverview {


    
    
        

    private chart: IgcDoughnutChartComponent;

    constructor() {
        
    
        

        let ringSeries = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        ringSeries.explodedSlices.add(3);
        ringSeries.explodedSlices.add(4);
        ringSeries.dataSource = this.getData();

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        this.chart.sliceClick = this.onSliceClick;
        // this.chart.series.add(ringSeries);
    }
    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {

        e.isExploded = !e.isExploded;
        e.isSelected = false;
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

let sample = new DoughnutChartOverview();