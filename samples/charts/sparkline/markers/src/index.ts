import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, SparklineDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineProfitDataItem, SparklineProfitData } from './SparklineProfitData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcSparklineModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private firstMarkerVisibilityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private highMarkerVisibilityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private lowMarkerVisibilityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private negativeMarkerVisibilityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private lastMarkerVisibilityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private markerVisibilityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcSparklineComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var firstMarkerVisibilityEditor = this.firstMarkerVisibilityEditor = document.getElementById('FirstMarkerVisibilityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var highMarkerVisibilityEditor = this.highMarkerVisibilityEditor = document.getElementById('HighMarkerVisibilityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var lowMarkerVisibilityEditor = this.lowMarkerVisibilityEditor = document.getElementById('LowMarkerVisibilityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var negativeMarkerVisibilityEditor = this.negativeMarkerVisibilityEditor = document.getElementById('NegativeMarkerVisibilityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var lastMarkerVisibilityEditor = this.lastMarkerVisibilityEditor = document.getElementById('LastMarkerVisibilityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var markerVisibilityEditor = this.markerVisibilityEditor = document.getElementById('MarkerVisibilityEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart = document.getElementById('chart') as IgcSparklineComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.chart;
            chart.dataSource = this.sparklineProfitData;
        }
        this._bind();

    }

    private _sparklineProfitData: SparklineProfitData = null;
    public get sparklineProfitData(): SparklineProfitData {
        if (this._sparklineProfitData == null)
        {
            this._sparklineProfitData = new SparklineProfitData();
        }
        return this._sparklineProfitData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            SparklineDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}