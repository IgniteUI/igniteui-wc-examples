import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, LegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { MarkerType, MarkerType_$type } from 'igniteui-webcomponents-charts';
import { EnumUtil } from 'igniteui-webcomponents-core';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';

defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcLegendComponent
    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private yAxisMinimumValue: IgcPropertyEditorPropertyDescriptionComponent
    private yAxisMaximumValue: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var yAxisMinimumValue = this.yAxisMinimumValue = document.getElementById('YAxisMinimumValue') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateYAxisMinimumValue = this.editorChangeUpdateYAxisMinimumValue.bind(this);
        var yAxisMaximumValue = this.yAxisMaximumValue = document.getElementById('YAxisMaximumValue') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateYAxisMaximumValue = this.editorChangeUpdateYAxisMaximumValue.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.chart;
            yAxisMinimumValue.changed = this.editorChangeUpdateYAxisMinimumValue;
            yAxisMaximumValue.changed = this.editorChangeUpdateYAxisMaximumValue;
            chart.dataSource = this.countryRenewableElectricity;
            chart.legend = this.legend;
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
            PropertyEditorPanelDescriptionModule.register(context);
            LegendDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public editorChangeUpdateYAxisMinimumValue(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

    	var yAxisMinimumVal = args.newValue;
        this.chart.yAxisMinimumValue = parseInt(yAxisMinimumVal);
    }

    public editorChangeUpdateYAxisMaximumValue(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {

        var yAxisMaximumVal = args.newValue;
        this.chart.yAxisMaximumValue = parseInt(yAxisMaximumVal);
    }

}

new Sample();
