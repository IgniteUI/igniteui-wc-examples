import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryTrendLineModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-webcomponents-charts';
import { TrendLineType } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcDataChartCategoryTrendLineModule
);

export class DataChartSeriesTrendlines {

    private chart: IgcDataChartComponent;
    private series1: IgcFinancialPriceSeriesComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.series1 = document.getElementById('series1') as IgcFinancialPriceSeriesComponent;
        this.series1.trendLineType = TrendLineType.CubicFit;

        const trendLineSelect = document.getElementById('trendLineSelect') as HTMLSelectElement;
        trendLineSelect.value = 'CubicFit';
        trendLineSelect!.addEventListener('change', this.onTrendlineChange);
    }

    public onTrendlineChange = (e: any) => {
        let trendlineType: TrendLineType = TrendLineType.None;
        switch (e.target.value) {
            case 'None':
                trendlineType = TrendLineType.None;
                break;
            case 'CubicFit':
                trendlineType = TrendLineType.CubicFit;
                break;
            case 'CumulativeAverage':
                trendlineType = TrendLineType.CumulativeAverage;
                break;
            case 'ExponentialAverage':
                trendlineType = TrendLineType.ExponentialAverage;
                break;
            case 'ExponentialFit':
                trendlineType = TrendLineType.ExponentialFit;
                break;
            case 'LinearFit':
                trendlineType = TrendLineType.LinearFit;
                break;
            case 'LogarithmicFit':
                trendlineType = TrendLineType.LogarithmicFit;
                break;
            case 'ModifiedAverage':
                trendlineType = TrendLineType.ModifiedAverage;
                break;
            case 'PowerLawFit':
                trendlineType = TrendLineType.PowerLawFit;
                break;
            case 'QuadraticFit':
                trendlineType = TrendLineType.QuadraticFit;
                break;
            case 'QuarticFit':
                trendlineType = TrendLineType.QuarticFit;
                break;
            case 'QuinticFit':
                trendlineType = TrendLineType.QuinticFit;
                break;
            case 'SimpleAverage':
                trendlineType = TrendLineType.SimpleAverage;
                break;
            case 'WeightedAverage':
                trendlineType = TrendLineType.WeightedAverage;
                break;
        }
        this.series1.trendLineType = trendlineType;
    }

    getData(): any[] {
        const data = SampleFinancialData.create();
        return data;
    }
}

let sample = new DataChartSeriesTrendlines();
