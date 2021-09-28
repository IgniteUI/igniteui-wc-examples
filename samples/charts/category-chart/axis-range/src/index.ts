import { DataItem, Data } from './SampleData';
import { IgcPropertyEditorModule } from 'igniteui-webcomponents-grids';
import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorDescriptionModule, LegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-grids';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorModule,
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcLegendComponent
    private propertyEditor: IgcPropertyEditorComponent
    private propertyEditorPropertyDescription: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var propertyEditor = this.propertyEditor = document.querySelector('igc-property-editor') as IgcPropertyEditorComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        propertyEditor.componentRenderer = this.renderer
        propertyEditor.target = this.chart
        chart.dataSource = this.data
        chart.legend = this.legend
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
            LegendDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer
    }


}

new Sample();
