import { IgcDashboardTileModule, IgcDataChartDashboardTileModule, IgcGeographicMapDashboardTileModule, IgcLinearGaugeDashboardTileModule, IgcPieChartDashboardTileModule, IgcRadialGaugeDashboardTileModule } from 'igniteui-webcomponents-dashboards';
import { IgcDashboardTileComponent } from 'igniteui-webcomponents-dashboards';
import { EnergyGlobalDemandItem, EnergyGlobalDemand } from './EnergyGlobalDemand';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDashboardTileModule,
    IgcDataChartDashboardTileModule,
    IgcGeographicMapDashboardTileModule,
    IgcLinearGaugeDashboardTileModule,
    IgcPieChartDashboardTileModule,
    IgcRadialGaugeDashboardTileModule
);

export class Sample {

    private dashboard: IgcDashboardTileComponent
    private _bind: () => void;

    constructor() {
        var dashboard = this.dashboard = document.getElementById('dashboard') as IgcDashboardTileComponent;

        this._bind = () => {
            dashboard.dataSource = this.energyGlobalDemand;
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

export function initialize() {
  return new Sample();
}