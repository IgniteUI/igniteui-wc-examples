import { IgcDashboardTileModule, IgcDataChartDashboardTileModule, IgcGeographicMapDashboardTileModule, IgcLinearGaugeDashboardTileModule, IgcPieChartDashboardTileModule, IgcRadialGaugeDashboardTileModule } from 'igniteui-webcomponents-dashboards';
import { IgcDashboardTileComponent } from 'igniteui-webcomponents-dashboards';
import { RetailSalesPerformanceLocalDataSource } from './RetailSalesPerformanceLocalDataSource';

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
            dashboard.dataSource = this.retailSalesPerformanceLocalDataSource;
        }
        this._bind();

    }

    private _retailSalesPerformanceLocalDataSource: RetailSalesPerformanceLocalDataSource = null;
    public get retailSalesPerformanceLocalDataSource(): RetailSalesPerformanceLocalDataSource {
        if (this._retailSalesPerformanceLocalDataSource == null)
        {
            this._retailSalesPerformanceLocalDataSource = new RetailSalesPerformanceLocalDataSource();
        }
        return this._retailSalesPerformanceLocalDataSource;
    }

}

export function initialize() {
  return new Sample();
}