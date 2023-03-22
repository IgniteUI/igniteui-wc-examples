import { IgcDataChartCoreModule, IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcWaterfallSeriesComponent } from 'igniteui-webcomponents-charts';
import { CompanyIncomeDataItem, CompanyIncomeData } from './CompanyIncomeData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private waterfallSeries1: IgcWaterfallSeriesComponent
    private waterfallSeries2: IgcWaterfallSeriesComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var waterfallSeries1 = this.waterfallSeries1 = document.getElementById('WaterfallSeries1') as IgcWaterfallSeriesComponent;
        var waterfallSeries2 = this.waterfallSeries2 = document.getElementById('WaterfallSeries2') as IgcWaterfallSeriesComponent;

        this._bind = () => {
            xAxis.dataSource = this.companyIncomeData;
            waterfallSeries1.xAxis = this.xAxis;
            waterfallSeries1.yAxis = this.yAxis;
            waterfallSeries1.dataSource = this.companyIncomeData;
            waterfallSeries2.xAxis = this.xAxis;
            waterfallSeries2.yAxis = this.yAxis;
            waterfallSeries2.dataSource = this.companyIncomeData;
        }
        this._bind();

    }

    private _companyIncomeData: CompanyIncomeData = null;
    public get companyIncomeData(): CompanyIncomeData {
        if (this._companyIncomeData == null)
        {
            this._companyIncomeData = new CompanyIncomeData();
        }
        return this._companyIncomeData;
    }

}

new Sample();
