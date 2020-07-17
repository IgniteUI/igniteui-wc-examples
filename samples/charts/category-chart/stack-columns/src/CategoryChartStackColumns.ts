

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
// double legend
ModuleManager.register(
    IgcCategoryChartModule,
    IgcLegendModule
);


export class CategoryChartStackColumns {


    
    
        

    private chart: IgcCategoryChartComponent;
    private legend: IgcLegendComponent;

    public data: any[];

    constructor() {
        
        this.initData();
    
        

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        this.chart.includedProperties = [ 'Blogging', 'Social', 'News', 'TV', 'Music', 'Country'];

        this.chart.yAxisFormatLabel = this.onFormatYAxisLabel;

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    public onFormatYAxisLabel(item: any): string {
        return item + 'h';
    }

    public initData() {
        const stats: any = [
            { M: 0.1, N: 0.2, T: 1.1, S: 0.9, B: 0.3, Country: 'Japan' },
            { M: 0.2, N: 0.2, T: 1.3, S: 1.2, B: 0.5, Country: 'Germany' },
            { M: 0.2, N: 0.2, T: 1.5, S: 1.1, B: 0.4, Country: 'France' },
            { M: 0.3, N: 0.2, T: 1.5, S: 1.4, B: 0.5, Country: 'Ireland' },
            { M: 0.4, N: 0.3, T: 1.5, S: 1.3, B: 0.6, Country: 'Australia' },
            { M: 0.3, N: 0.3, T: 1.4, S: 1.5, B: 1.3, Country: 'Sweden' },
            { M: 0.4, N: 0.2, T: 1.4, S: 1.4, B: 1.4, Country: 'Poland' },
            { M: 0.5, N: 0.3, T: 1.4, S: 1.4, B: 1.5, Country: 'UK' },
            { M: 0.4, N: 0.3, T: 1.5, S: 1.4, B: 1.3, Country: 'Canada' },
            { M: 0.4, N: 0.4, T: 1.5, S: 1.6, B: 1.5, Country: 'Spain' },
            { M: 0.5, N: 0.3, T: 1.7, S: 1.3, B: 1.5, Country: 'Germany' },
            { M: 0.4, N: 0.4, T: 2.2, S: 1.4, B: 1.6, Country: 'Taiwan' },
            { M: 0.5, N: 0.3, T: 2.3, S: 1.4, B: 1.5, Country: 'Russia' },
            { M: 0.5, N: 0.3, T: 2.4, S: 1.6, B: 1.3, Country: 'China' },
            { M: 0.6, N: 0.4, T: 2.5, S: 1.8, B: 1.4, Country: 'USA' },
            { M: 0.5, N: 0.5, T: 2.4, S: 2.2, B: 1.5, Country: 'Italy' },
            { M: 0.5, N: 0.6, T: 2.5, S: 2.3, B: 1.4, Country: 'India' },
            { M: 0.6, N: 0.5, T: 2.5, S: 2.4, B: 1.3, Country: 'Argentina' },
            { M: 0.6, N: 0.6, T: 2.6, S: 2.5, B: 1.4, Country: 'Mexico' },
            { M: 0.7, N: 0.5, T: 2.6, S: 2.6, B: 1.4, Country: 'Turkey' },
            { M: 0.8, N: 0.7, T: 2.7, S: 2.7, B: 1.5, Country: 'Indonesia' },
            { M: 0.9, N: 0.7, T: 2.7, S: 2.8, B: 1.6, Country: 'Thailand' },
            { M: 0.8, N: 0.8, T: 2.8, S: 2.9, B: 1.7, Country: 'Brazil' }
        ];

        // category chart does not have stacked series yet but you can render the stacked chart
        // using multiple columns that are overlapping with each other and showing stacked values
        for (const item of stats) {
            // stacking up values of data items
            item.Blogging = item.T + item.M + item.N + item.S + item.B;
            item.Social = item.T + item.M + item.N + item.S;
            item.News = item.T + item.M + item.N;
            item.Music = item.T + item.M;
            item.TV = item.T;
            // rounding up stacked values
            item.Blogging = Math.round(item.Blogging * 10) / 10;
            item.Social = Math.round(item.Social * 10) / 10;
            item.News = Math.round(item.News * 10) / 10;
            item.TV = Math.round(item.TV * 10) / 10;
            item.Music = Math.round(item.Music * 10) / 10;
        }
        this.data = stats;
    }
}

let sample = new CategoryChartStackColumns();