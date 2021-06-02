import { DataItem, Data } from './SampleData';

import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDomainChartComponent } from 'igniteui-webcomponents-charts';
import { IgcChartSeriesEventArgs } from 'igniteui-webcomponents-charts';
import { ToolTipType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcCategoryChartComponent

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        chart.dataSource = this.data
        chart.legend = this.legend
        chart.seriesAdded = this.onSeriesAdded;
        this.onToolTipTypeChanged = this.onToolTipTypeChanged.bind(this);
        let toolTipSelect = document.getElementById('toolTipSelect');
        toolTipSelect!.addEventListener('change', this.onToolTipTypeChanged);
   }

   public onToolTipTypeChanged = (e: any) => {
    let value = e.target.value;

    switch (value) {
        case 'Default': {
            this.chart.toolTipType = ToolTipType.Default;
            break;
        }
        case 'Item': {
            this.chart.toolTipType = ToolTipType.Item;
            break;
        }
        case 'Category': {
            this.chart.toolTipType = ToolTipType.Category;
            break;
        }
    }
}

public onSeriesAdded = (s: IgcDomainChartComponent, e: IgcChartSeriesEventArgs) => {
    if (e.series.isAnnotationLayer) {
        e.series.transitionDuration = 100;
    }
}

    private _data: Data = null;
    public get data(): Data {
        if (this._data == null)
        {
            this._data = new Data();
        }
        return this._data;
    }
    
}

new Sample();
