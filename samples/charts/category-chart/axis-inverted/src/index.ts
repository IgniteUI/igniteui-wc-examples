import { DataItem, Data } from './SampleData';
import { IgcPropertyEditorModule } from 'igniteui-webcomponents-grids';
import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorComponent } from 'igniteui-webcomponents-grids';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorDescriptionModule, CategoryChartDescriptionModule } from "igniteui-webcomponents-core";

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorModule,
    IgcCategoryChartModule
);

export class Sample {

    private chart: IgcCategoryChartComponent
    private propertyEditor: IgcPropertyEditorComponent

    constructor() {
        var chart = (this.chart = document.getElementById("chart") as IgcCategoryChartComponent);
        var propertyEditor = (this.propertyEditor = document.querySelector("igc-property-editor") as IgcPropertyEditorComponent);

        propertyEditor.componentRenderer = this.renderer;
        propertyEditor.target = this.chart;
        chart.dataSource = this.data
    }

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }
    
    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }


}

new Sample();
