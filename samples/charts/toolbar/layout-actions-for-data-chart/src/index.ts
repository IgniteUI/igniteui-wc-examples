import { IgcToolbarModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartToolbarModule, IgcNumberAbbreviatorModule, IgcDataChartCategoryModule, IgcDataChartCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcToolbarComponent, IgcToolActionLabelComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcToolbarModule,
    IgcDataChartToolbarModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCategoryModule,
    IgcDataChartCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private toolbar: IgcToolbarComponent
    private toolActionLabel1: IgcToolActionLabelComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private lineSeries1: IgcLineSeriesComponent
    private lineSeries2: IgcLineSeriesComponent
    private lineSeries3: IgcLineSeriesComponent
    private _bind: () => void;

    constructor() {
        var toolbar = this.toolbar = document.getElementById('Toolbar') as IgcToolbarComponent;
        var toolActionLabel1 = this.toolActionLabel1 = document.getElementById('toolActionLabel1') as IgcToolActionLabelComponent;
        this.myCustomAction = this.myCustomAction.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = this.lineSeries1 = document.getElementById('LineSeries1') as IgcLineSeriesComponent;
        var lineSeries2 = this.lineSeries2 = document.getElementById('LineSeries2') as IgcLineSeriesComponent;
        var lineSeries3 = this.lineSeries3 = document.getElementById('LineSeries3') as IgcLineSeriesComponent;

        this._bind = () => {
            toolbar.target = this.chart;
            toolActionLabel1.onCommand = this.myCustomAction;
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
