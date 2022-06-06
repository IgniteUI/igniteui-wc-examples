import { IgcLegendModule, IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent, IgcDoughnutChartComponent, IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { EnergyGlobalDemandItem, EnergyGlobalDemand } from './EnergyGlobalDemand';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDoughnutChartModule
);

export class Sample {

    private legend: IgcItemLegendComponent
    private chart: IgcDoughnutChartComponent
    private series: IgcRingSeriesComponent

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        var series = this.series = document.getElementById('series') as IgcRingSeriesComponent;

        this._bind = () => {
            series.dataSource = this.energyGlobalDemand
            series.legend = this.legend
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
    



}

new Sample();
