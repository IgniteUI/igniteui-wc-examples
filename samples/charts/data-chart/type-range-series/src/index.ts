import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcRangeAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRangeColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRangeAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRangeColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleRangeData } from './SampleRangeData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcRangeAreaSeriesModule,
    IgcRangeColumnSeriesModule,
    IgcLegendModule
);

export class DataChartTypeRangeSeries {

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleRangeData.create();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;

        const seriesTypeSelect = document.getElementById('seriesTypeSelect') as HTMLSelectElement;
        seriesTypeSelect!.value = 'Column';
        seriesTypeSelect!.addEventListener('change', this.onSeriesTypeChanged);
        this.setSeries(seriesTypeSelect!.value);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
        if (seriesType === 'Area') {
            const series1 = new IgcRangeAreaSeriesComponent();
            series1.highMemberPath = 'High';
            series1.lowMemberPath  = 'Low';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';
            series1.thickness = 0;
            series1.title = "Weather Forecast";

            this.chart.series.clear();
            this.chart.series.add(series1);
        } else if (seriesType === 'Column') {
            const series1 = new IgcRangeColumnSeriesComponent();
            series1.highMemberPath = 'High';
            series1.lowMemberPath  = 'Low';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';
            series1.title="Weather Forecast";

            this.chart.series.clear();
            this.chart.series.add(series1);
        }
    }
}

new DataChartTypeRangeSeries();
