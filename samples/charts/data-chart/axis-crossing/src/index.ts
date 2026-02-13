// data chart's modules:
import { IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule,
         IgcDataChartComponent, IgcLegendComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
);

export class DataChartAxisCrossing {

    private chart: IgcDataChartComponent;
    private xAxis: IgcNumericXAxisComponent;
    private yAxis: IgcNumericYAxisComponent;
    private xAxisCrossLabel: HTMLLabelElement;
    private yAxisCrossLabel: HTMLLabelElement;

    private data: any[] = [];

    constructor() {
        this.onXAxisSliderChanged = this.onXAxisSliderChanged.bind(this);
        this.onYAxisSliderChanged = this.onYAxisSliderChanged.bind(this);

        this.initData();

        this.chart = document.getElementById('chart') as IgcDataChartComponent;

        this.xAxis = document.getElementById("xAxis") as IgcNumericXAxisComponent;
        this.yAxis = document.getElementById("yAxis") as IgcNumericYAxisComponent;

        this.xAxis.crossingAxis = this.yAxis;
        this.yAxis.crossingAxis = this.xAxis;

        this.xAxisCrossLabel = document.getElementById("xAxisCrossLabel") as HTMLLabelElement;
        this.yAxisCrossLabel = document.getElementById("yAxisCrossLabel") as HTMLLabelElement;

        const xAxisSlider = document.getElementById("xAxisCrossingSlider") as HTMLInputElement;
        xAxisSlider.addEventListener("input", this.onXAxisSliderChanged);

        const yAxisSlider = document.getElementById("yAxisCrossingSlider") as HTMLInputElement;
        yAxisSlider.addEventListener("input", this.onYAxisSliderChanged);

        this.chart.dataSource = this.data;
    }

    public initData() {

        for (let i = -360; i <= 360; i += 10) {
            const radians = (i * Math.PI) / 180;
            const sin = Math.sin(radians);
            const cos = Math.cos(radians);
            this.data.push({ X: i, sinValue: sin, cosValue: cos });
        }
    }

    public onXAxisSliderChanged(e: any) {
        const value = e.target.value;
        this.yAxis.crossingValue = value;
        this.xAxisCrossLabel.textContent = value;
    }

    public onYAxisSliderChanged(e: any) {
        const value = e.target.value;
        this.xAxis.crossingValue = value;
        this.yAxisCrossLabel.textContent = value;
    }
}

export function initialize() {
  return new DataChartAxisCrossing();
}