

import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcIndexCollection } from 'igniteui-webcomponents-charts';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule
);


export class DoughnutChartExplosion {


    
    
        

    private chart: IgcDoughnutChartComponent;
    private label: HTMLElement;

    constructor() {
        
    
        

        let ringSeries = document.getElementById('ringSeries') as IgcRingSeriesComponent;
        ringSeries.explodedSlices.add(3);
        ringSeries.explodedSlices.add(4);
        ringSeries.dataSource = this.getData();

        this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        this.chart.sliceClick = this.onSliceClick;

        this.label = document.getElementById('label');
        this.updateLabel();
    }
    public explodedSlices: number[] = [3, 4];
    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {

        let clickedSlice = e.dataContext.index;
        let wasExploded = this.explodedSlices.indexOf(clickedSlice) >= 0;
        if (wasExploded || e.isExploded) {
            this.explodedSlices = this.removeFrom(this.explodedSlices, clickedSlice);
        } else {
            this.explodedSlices.push(clickedSlice);
        }

        this.updateLabel();

        e.isExploded = !e.isExploded;
        e.isSelected = false;
    }

    updateLabel() {
        if (this.explodedSlices.length === 0) {
            this.label.innerText = 'Exploded Slices: None';
        } else {
            this.explodedSlices.sort();
            this.label.innerText = 'Exploded Slices: ' + this.explodedSlices.join(', ');
        }
    }

    removeFrom(array: any[], item: any): any[] {
        return array.filter(function(i) { return i !== item });
    }

    public getData(): any[] {
        let data: any[] = [
            { marketShare: 30, company: 'Google',    },
            { marketShare: 15, company: 'Microsoft', },
            { marketShare: 30, company: 'Apple',     },
            { marketShare: 15, company: 'Samsung',   },
            { marketShare: 10, company: 'Other',     },
        ];
        for (let i = 0; i < data.length; i++) {
            data[i].index = i;
            data[i].label = i + ' ' + data[i].company;
        }
        return data;
    }

}

let sample = new DoughnutChartExplosion();