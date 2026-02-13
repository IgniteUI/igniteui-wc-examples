import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataPieChartModule, IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataPieChartDescriptionModule, ItemLegendDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcItemLegendComponent, IgcDataPieChartComponent } from 'igniteui-webcomponents-charts';
import { EnergyGlobalDemandItem, EnergyGlobalDemand } from './EnergyGlobalDemand';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataPieChartModule,
    IgcItemLegendModule
);

export class Sample {

    private legend: IgcItemLegendComponent
    private chart: IgcDataPieChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataPieChartComponent;

        this._bind = () => {
            chart.dataSource = this.energyGlobalDemand;
            chart.legend = this.legend;
        }
        this._bind();

    }

    private _energyGlobalDemand: EnergyGlobalDemand = null;
    public get energyGlobalDemand(): EnergyGlobalDemand {
        if (this._energyGlobalDemand == null)
        {
            this._energyGlobalDemand = new EnergyGlobalDemand();
        }
        return this._energyGlobalDemand;
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

export function initialize() {
  return new Sample();
}