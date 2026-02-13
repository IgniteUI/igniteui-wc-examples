import { IgcToolbarModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartToolbarModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule, IgcDataChartCategoryTrendLineModule } from 'igniteui-webcomponents-charts';
import { IgcToolbarComponent, IgcToolActionIconMenuComponent, IgcToolActionGroupHeaderComponent, IgcToolActionSubPanelComponent, IgcToolActionCheckboxComponent, IgcToolActionLabelComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';
import { IgcToolCommandEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcSeriesComponent, IgcDataToolTipLayerComponent, IgcCrosshairLayerComponent, IgcFinalValueLayerComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcToolbarModule,
    IgcDataChartToolbarModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcDataChartCategoryTrendLineModule
);

export class Sample {

    private toolbar: IgcToolbarComponent
    private menuForSubPanelTool: IgcToolActionIconMenuComponent
    private subPanelGroup: IgcToolActionGroupHeaderComponent
    private customSubPanelTools: IgcToolActionSubPanelComponent
    private enableTooltipsLabel: IgcToolActionCheckboxComponent
    private enableCrosshairsLabel: IgcToolActionCheckboxComponent
    private enableFinalValuesLabel: IgcToolActionCheckboxComponent
    private zoomResetLabel: IgcToolActionLabelComponent
    private zoomResetHidden: IgcToolActionLabelComponent
    private analyzeMenu: IgcToolActionIconMenuComponent
    private copyMenu: IgcToolActionLabelComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private lineSeries1: IgcLineSeriesComponent
    private lineSeries2: IgcLineSeriesComponent
    private lineSeries3: IgcLineSeriesComponent
    private _bind: () => void;

    constructor() {
        var toolbar = this.toolbar = document.getElementById('toolbar') as IgcToolbarComponent;
        this.toolbarToggleAnnotations = this.toolbarToggleAnnotations.bind(this);
        var menuForSubPanelTool = this.menuForSubPanelTool = document.getElementById('MenuForSubPanelTool') as IgcToolActionIconMenuComponent;
        var subPanelGroup = this.subPanelGroup = document.getElementById('SubPanelGroup') as IgcToolActionGroupHeaderComponent;
        var customSubPanelTools = this.customSubPanelTools = document.getElementById('CustomSubPanelTools') as IgcToolActionSubPanelComponent;
        var enableTooltipsLabel = this.enableTooltipsLabel = document.getElementById('EnableTooltipsLabel') as IgcToolActionCheckboxComponent;
        var enableCrosshairsLabel = this.enableCrosshairsLabel = document.getElementById('EnableCrosshairsLabel') as IgcToolActionCheckboxComponent;
        var enableFinalValuesLabel = this.enableFinalValuesLabel = document.getElementById('EnableFinalValuesLabel') as IgcToolActionCheckboxComponent;
        var zoomResetLabel = this.zoomResetLabel = document.getElementById('zoomResetLabel') as IgcToolActionLabelComponent;
        var zoomResetHidden = this.zoomResetHidden = document.getElementById('zoomResetHidden') as IgcToolActionLabelComponent;
        var analyzeMenu = this.analyzeMenu = document.getElementById('AnalyzeMenu') as IgcToolActionIconMenuComponent;
        var copyMenu = this.copyMenu = document.getElementById('CopyMenu') as IgcToolActionLabelComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = this.lineSeries1 = document.getElementById('lineSeries1') as IgcLineSeriesComponent;
        var lineSeries2 = this.lineSeries2 = document.getElementById('LineSeries2') as IgcLineSeriesComponent;
        var lineSeries3 = this.lineSeries3 = document.getElementById('LineSeries3') as IgcLineSeriesComponent;

        this._bind = () => {
            toolbar.target = this.chart;
            toolbar.onCommand = this.toolbarToggleAnnotations;
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


    public toolbarToggleAnnotations(sender: any, args: IgcToolCommandEventArgs): void {
        var target = this.chart;
        switch (args.command.commandId)
    	{
    		case "EnableTooltips":
    			var enable = args.command.argumentsList[0].value as boolean;
    			if (enable)
    			{
    				target.series.add(new IgcDataToolTipLayerComponent());
    			}
    			else
    			{
    				var toRemove = null;
    				for (var i = 0; i < target.actualSeries.length; i++) {
                        let s = target.actualSeries[i] as IgcSeriesComponent;
    					if (s instanceof IgcDataToolTipLayerComponent)
    					{
    						toRemove = s;
    					}
    				}
    				if (toRemove != null)
    				{
    					target.series.remove(toRemove);
    				}
    			}
    			break;
    		case "EnableCrosshairs":
    			var enable = args.command.argumentsList[0].value as boolean;
    			if (enable)
    			{
    				target.series.add(new IgcCrosshairLayerComponent());
    			}
    			else
    			{
    				var toRemove = null;
    				for (var i = 0; i < target.actualSeries.length; i++) {
    					let s = target.actualSeries[i] as IgcSeriesComponent;
    					if (s instanceof IgcCrosshairLayerComponent)
    					{
    						toRemove = s;
    					}
    				}
    				if (toRemove != null)
    				{
    					target.series.remove(toRemove);
    				}
    			}
    			break;
    		case "EnableFinalValues":
    			var enable = args.command.argumentsList[0].value as boolean;
    			if (enable)
    			{
    				target.series.add(new IgcFinalValueLayerComponent());
    			}
    			else
    			{
    				var toRemove = null;
    				for (var i = 0; i < target.actualSeries.length; i++) {
    					let s = target.actualSeries[i] as IgcSeriesComponent;
    					if (s instanceof IgcFinalValueLayerComponent)
    					{
    						toRemove = s;
    					}
    				}
    				if (toRemove != null)
    				{
    					target.series.remove(toRemove);
    				}
    			}
    			break;
    	}
    }

}

export function initialize() {
  return new Sample();
}