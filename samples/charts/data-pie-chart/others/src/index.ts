import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataPieChartModule, IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataPieChartDescriptionModule, ItemLegendDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataPieChartComponent } from 'igniteui-webcomponents-charts';
import { DataPieDataItem, DataPieData } from './DataPieData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataPieChartModule,
    IgcItemLegendModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private othersCategoryTypeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private othersCategoryThresholdEditor: IgcPropertyEditorPropertyDescriptionComponent
    private othersCategoryTextEditor: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcDataPieChartComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var othersCategoryTypeEditor = this.othersCategoryTypeEditor = document.getElementById('OthersCategoryTypeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var othersCategoryThresholdEditor = this.othersCategoryThresholdEditor = document.getElementById('OthersCategoryThresholdEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var othersCategoryTextEditor = this.othersCategoryTextEditor = document.getElementById('OthersCategoryTextEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataPieChartComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.chart;
            chart.dataSource = this.dataPieData;
        }
        this._bind();

    }

    private _dataPieData: DataPieData = null;
    public get dataPieData(): DataPieData {
        if (this._dataPieData == null)
        {
            this._dataPieData = new DataPieData();
        }
        return this._dataPieData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            DataPieChartDescriptionModule.register(context);
            ItemLegendDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}