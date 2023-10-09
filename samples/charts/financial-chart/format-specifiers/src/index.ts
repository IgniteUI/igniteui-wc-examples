import { IgcFinancialChartModule, IgcDataChartInteractivityModule, IgcDataLegendModule } from 'igniteui-webcomponents-charts';
import { IgcDataLegendComponent, IgcFinancialChartComponent, IgcNumberFormatSpecifierComponent, IgcDateTimeFormatSpecifierComponent } from 'igniteui-webcomponents-charts';
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
    private _numberFormatSpecifier1: IgcNumberFormatSpecifierComponent[] | null = null;
    public get numberFormatSpecifier1(): IgcNumberFormatSpecifierComponent[] {
        if (this._numberFormatSpecifier1 == null)
        {
            let numberFormatSpecifier1: IgcNumberFormatSpecifierComponent[] = [];
            var numberFormatSpecifier2 = new IgcNumberFormatSpecifierComponent();
            numberFormatSpecifier2.currency = "EUR";
            numberFormatSpecifier2.style = "currency";
            numberFormatSpecifier2.locale = "en-GB";
            numberFormatSpecifier2.minimumFractionDigits = 0;

            numberFormatSpecifier1.push(numberFormatSpecifier2)
            this._numberFormatSpecifier1 = numberFormatSpecifier1;
        }
        return this._numberFormatSpecifier1;
    }
    private _dateTimeFormatSpecifier1: IgcDateTimeFormatSpecifierComponent[] | null = null;
    public get dateTimeFormatSpecifier1(): IgcDateTimeFormatSpecifierComponent[] {
        if (this._dateTimeFormatSpecifier1 == null)
        {
            let dateTimeFormatSpecifier1: IgcDateTimeFormatSpecifierComponent[] = [];
            var dateTimeFormatSpecifier2 = new IgcDateTimeFormatSpecifierComponent();
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
