
import { SampleRadialData } from './SampleRadialData';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartRadialCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartRadialModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { IgcRadialAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRadialLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRadialPieSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialPieSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRadialColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialColumnSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule,
    IgcRadialAreaSeriesModule,
    IgcRadialLineSeriesModule,
    IgcRadialPieSeriesModule,
    IgcRadialColumnSeriesModule
);


export class DataChartTypeRadialSeries {


    
    
        

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleRadialData.create();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
        this.setSeries('Pie');

        const seriesTypeSelect = document.getElementById('seriesTypeSelect') as HTMLSelectElement;
        seriesTypeSelect.value = 'Pie';
        seriesTypeSelect.addEventListener('change', this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
         if (seriesType === 'Area') {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialAreaSeriesComponent();
            series1.valueMemberPath  = 'Budget';
            series1.valueAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            const series2 = new IgcRadialAreaSeriesComponent();
            series2.valueMemberPath  = 'Spending';
            series2.valueAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';

            series1.title = 'Budget';
            series2.title = 'Spending';
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Pie') {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialPieSeriesComponent();
            series1.valueMemberPath  = 'Budget';
            series1.valueAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            const series2 = new IgcRadialPieSeriesComponent();
            series2.valueMemberPath  = 'Spending';
            series2.valueAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';

            series1.title = 'Budget';
            series2.title = 'Spending';
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Line') {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialLineSeriesComponent();
            series1.valueMemberPath  = 'Budget';
            series1.valueAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            const series2 = new IgcRadialLineSeriesComponent();
            series2.valueMemberPath  = 'Spending';
            series2.valueAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';

            series1.title = 'Budget';
            series2.title = 'Spending';
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Column') {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialColumnSeriesComponent();
            series1.valueMemberPath  = 'Budget';
            series1.valueAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            const series2 = new IgcRadialColumnSeriesComponent();
            series2.valueMemberPath  = 'Spending';
            series2.valueAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';

            series1.title = 'Budget';
            series2.title = 'Spending';
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        }
    }
}

let sample = new DataChartTypeRadialSeries();