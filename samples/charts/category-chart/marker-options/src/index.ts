import { DataItem, Data } from './SampleData';
import { IgcPropertyEditorModule } from 'igniteui-webcomponents-grids';
import { IgcCategoryChartModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorDescriptionModule, CategoryChartDescriptionModule, DataChartInteractivityDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-grids';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-grids';
import { MarkerType, MarkerType_$type } from 'igniteui-webcomponents-charts';
import { EnumUtil } from 'igniteui-webcomponents-core';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorModule,
    IgcCategoryChartModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorComponent
    private chartTypeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private markerTypeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcCategoryChartComponent

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorComponent;
        var chartTypeEditor = this.chartTypeEditor = document.getElementById('ChartTypeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var markerTypeEditor = this.markerTypeEditor = document.getElementById('MarkerTypeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateMarkerType = this.editorChangeUpdateMarkerType.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        propertyEditor.componentRenderer = this.renderer
        propertyEditor.target = this.chart
        markerTypeEditor.changed = this.editorChangeUpdateMarkerType
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
            DataChartInteractivityDescriptionModule.register(context);
        }
        return this._componentRenderer
    }

    
    public editorChangeUpdateMarkerType(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var item = sender as IgcPropertyEditorPropertyDescriptionComponent;
        var chart = this.chart;
            
        var markerVal = item.primitiveValue;
        chart.markerTypes = markerVal;   
    }
        

}

new Sample();
