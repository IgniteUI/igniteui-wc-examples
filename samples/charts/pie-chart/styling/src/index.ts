import { IgcPieChartModule, IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent, IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { EnergyGlobalDemandItem, EnergyGlobalDemand } from './EnergyGlobalDemand';
import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";


ModuleManager.register(
    IgcPieChartModule,
    IgcItemLegendModule
);

export class Sample {

    private legend: IgcItemLegendComponent
    private chart: IgcPieChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcPieChartComponent;

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

}

new Sample();
