import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcRangeColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { TemperatureRangeDataItem, TemperatureRangeData } from './TemperatureRangeData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcLegendModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private series1: IgcRangeColumnSeriesComponent
    private series2: IgcRangeColumnSeriesComponent

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var series1 = this.series1 = document.getElementById('series1') as IgcRangeColumnSeriesComponent;
        var series2 = this.series2 = document.getElementById('series2') as IgcRangeColumnSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend
            xAxis.dataSource = this.temperatureRangeData
            series1.xAxis = this.xAxis
            series1.yAxis = this.yAxis
            series1.dataSource = this.temperatureRangeData
            series2.xAxis = this.xAxis
            series2.yAxis = this.yAxis
            series2.dataSource = this.temperatureRangeData
        }
        this._bind();
    }

    private _temperatureRangeData: TemperatureRangeData = null;
    public get temperatureRangeData(): TemperatureRangeData {
        if (this._temperatureRangeData == null)
        {
            this._temperatureRangeData = new TemperatureRangeData();
        }
        return this._temperatureRangeData;
    }
    



}

new Sample();
