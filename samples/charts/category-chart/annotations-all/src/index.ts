import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { TemperatureAnnotatedDataItem, TemperatureAnnotatedData } from './TemperatureAnnotatedData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcCategoryChartModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private crosshairsDisplayModeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private highlightingModeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private calloutsVisibleEditor: IgcPropertyEditorPropertyDescriptionComponent
    private finalValueAnnotationsEditor: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var crosshairsDisplayModeEditor = this.crosshairsDisplayModeEditor = document.getElementById('CrosshairsDisplayModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var highlightingModeEditor = this.highlightingModeEditor = document.getElementById('HighlightingModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var calloutsVisibleEditor = this.calloutsVisibleEditor = document.getElementById('CalloutsVisibleEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var finalValueAnnotationsEditor = this.finalValueAnnotationsEditor = document.getElementById('FinalValueAnnotationsEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.chart
            chart.dataSource = this.temperatureAnnotatedData
            chart.calloutsDataSource = this.temperatureAnnotatedData
        }
        this._bind();

    }

    private _temperatureAnnotatedData: TemperatureAnnotatedData = null;
    public get temperatureAnnotatedData(): TemperatureAnnotatedData {
        if (this._temperatureAnnotatedData == null)
        {
            this._temperatureAnnotatedData = new TemperatureAnnotatedData();
        }
        return this._temperatureAnnotatedData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
