import { SampleShapeData } from './SampleShapeData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolygonSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolygonSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesComponent } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartShapeCoreModule,
    IgcDataChartShapeModule,
    IgcDataChartInteractivityModule,
    IgcScatterPolygonSeriesModule,
    IgcScatterPolylineSeriesModule
);

export class DataChartTypeShapeSeries {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();
        this.setSeries('Polygon');

        const seriesTypeSelect = document.getElementById('seriesTypeSelect') as HTMLSelectElement;
        seriesTypeSelect.value = 'Polygon';
        seriesTypeSelect!.addEventListener('change', this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string)
    {
         if (seriesType === 'Polygon') {

            const series1 = new IgcScatterPolygonSeriesComponent();
            series1.shapeMemberPath = 'Points';
            series1.title = 'House Floor Plan';
            series1.brush = 'Gray';
            series1.outline = 'Black';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';
            this.chart.series.clear();
            this.chart.series.add(series1);
        }
        else if (seriesType === 'Polyline') {

            const series1 = new IgcScatterPolylineSeriesComponent();
            series1.shapeMemberPath = 'Points';
            series1.title = 'House Outline';
            series1.brush = 'Black';
            series1.outline = 'Black';
            series1.xAxisName = 'xAxis';
            series1.yAxisName = 'yAxis';

            this.chart.series.clear();
            this.chart.series.add(series1);
        }
    }

    getData(): any[] {
        const data = SampleShapeData.create();
        return data;
    }
}

let sample = new DataChartTypeShapeSeries();
