import { IgcFinancialChartModule, IgcDataChartInteractivityModule, IgcDataLegendModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { MultipleStocks } from './MultipleStocks';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcFinancialChartModule,
    IgcDataChartInteractivityModule,
    IgcDataLegendModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcFinancialChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcFinancialChartComponent;

        this._bind = () => {
            legend.target = this.chart;
            chart.dataSource = this.multipleStocks;
        }
        this._bind();

    }

    private _multipleStocks: MultipleStocks = null;
    private _isFetching: boolean = false;
    public get multipleStocks(): MultipleStocks {
        if (this._multipleStocks == null && !this._isFetching)
        {
            this._isFetching = true;
            ( async () => { this._multipleStocks = await (await MultipleStocks.fetch()); if ((this as any)._bind) { (this as any)._bind(); }  })();
        }
        return this._multipleStocks;
    }

}

new Sample();
