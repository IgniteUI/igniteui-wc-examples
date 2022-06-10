import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCategoryModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCategoryDescriptionModule, DataChartInteractivityDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { TemperatureAverageDataItem, TemperatureAverageData } from './TemperatureAverageData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();
ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private colSeries1: IgcColumnSeriesComponent

    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var colSeries1 = this.colSeries1 = document.getElementById('colSeries1') as IgcColumnSeriesComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer
            propertyEditorPanel1.target = this.chart
            xAxis.dataSource = this.temperatureAverageData
            colSeries1.xAxis = this.xAxis
            colSeries1.yAxis = this.yAxis
            colSeries1.dataSource = this.temperatureAverageData
        }
        this._bind();
    }

    private _temperatureAverageData: TemperatureAverageData = null;
    public get temperatureAverageData(): TemperatureAverageData {
        if (this._temperatureAverageData == null)
        {
            this._temperatureAverageData = new TemperatureAverageData();
        }
        return this._temperatureAverageData;
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
        return this._componentRenderer
    }


}

new Sample();
