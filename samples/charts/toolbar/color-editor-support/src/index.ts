import { IgcXIconModule } from 'igniteui-webcomponents-inputs';
import { IgcToolbarModule, IgcToolActionComboModule, IgcToolActionColorEditorModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartToolbarModule, IgcDataLegendModule, IgcNumberAbbreviatorModule, IgcDataChartCategoryModule, IgcDataChartCoreModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcToolbarComponent, IgcToolActionColorEditorComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';
import { IgcToolCommandEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcXIconModule,
    IgcToolbarModule,
    IgcToolActionComboModule,
    IgcToolActionColorEditorModule,
    IgcDataChartToolbarModule,
    IgcDataLegendModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartCategoryModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private toolbar: IgcToolbarComponent
    private colorEditorTool: IgcToolActionColorEditorComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private lineSeries1: IgcLineSeriesComponent
    private _bind: () => void;

    constructor() {
        var toolbar = this.toolbar = document.getElementById('toolbar') as IgcToolbarComponent;
        this.colorEditorToggleSeriesBrush = this.colorEditorToggleSeriesBrush.bind(this);
        var colorEditorTool = this.colorEditorTool = document.getElementById('colorEditorTool') as IgcToolActionColorEditorComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = this.lineSeries1 = document.getElementById('lineSeries1') as IgcLineSeriesComponent;

        this._bind = () => {
            toolbar.target = this.chart;
            toolbar.onCommand = this.colorEditorToggleSeriesBrush;
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


    public colorEditorToggleSeriesBrush(sender: any, args: IgcToolCommandEventArgs): void {
        var target = this.chart;
        var color = args.command.argumentsList[0].value;

    	switch (args.command.commandId)
    	{
            case "ToggleSeriesBrush":
                let series = target.contentSeries[0] as IgcSeriesComponent;
                series.brush = color as any;
            break;
        }

    }

}

new Sample();
