import { IgcDashboardTileModule, IgcDataChartDashboardTileModule, IgcGeographicMapDashboardTileModule, IgcLinearGaugeDashboardTileModule, IgcPieChartDashboardTileModule, IgcRadialGaugeDashboardTileModule } from 'igniteui-webcomponents-dashboards';
import { IgcDashboardTileComponent } from 'igniteui-webcomponents-dashboards';
import { WorldCitiesItem, WorldCities } from './WorldCities';

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
            dashboard.dataSource = this.worldCities;
        }
        this._bind();

    }

    private _worldCities: WorldCities = null;
    public get worldCities(): WorldCities {
        if (this._worldCities == null)
        {
            this._worldCities = new WorldCities();
        }
        return this._worldCities;
    }

}

export function initialize() {
  return new Sample();
}