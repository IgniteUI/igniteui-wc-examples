import { IgcCategoryChartModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDomainChartComponent } from 'igniteui-webcomponents-charts';
import { IgcChartSeriesEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcCategoryChartModule);
ModuleManager.register(IgcDataChartInteractivityModule);

export class CategoryChartTooltipTemplate {

    private chart: IgcCategoryChartComponent;

    public data: any[] = [];

    constructor() {

        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.seriesAdded = this.onSeriesAdded;
        this.chart.dataSource = this.data;
    }

    public onSeriesAdded = (s: IgcDomainChartComponent, e: IgcChartSeriesEventArgs) => {
        if (e.series) {
            e.series.tooltipTemplate = this.createCategoryChartTooltipTemplate;
        }
    }

    public createCategoryChartTooltipTemplate(context: any) : any {

        if (!context) return null;

        var dataItem = context.item;
        if (!dataItem) return null;

        var tooltipItem1 = document.createElement("div");
        tooltipItem1.innerHTML = "Franchise: " + dataItem.Franchise;
        tooltipItem1.className = "tooltipTitle";

        var tooltipItem2 = document.createElement("div");
        tooltipItem2.innerHTML = "Revenue of All Movies: " + dataItem.TotalRevenue;
        tooltipItem2.className = "tooltipLbl";

        var tooltipItem3= document.createElement("div");
        tooltipItem3.innerHTML = "Highest Grossing Movie: $" + dataItem.HighestGrossing;
        tooltipItem3.className = "tooltipLbl";

        var tooltip = document.createElement("div");
        tooltip.className = "tooltipVertical";
        tooltip.appendChild(tooltipItem1);
        tooltip.appendChild(tooltipItem2);
        tooltip.appendChild(tooltipItem3);

        return tooltip;
    }

    public initData() {
        this.data = [
            { Franchise: "Marvel Universe All Films", TotalRevenue: 22.55, HighestGrossing: 2.8 },
            { Franchise: "Star Wars", TotalRevenue: 10.32, HighestGrossing: 2.07 },
            { Franchise: "Harry Potter", TotalRevenue: 9.19, HighestGrossing: 1.34 },
            { Franchise: "Avengers", TotalRevenue: 7.76, HighestGrossing: 2.8 },
            { Franchise: "Spider Man", TotalRevenue: 7.22, HighestGrossing: 1.28 },
            { Franchise: "James Bond", TotalRevenue: 7.12, HighestGrossing: 1.11 }
        ];
    }
}

export function initialize() {
  return new CategoryChartTooltipTemplate();
}