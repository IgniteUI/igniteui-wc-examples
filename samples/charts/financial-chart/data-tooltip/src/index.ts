import { IgcFinancialChartModule, IgcDataChartInteractivityModule, IgcDataLegendModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { MultipleStocks } from './MultipleStocks';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcFinancialChartModule,
    IgcDataChartInteractivityModule,
    IgcDataLegendModule
);

export class Sample {

    private chart: IgcFinancialChartComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcFinancialChartComponent;

        this._bind = () => {
            chart.dataSource = this.multipleStocks
        }
        this._bind();
    }

    private _multipleStocks: MultipleStocks = null;
    private _multipleStocks_fetching: boolean = false;
    public get multipleStocks(): MultipleStocks {
        if (this._multipleStocks == null && !this._multipleStocks_fetching)
        {
            this._multipleStocks_fetching = true;
            ( async () => { this._multipleStocks = await (await MultipleStocks.fetch()); if ((this as any)._bind) { (this as any)._bind(); }  })();
        }
        return this._multipleStocks;
    }
    



}

new Sample();
