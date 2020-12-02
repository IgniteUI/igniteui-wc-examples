import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesComponent } from 'igniteui-webcomponents-charts';
import { SampleShapeData } from './SampleShapeData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartShapeCoreModule,
    IgcDataChartShapeModule,
    IgcDataChartInteractivityModule,
    IgcScatterPolylineSeriesModule
);

export class DataChartTypeScatterPolylineSeries {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleShapeData.create();
    }

    public setSeries() {
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

let sample = new DataChartTypeScatterPolylineSeries();
