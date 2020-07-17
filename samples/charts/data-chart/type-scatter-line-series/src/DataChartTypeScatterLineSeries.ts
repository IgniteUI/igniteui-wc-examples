

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcScatterLineSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';


import { SampleScatterStats } from './SampleScatterStats';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcScatterLineSeriesModule
);


export class DataChartTypeScatterLineSeries {


    
    
        

    private chart: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;

        const series1 = document.getElementById('series1') as IgcScatterLineSeriesComponent;
        series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
        const series2 = document.getElementById('series2') as IgcScatterLineSeriesComponent;
        series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();

    }

    public setSeries(seriesType: string) {
        if (seriesType === 'Line') {
            const series1 = new IgcScatterLineSeriesComponent();
            series1.title = 'Rich Countries';
            series1.markerType = MarkerType.Circle;
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
            series1.showDefaultTooltip = true;
            series1.xMemberPath = 'Population';
            series1.yMemberPath = 'GdpTotal';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcScatterLineSeriesComponent();
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

let sample = new DataChartTypeScatterLineSeries();