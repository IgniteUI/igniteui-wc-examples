import { IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { EnergyRenewableConsumptionItem, EnergyRenewableConsumption } from './EnergyRenewableConsumption';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            chart.dataSource = this.energyRenewableConsumption;
            chart.legend = this.legend;
        }
        this._bind();

    }

    private _energyRenewableConsumption: EnergyRenewableConsumption = null;
    public get energyRenewableConsumption(): EnergyRenewableConsumption {
        if (this._energyRenewableConsumption == null)
        {
            this._energyRenewableConsumption = new EnergyRenewableConsumption();
        }
        return this._energyRenewableConsumption;
    }

}

new Sample();
