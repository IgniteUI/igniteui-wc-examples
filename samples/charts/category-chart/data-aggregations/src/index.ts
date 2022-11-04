import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, LegendDescriptionModule, CategoryChartDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcCategoryChartComponent, IgcChartSortDescription, IgcChartSummaryDescriptionModule } from 'igniteui-webcomponents-charts';
import { SalesData } from './SalesData';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule,
    IgcChartSortDescription,
    IgcChartSummaryDescriptionModule

);

export class Sample {

    private chart: IgcCategoryChartComponent

    private _bind: () => void;

    constructor() {
        //insert onInit
        //end onInit
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            chart.dataSource = this.salesData
        }
        this._bind();

        //insert onViewInit
        //end onViewInit
    }

    private _salesData: SalesData = null;
    public get salesData(): SalesData {
        if (this._salesData == null)
        {
            this._salesData = new SalesData();
        }
        return this._salesData;
    }
    

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            LegendDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }


}

new Sample();
