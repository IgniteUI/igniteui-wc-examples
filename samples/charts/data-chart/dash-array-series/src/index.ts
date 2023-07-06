import { IgcLegendModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private lineSeries1: IgcLineSeriesComponent
    private lineSeries2: IgcLineSeriesComponent
    private lineSeries3: IgcLineSeriesComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = this.lineSeries1 = document.getElementById('LineSeries1') as IgcLineSeriesComponent;
        var lineSeries2 = this.lineSeries2 = document.getElementById('LineSeries2') as IgcLineSeriesComponent;
        var lineSeries3 = this.lineSeries3 = document.getElementById('LineSeries3') as IgcLineSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend;
            xAxis.dataSource = this.countryRenewableElectricity;
            lineSeries1.xAxis = this.xAxis;
            lineSeries1.yAxis = this.yAxis;
            lineSeries1.dataSource = this.countryRenewableElectricity;
            lineSeries2.xAxis = this.xAxis;
            lineSeries2.yAxis = this.yAxis;
            lineSeries2.dataSource = this.countryRenewableElectricity;
            lineSeries3.xAxis = this.xAxis;
            lineSeries3.yAxis = this.yAxis;
            lineSeries3.dataSource = this.countryRenewableElectricity;
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

new Sample();
