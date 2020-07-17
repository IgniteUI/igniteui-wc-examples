

import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcPieChartModule);


export class PieChartSelection {


    
    
        

    private chart: IgcPieChartComponent;
    private label: HTMLElement;

    constructor() {
        
        this.onSliceClick= this.onSliceClick.bind(this);
    
        

        this.chart = document.getElementById('chart') as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.sliceClick = this.onSliceClick;
        this.chart.selectedSliceOpacity = 0.85;
        this.chart.selectedSliceStrokeThickness = 4;
        this.chart.selectedSliceStroke = 'rgba(0, 0, 0, 0.5)';

        this.label = document.getElementById('label');
        this.label.innerText = 'Selected Slices: None';
    }

    onSliceClick(s: IgcPieChartComponent, e: IgcSliceClickEventArgs) {
        let selectedSlice: string = '';
        const selectedItems = this.chart.selectedItems.toArray();

        for (const item of selectedItems) {
            selectedSlice += item.Company + ', ';
        }

        this.label.innerText = 'Selected Slices: ' + selectedSlice;
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

let sample = new PieChartSelection();