

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcCategoryChartModule,
    IgcLegendModule
);


export class CategoryChartOverview {






    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.onChartTypeChanged = this.onChartTypeChanged.bind(this);
        this.onLegendRef = this.onLegendRef.bind(this);
        this.initData();



        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        this.chart.legend = document.getElementById('legend') as IgcLegendComponent;

        let chartType1 = document.getElementById('chartType');
        chartType1!.addEventListener('change', this.onChartTypeChanged);

    }
    public onChartTypeChanged = (e: any) => {
        const chartMode = e.target.value.toString();
        this.chart.chartType = chartMode;
    }

    public onChartRef(chart: IgcCategoryChartComponent) {
        this.chart = chart;
        if (this.chart.legend) {
            this.chart.legend = this.chart.legend;
        }
    }

    public onLegendRef(legend: IgcLegendModule) {
        this.chart.legend = legend;
        if (this.chart) {
            this.chart.legend = this.chart.legend;
        }
    }

    public initData() {
        const usaMedals: any = [
            { Year: '1996', UnitedStates: 148 },
            { Year: '2000', UnitedStates: 142 },
            { Year: '2004', UnitedStates: 134 },
            { Year: '2008', UnitedStates: 131 },
            { Year: '2012', UnitedStates: 135 },
            { Year: '2016', UnitedStates: 146 }
        ];
        const chinaMedals: any = [
            { Year: '1996', China: 110 },
            { Year: '2000', China: 115 },
            { Year: '2004', China: 121 },
            { Year: '2008', China: 129 },
            { Year: '2012', China: 115 },
            { Year: '2016', China: 112 }
        ];
        const russiaMedals: any = [
            { Year: '1996', Russia: 95 },
            { Year: '2000', Russia: 91 },
            { Year: '2004', Russia: 86 },
            { Year: '2008', Russia: 65 },
            { Year: '2012', Russia: 77 },
            { Year: '2016', Russia: 88 }
        ];
        this.data = [usaMedals, chinaMedals, russiaMedals];
    }
}

let sample = new CategoryChartOverview();