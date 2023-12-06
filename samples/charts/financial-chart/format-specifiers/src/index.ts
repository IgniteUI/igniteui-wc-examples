import { IgcFinancialChartModule, IgcDataChartInteractivityModule, IgcDataLegendModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifier, IgcDateTimeFormatSpecifier } from 'igniteui-webcomponents-core';
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
    private _numberFormatSpecifier1: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier1(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier1 == null)
        {
            let numberFormatSpecifier1: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier2 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier2.currency = "EUR";
            numberFormatSpecifier2.style = "currency";
            numberFormatSpecifier2.locale = "en-GB";
            numberFormatSpecifier2.minimumFractionDigits = 0;

            numberFormatSpecifier1.push(numberFormatSpecifier2)
            this._numberFormatSpecifier1 = numberFormatSpecifier1;
        }
        return this._numberFormatSpecifier1;
    }
    private _dateTimeFormatSpecifier1: IgcDateTimeFormatSpecifier[] | null = null;
    public get dateTimeFormatSpecifier1(): IgcDateTimeFormatSpecifier[] {
        if (this._dateTimeFormatSpecifier1 == null)
        {
            let dateTimeFormatSpecifier1: IgcDateTimeFormatSpecifier[] = [];
            var dateTimeFormatSpecifier2 = new IgcDateTimeFormatSpecifier();
            dateTimeFormatSpecifier2.locale = "en-GB";
            dateTimeFormatSpecifier2.dateStyle = "long";

            dateTimeFormatSpecifier1.push(dateTimeFormatSpecifier2)
            this._dateTimeFormatSpecifier1 = dateTimeFormatSpecifier1;
        }
        return this._dateTimeFormatSpecifier1;
    }
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcFinancialChartComponent;

        this._bind = () => {
            legend.target = this.chart;
            chart.dataSource = this.multipleStocks;
            chart.yAxisLabelFormatSpecifiers = this.numberFormatSpecifier1;
            chart.xAxisLabelFormatSpecifiers = this.dateTimeFormatSpecifier1;
        }
        this._bind();

    }

    private _multipleStocks: MultipleStocks = null;
    private _multipleStocksFetching: boolean = false;
    public get multipleStocks(): MultipleStocks {
        if (this._multipleStocks == null && !this._multipleStocksFetching)
        {
            this._multipleStocksFetching = true;
            ( async () => { this._multipleStocks = await (await MultipleStocks.fetch()); if ((this as any)._bind) { (this as any)._bind(); }  })();
        }
        return this._multipleStocks;
    }

}

new Sample();
