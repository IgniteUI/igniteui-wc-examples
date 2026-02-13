import { IgcDataChartCategoryModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';
import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";


ModuleManager.register(
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private columnSeries1: IgcColumnSeriesComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var columnSeries1 = this.columnSeries1 = document.getElementById('columnSeries1') as IgcColumnSeriesComponent;

        this._bind = () => {
            xAxis.dataSource = this.countryRenewableElectricity;
            columnSeries1.xAxis = this.xAxis;
            columnSeries1.yAxis = this.yAxis;
            columnSeries1.dataSource = this.countryRenewableElectricity;
        }
        this._bind();
    }

    private _countryRenewableElectricity: CountryRenewableElectricity = null;
    public get countryRenewableElectricity(): CountryRenewableElectricity {
        if (this._countryRenewableElectricity == null)
        {
            this._countryRenewableElectricity = new CountryRenewableElectricity();
        }
        return this._countryRenewableElectricity;
    }

}

export function initialize() {
  return new Sample();
}