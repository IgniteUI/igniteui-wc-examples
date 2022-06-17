import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCategoryModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { TemperatureAverageDataLongLabelsItem, TemperatureAverageDataLongLabels } from './TemperatureAverageDataLongLabels';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private shouldConsiderAutoRotationForInitialLabels: IgcPropertyEditorPropertyDescriptionComponent
    private autoMarginAndAngleUpdateMode: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private colSeries1: IgcColumnSeriesComponent

    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var shouldConsiderAutoRotationForInitialLabels = this.shouldConsiderAutoRotationForInitialLabels = document.getElementById('ShouldConsiderAutoRotationForInitialLabels') as IgcPropertyEditorPropertyDescriptionComponent;
        var autoMarginAndAngleUpdateMode = this.autoMarginAndAngleUpdateMode = document.getElementById('AutoMarginAndAngleUpdateMode') as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var colSeries1 = this.colSeries1 = document.getElementById('colSeries1') as IgcColumnSeriesComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer
            propertyEditorPanel1.target = this.chart
            xAxis.dataSource = this.temperatureAverageDataLongLabels
            colSeries1.xAxis = this.xAxis
            colSeries1.yAxis = this.yAxis
            colSeries1.dataSource = this.temperatureAverageDataLongLabels
        }
        this._bind();
    }

    private _temperatureAverageDataLongLabels: TemperatureAverageDataLongLabels = null;
    public get temperatureAverageDataLongLabels(): TemperatureAverageDataLongLabels {
        if (this._temperatureAverageDataLongLabels == null)
        {
            this._temperatureAverageDataLongLabels = new TemperatureAverageDataLongLabels();
        }
        return this._temperatureAverageDataLongLabels;
    }
    

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            DataChartCategoryDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }


}

new Sample();
