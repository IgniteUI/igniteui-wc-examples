

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcBarSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPointSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcSplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcSplineAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStepAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcStepLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcWaterfallSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcBarSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPointSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcSplineAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStepAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStepLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcWaterfallSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleCategoryData } from './SampleCategoryData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcAreaSeriesModule,
    IgcBarSeriesModule,
    IgcLineSeriesModule,
    IgcPointSeriesModule,
    IgcSplineSeriesModule,
    IgcSplineAreaSeriesModule,
    IgcStepAreaSeriesModule,
    IgcStepLineSeriesModule,
    IgcWaterfallSeriesModule,
    IgcLegendModule
);


export class DataChartTypeCategorySeries {






    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {




        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleCategoryData.create();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;

        this.setSeries('Column');

        const columnTypeSelect = document.getElementById('columnTypeSelect');
        columnTypeSelect?.addEventListener('change', this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
        // creating axis based on requirements of series
        // if (seriesType === 'Bar') {
        //     const xAxis = new IgcNumericXAxis({ name:  'xAxis', minimumValue: 0 });
        //     const yAxis = new IgcCategoryYAxis({ name: 'yAxis' });
        //     yAxis.label = 'Year';
        //     this.chart.axes.clear();
        //     this.chart.axes.add(xAxis);
        //     this.chart.axes.add(yAxis);
        // } else {
        //     const yAxis = new IgcNumericYAxis({ name:  'yAxis', minimumValue: 0 });
        //     const xAxis = new IgcCategoryXAxis({ name: 'xAxis' });
        //     xAxis.label = 'Year';
        //     this.chart.axes.clear();
        //     this.chart.axes.add(xAxis);
        //     this.chart.axes.add(yAxis);
        // }

        if (seriesType === 'Column') {

            const series1 = new IgcColumnSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcColumnSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Line') {

            const series1 = new IgcLineSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';
            series1.thickness = 2;

            const series2 = new IgcLineSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';
            series2.thickness = 2;

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Point') {

            const series1 = new IgcPointSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';
            series1.thickness = 2;

            const series2 = new IgcPointSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';
            series2.thickness = 2;

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Area') {

            const series1 = new IgcAreaSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcAreaSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Spline') {

            const series1 = new IgcSplineSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';
            series1.thickness = 2;

            const series2 = new IgcSplineSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';
            series2.thickness = 2;

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'SplineArea') {

            const series1 = new IgcSplineAreaSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcSplineAreaSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'StepArea') {

            const series1 = new IgcStepAreaSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcStepAreaSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'StepLine') {

            const series1 = new IgcStepLineSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcStepLineSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Waterfall') {

            const series1 = new IgcWaterfallSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            const series2 = new IgcWaterfallSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            series2.xAxisName = 'xAxis';
            series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === 'Bar') {

            const series1 = new IgcBarSeriesComponent();
            series1.valueMemberPath = 'USA';
            series1.title = 'USA';
            // TODO-MT
            // series1.xAxisName = 'xAxis';
            // series1.yAxisName = 'yAxis';

            const series2 = new IgcBarSeriesComponent();
            series2.valueMemberPath = 'RUS';
            series2.title = 'Russia';
            // TODO-MT
            // series2.xAxisName = 'xAxis';
            // series2.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        }
    }

}

let sample = new DataChartTypeCategorySeries();