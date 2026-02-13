import { SamplePolarData } from './SamplePolarData';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarScatterSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule,
    IgcPolarAreaSeriesModule,
    IgcPolarLineSeriesModule,
    IgcPolarSplineSeriesModule,
    IgcPolarSplineAreaSeriesModule,
    IgcPolarScatterSeriesModule
);

export class DataChartTypePolarSeries {

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SamplePolarData.create();

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
        this.setSeries('Polar Area Chart');

        const seriesTypeSelect = document.getElementById('seriesTypeSelect') as HTMLSelectElement;
        seriesTypeSelect.value = 'Polar Area Chart';
        seriesTypeSelect!.addEventListener('change', this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
         if (seriesType === 'Polar Area Chart') {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarAreaSeriesComponent();
            series1.angleMemberPath = 'Direction';
            series1.radiusMemberPath  = 'BoatSpeed';
            series1.radiusAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            series1.title = 'Boat Speed';
            series1.markerType = MarkerType.Circle;
            series1.areaFillOpacity = 1;

            const series2 = new IgcPolarAreaSeriesComponent();
            series2.angleMemberPath = 'Direction';
            series2.radiusMemberPath  = 'WindSpeed';
            series2.radiusAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';
            series2.title = 'Wind Speed';
            series2.markerType = MarkerType.Circle;
            series2.areaFillOpacity = 1;

            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);
        }
        else if (seriesType === 'Polar Spline Chart') {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarSplineSeriesComponent();
            series1.angleMemberPath = 'Direction';
            series1.radiusMemberPath  = 'BoatSpeed';
            series1.radiusAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            series1.title = 'Boat Speed';
            series1.markerType = MarkerType.Circle;
            series1.areaFillOpacity = 1;

            const series2 = new IgcPolarSplineSeriesComponent();
            series2.angleMemberPath = 'Direction';
            series2.radiusMemberPath  = 'WindSpeed';
            series2.radiusAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';
            series2.title = 'Wind Speed';
            series2.markerType = MarkerType.Circle;
            series2.areaFillOpacity = 1;

            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);
        }
        else if (seriesType === 'Polar Line Chart') {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarLineSeriesComponent();
            series1.angleMemberPath = 'Direction';
            series1.radiusMemberPath  = 'BoatSpeed';
            series1.radiusAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            series1.title = 'Boat Speed';
            series1.markerType = MarkerType.Circle;
            series1.areaFillOpacity = 1;

            const series2 = new IgcPolarLineSeriesComponent();
            series2.angleMemberPath = 'Direction';
            series2.radiusMemberPath  = 'WindSpeed';
            series2.radiusAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';
            series2.title = 'Wind Speed';
            series2.markerType = MarkerType.Circle;
            series2.areaFillOpacity = 1;

            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);
        }
        else if (seriesType === 'Polar Scatter Chart') {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarScatterSeriesComponent();
            series1.angleMemberPath = 'Direction';
            series1.radiusMemberPath  = 'BoatSpeed';
            series1.radiusAxisName = 'radiusAxis';
            series1.angleAxisName = 'angleAxis';
            series1.title = 'Boat Speed';
            series1.markerType = MarkerType.Circle;
            series1.areaFillOpacity = 1;

            const series2 = new IgcPolarScatterSeriesComponent();
            series2.angleMemberPath = 'Direction';
            series2.radiusMemberPath  = 'WindSpeed';
            series2.radiusAxisName = 'radiusAxis';
            series2.angleAxisName = 'angleAxis';
            series2.title = 'Wind Speed';
            series2.markerType = MarkerType.Circle;
            series2.areaFillOpacity = 1;

            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);
        }
    }
}

export function initialize() {
  return new DataChartTypePolarSeries();
}