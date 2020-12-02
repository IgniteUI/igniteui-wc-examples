import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcPieChartModule);

export class PieChartOverview {

    private chart: IgcPieChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcPieChartComponent;
        this.chart.dataSource = this.initData();
    }

    public initData(): any[] {
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

let sample = new PieChartOverview();
