import { IgcFinancialChartModule, IgcDataChartInteractivityModule, IgcDataLegendModule } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifierModule, IgcDateTimeFormatSpecifierModule } from 'igniteui-webcomponents-core';
import { IgcDataLegendComponent, IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { IgcNumberFormatSpecifier, IgcDateTimeFormatSpecifier } from 'igniteui-webcomponents-core';
import { MultipleStocks } from './MultipleStocks';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcFinancialChartModule,
    IgcDataChartInteractivityModule,
    IgcDataLegendModule,
    IgcNumberFormatSpecifierModule,
    IgcDateTimeFormatSpecifierModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private _numberFormatSpecifier1: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier1(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier1 == null)
        {
            let numberFormatSpecifier1: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier2 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier2.currency = "EUR";
            numberFormatSpecifier2.style = "currency";
            numberFormatSpecifier2.locale = "en-GB";
            numberFormatSpecifier2.minimumFractionDigits = 2;
            numberFormatSpecifier2.maximumFractionDigits = 2;

            numberFormatSpecifier1.push(numberFormatSpecifier2)
            this._numberFormatSpecifier1 = numberFormatSpecifier1;
        }
        return this._numberFormatSpecifier1;
    }
    private chart: IgcFinancialChartComponent
    private _numberFormatSpecifier3: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier3(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier3 == null)
        {
            let numberFormatSpecifier3: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier4 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier4.currency = "EUR";
            numberFormatSpecifier4.style = "currency";
            numberFormatSpecifier4.locale = "en-GB";
            numberFormatSpecifier4.minimumFractionDigits = 2;
            numberFormatSpecifier4.maximumFractionDigits = 2;

            numberFormatSpecifier3.push(numberFormatSpecifier4)
            this._numberFormatSpecifier3 = numberFormatSpecifier3;
        }
        return this._numberFormatSpecifier3;
    }
    private _numberFormatSpecifier5: IgcNumberFormatSpecifier[] | null = null;
    public get numberFormatSpecifier5(): IgcNumberFormatSpecifier[] {
        if (this._numberFormatSpecifier5 == null)
        {
            let numberFormatSpecifier5: IgcNumberFormatSpecifier[] = [];
            var numberFormatSpecifier6 = new IgcNumberFormatSpecifier();
            numberFormatSpecifier6.currency = "EUR";
            numberFormatSpecifier6.style = "currency";
            numberFormatSpecifier6.locale = "en-GB";
            numberFormatSpecifier6.minimumFractionDigits = 0;

            numberFormatSpecifier5.push(numberFormatSpecifier6)
            this._numberFormatSpecifier5 = numberFormatSpecifier5;
        }
        return this._numberFormatSpecifier5;
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
            legend.valueFormatSpecifiers = this.numberFormatSpecifier1;
            chart.dataSource = this.multipleStocks;
            chart.dataToolTipValueFormatSpecifiers = this.numberFormatSpecifier3;
            chart.yAxisLabelFormatSpecifiers = this.numberFormatSpecifier5;
            chart.xAxisLabelFormatSpecifiers = this.dateTimeFormatSpecifier1;
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
