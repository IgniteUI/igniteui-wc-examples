import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcScatterSplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { SampleScatterStats } from './SampleScatterStats';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcScatterSplineSeriesModule
);

export class DataChartTypeScatterSplineSeries {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;

        const series1 = document.getElementById('series1') as IgcScatterSplineSeriesComponent;
        series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
        const series2 = document.getElementById('series2') as IgcScatterSplineSeriesComponent;
        series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
    }

    public setSeries(seriesType: string)
    {
        if (seriesType === 'Spline') {
            const series1 = new IgcScatterSplineSeriesComponent();
            series1.title = 'Rich Countries';
            series1.markerType = MarkerType.Circle;
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
            series1.showDefaultTooltip = true;
            series1.xMemberPath = 'Population';
            series1.yMemberPath = 'GdpTotal';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcScatterSplineSeriesComponent();
            series2.title = 'Poor Countries';
            series2.markerType = MarkerType.Circle;
            series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
            series2.showDefaultTooltip = true;
            series2.xMemberPath = 'Population';
            series2.yMemberPath = 'GdpTotal';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        }
    }
}

new DataChartTypeScatterSplineSeries();
