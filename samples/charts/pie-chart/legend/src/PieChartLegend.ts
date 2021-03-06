import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPieChartModule,
    IgcItemLegendModule
);

export class PieChartLegend {

    private chart: IgcPieChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.legend = document.getElementById('legend') as IgcItemLegendComponent;
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

new PieChartLegend();
