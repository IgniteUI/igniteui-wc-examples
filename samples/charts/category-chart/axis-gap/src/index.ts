import { Data } from './sampleData';
import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private chart: IgcCategoryChartComponent
    private xAxisGapValue: HTMLLabelElement;

    constructor() {
        this.onXAxisGapChanged = this.onXAxisGapChanged.bind(this);

        const xAxisSlider = document.getElementById("xAxisGapSlider") as HTMLInputElement;
        xAxisSlider.addEventListener("input", this.onXAxisGapChanged);

        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this.chart.xAxisGap = 1.0;
        this.chart.xAxisMaximumGap = 1.5;
        chart.dataSource = this.data
    }

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }

    public onXAxisGapChanged(e: any) {
        const value = e.target.value;
        this.chart.xAxisGap = value;
        this.xAxisGapValue = value;
    }
}

new Sample();
