import { IgcCategoryChartModule, IgcLegendModule, IgcCategoryChartComponent, IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);
ModuleManager.register(IgcLegendModule);

export class CategoryChartAxisOverlap {

    private chart: IgcCategoryChartComponent;
    private overlapLabel: HTMLLabelElement;

    public data: any[] = [];

    constructor() {

        this.onOverlapChanged = this.onOverlapChanged.bind(this);

        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        this.chart.legend = document.getElementById("legend") as IgcLegendComponent;

        this.overlapLabel = document.getElementById("overlapLabel") as HTMLLabelElement;

        const overlapSlider = document.getElementById("overlapSlider") as HTMLInputElement;
        overlapSlider.addEventListener("input", this.onOverlapChanged);
    }

    public initData() {
        this.data = [
            { Franchise: "Marvel Universe All Films", TotalWorldBoxOfficeRevenue: 22.55, HighestGrossingMovieInSeries: 2.8 },
            { Franchise: "Star Wars", TotalWorldBoxOfficeRevenue: 10.32, HighestGrossingMovieInSeries: 2.07 },
            { Franchise: "Harry Potter", TotalWorldBoxOfficeRevenue: 9.19, HighestGrossingMovieInSeries: 1.34 },
            { Franchise: "Avengers", TotalWorldBoxOfficeRevenue: 7.76, HighestGrossingMovieInSeries: 2.8 },
            { Franchise: "Spider Man", TotalWorldBoxOfficeRevenue: 7.22, HighestGrossingMovieInSeries: 1.28 },
            { Franchise: "James Bond", TotalWorldBoxOfficeRevenue: 7.12, HighestGrossingMovieInSeries: 1.11 }
        ];
    }

    public onOverlapChanged(e: any) {
        const value = e.target.value;
        this.chart.xAxisOverlap = value;
        this.overlapLabel.textContent = value;
    }
}

new CategoryChartAxisOverlap();
