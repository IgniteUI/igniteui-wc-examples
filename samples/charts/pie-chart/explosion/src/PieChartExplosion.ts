

import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcPieChartModule);


export class PieChartExplosion {


    
    
        

    private chart: IgcPieChartComponent;

    constructor() {
        
        this.onSliceClick= this.onSliceClick.bind(this);
    
        

        this.chart = document.getElementById('chart') as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.sliceClick = this.onSliceClick;
    }

    onSliceClick(s: IgcPieChartComponent, e: IgcSliceClickEventArgs) {
        e.isExploded = !e.isExploded;
        e.isSelected = false;
    }

    public getData(): any[] {

        let data = [
            { MarketShare: 30, Company: 'Google', },
            { MarketShare: 30, Company: 'Apple', },
            { MarketShare: 15, Company: 'Microsoft', },
            { MarketShare: 15, Company: 'Samsung', },
            { MarketShare: 10, Company: 'Other', },
        ];

        return data;
    }
}

let sample = new PieChartExplosion();