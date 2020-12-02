// data chart's modules:
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
// series' module:
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
// legend's module:
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcLegendModule
);

export class DataChartAxisLocations {

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const items: any[] = [];
        const months: string[] = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ];

        let revenue = 200;
        let profit = 15;
        let expanse = 0;

        let year = 2020;
        let month = 0;
        for (let i = 0; i < 25; i++) {
            revenue += Math.random() * 50 - 20;
            profit += Math.random() * 4.0 - 2.0; // percentage
            expanse = revenue - (revenue * profit / 100);
            items.push(
                {
                    Expanse: Math.round(-expanse),
                    Month:  months[month],
                    Profit: Math.round(profit),
                    Revenue: Math.round(revenue),
                    Year: year,
            });
            month += 1;
            if (month >= 12) {
                month = 0;
                year += 1;
            }
        }

        const data = items;

        return data;
    }
}

let sample = new DataChartAxisLocations();
