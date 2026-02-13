import { IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataChartCategoryTrendLineModule, IgcTrendLineLayerModule, IgcDataLegendModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule, DataChartCategoryTrendLineDescriptionModule, TrendLineLayerDescriptionModule, DataLegendDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataLegendComponent, IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent, IgcTrendLineLayerComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcDataChartCategoryTrendLineModule,
    IgcTrendLineLayerModule,
    IgcDataLegendModule
);

export class Sample {

    private legend: IgcDataLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private lineSeries1: IgcLineSeriesComponent
    private trendLine1: IgcTrendLineLayerComponent
    private trendLine2: IgcTrendLineLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcDataLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = this.lineSeries1 = document.getElementById('lineSeries1') as IgcLineSeriesComponent;
        var trendLine1 = this.trendLine1 = document.getElementById('trendLine1') as IgcTrendLineLayerComponent;
        var trendLine2 = this.trendLine2 = document.getElementById('trendLine2') as IgcTrendLineLayerComponent;

        this._bind = () => {
            legend.target = this.chart;
            xAxis.dataSource = this.countryRenewableElectricity;
            lineSeries1.xAxis = this.xAxis;
            lineSeries1.yAxis = this.yAxis;
            lineSeries1.dataSource = this.countryRenewableElectricity;
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            DataChartCategoryDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
            DataChartCategoryTrendLineDescriptionModule.register(context);
            TrendLineLayerDescriptionModule.register(context);
            DataLegendDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}