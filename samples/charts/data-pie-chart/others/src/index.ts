import { LocalDataItem, LocalData } from './SampleData';
import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataPieChartModule, IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataPieChartDescriptionModule, ItemLegendDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataPieChartComponent } from 'igniteui-webcomponents-charts';

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
    private chart: IgcDataPieChartComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataPieChartComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.chart;
            chart.dataSource = this.localData;
        }
        this._bind();

    }

    private _localData: LocalData = null;
    public get localData(): LocalData {
        if (this._localData == null)
        {
            this._localData = new LocalData();
        }
        return this._localData;
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

new Sample();
