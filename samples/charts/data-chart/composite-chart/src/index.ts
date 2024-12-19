import { IgcCalloutLayerModule, IgcDataChartAnnotationModule, IgcDataChartCategoryCoreModule, IgcNumberAbbreviatorModule,
         IgcDataChartCategoryModule, IgcDataChartCoreModule, IgcDataChartInteractivityModule, IgcLegendModule,
         IgcDataChartComponent, IgcLegendComponent, IgcCalloutLayerComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcCalloutLayerModule,
    IgcNumberAbbreviatorModule,
    IgcLegendModule
);

export class DataChartCompositeChart {

    private chart: IgcDataChartComponent;
    private data : any[] = [];
    private legend: IgcLegendComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;

        this.initData();
        this.chart.dataSource = this.data;
    }

    public formatNumber(num: number): string {
        var ret = num;
        if (num >= 1000000) return (num / 1000000.0).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000.0).toFixed(1) + "K";

        return ret.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    public initData(){
        this.data = [
            { Date: "Jan 1, 2019", Revenue: 16914, Expenses: 10183 },
            { Date: "Mar 1, 2019", Revenue: 15077, Expenses: 12813 },
            { Date: "Jun 1, 2019", Revenue: 16886, Expenses: 14476 },
            { Date: "Sep 1, 2019", Revenue: 17652, Expenses: 11705 },
            { Date: "Jan 1, 2020", Revenue: 21082, Expenses: 14044 },
            { Date: "Mar 1, 2020", Revenue: 17737, Expenses: 12803 },
            { Date: "Jun 1, 2020", Revenue: 18687, Expenses: 13677 },
            { Date: "Sep 1, 2020", Revenue: 21470, Expenses: 13717 },
            { Date: "Jan 1, 2021", Revenue: 28072, Expenses: 17133 }
        ];

        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];

            item.Revenue = item.Revenue * 1000;
            item.Expenses = item.Expenses * 1000;

            item.Income = item.Revenue - item.Expenses;
            item.IncomePerRevenue = (item.Income / item.Revenue) * 100;

            // calculating x-offset for callouts
            item.RevenueX = i;
            item.ExpensesX = i + 0.5;

            // formatting values for callouts
            item.FormattedRevenue = "$" + this.formatNumber(item.Revenue);
            item.FormattedIncome = "$" + this.formatNumber(item.Income);
            item.FormattedExpenses = "$" + this.formatNumber(item.Expenses);
            item.FormattedProfit = item.IncomePerRevenue + "%";
        }
    }
}

new DataChartCompositeChart();
