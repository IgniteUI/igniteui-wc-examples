import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { TrendLineType } from 'igniteui-webcomponents-core';
import { CategoryChartSharedData } from './CategoryChartSharedData';

ModuleManager.register(IgcCategoryChartModule);

export class CategoryChartTrendline {

    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.onTrendlineTypeChanged = this.onTrendlineTypeChanged.bind(this);

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.getData();

        let trendLineSelect = document.getElementById('trendLineSelect');
        trendLineSelect!.addEventListener('click', this.onTrendlineTypeChanged);
    }

    public onTrendlineTypeChanged = (e: any) => {
        let value = e.target.value;
        this.chart.trendLineType = value;
    }

    public getData(): any[] {

        // generating average temperature for a few cities
        const eg: any = CategoryChartSharedData.getTemperatures(30, 0, 2000);
        const it: any = CategoryChartSharedData.getTemperatures(20, 0, 2000);
        const uk: any = CategoryChartSharedData.getTemperatures(10, 0, 2000);

        // setting data intent for Series Title
        uk.__dataIntents = {
            Value: ['SeriesTitle/London']
        };
        it.__dataIntents = {
            Value: ['SeriesTitle/Rome']
        };
        eg.__dataIntents = {
            Value: ['SeriesTitle/Cairo']
        };
        return [eg, it, uk];
    }
}

let sample = new CategoryChartTrendline();
