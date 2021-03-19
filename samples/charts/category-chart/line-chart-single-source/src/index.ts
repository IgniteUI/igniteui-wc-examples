import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcCategoryChartModule
);

export class CategoryChartLineChartSingleSource {

    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;
    }

    public initData() {
        this.data = [
            { Year: "2009", Europe: 31 },
            { Year: "2010", Europe: 43 },
            { Year: "2011", Europe: 66 },
            { Year: "2012", Europe: 69 },
            { Year: "2013", Europe: 58 },
            { Year: "2014", Europe: 40 },
            { Year: "2015", Europe: 78 },
            { Year: "2016", Europe: 13 },
            { Year: "2017", Europe: 78 },
            { Year: "2018", Europe: 40 },
            { Year: "2019", Europe: 80 }
        ];
    }
}

new CategoryChartLineChartSingleSource();
