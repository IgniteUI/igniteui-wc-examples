import { IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule, IgcAnnotationLayerProxyModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent, IgcCalloutLayerComponent, IgcFinalValueLayerComponent, IgcCrosshairLayerComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';
import { CountryRenewableCalloutsItem, CountryRenewableCallouts } from './CountryRenewableCallouts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";


ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcAnnotationLayerProxyModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private lineSeries1: IgcLineSeriesComponent
    private calloutLayer1: IgcCalloutLayerComponent
    private finalValueLayer: IgcFinalValueLayerComponent
    private crosshairLayer: IgcCrosshairLayerComponent
    private tooltips: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = this.lineSeries1 = document.getElementById('lineSeries1') as IgcLineSeriesComponent;
        var calloutLayer1 = this.calloutLayer1 = document.getElementById('CalloutLayer1') as IgcCalloutLayerComponent;
        var finalValueLayer = this.finalValueLayer = document.getElementById('FinalValueLayer') as IgcFinalValueLayerComponent;
        var crosshairLayer = this.crosshairLayer = document.getElementById('CrosshairLayer') as IgcCrosshairLayerComponent;
        var tooltips = this.tooltips = document.getElementById('Tooltips') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            xAxis.dataSource = this.countryRenewableElectricity;
            lineSeries1.xAxis = this.xAxis;
            lineSeries1.yAxis = this.yAxis;
            lineSeries1.dataSource = this.countryRenewableElectricity;
            calloutLayer1.dataSource = this.countryRenewableCallouts;
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

    private _countryRenewableCallouts: CountryRenewableCallouts = null;
    public get countryRenewableCallouts(): CountryRenewableCallouts {
        if (this._countryRenewableCallouts == null)
        {
            this._countryRenewableCallouts = new CountryRenewableCallouts();
        }
        return this._countryRenewableCallouts;
    }

}

new Sample();
