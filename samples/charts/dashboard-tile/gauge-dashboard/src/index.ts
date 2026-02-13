import { IgcDashboardTileModule, IgcDataChartDashboardTileModule, IgcGeographicMapDashboardTileModule, IgcLinearGaugeDashboardTileModule, IgcPieChartDashboardTileModule, IgcRadialGaugeDashboardTileModule } from 'igniteui-webcomponents-dashboards';
import { IgcDashboardTileComponent } from 'igniteui-webcomponents-dashboards';
import { DashboardGaugeDataSourceItem, DashboardGaugeDataSource } from './DashboardGaugeDataSource';

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
            dashboard.dataSource = this.dashboardGaugeDataSource;
        }
        this._bind();

    }

    private _dashboardGaugeDataSource: DashboardGaugeDataSource = null;
    public get dashboardGaugeDataSource(): DashboardGaugeDataSource {
        if (this._dashboardGaugeDataSource == null)
        {
            this._dashboardGaugeDataSource = new DashboardGaugeDataSource();
        }
        return this._dashboardGaugeDataSource;
    }

}

export function initialize() {
  return new Sample();
}