import { IgcDashboardTileModule, IgcDataChartDashboardTileModule, IgcGeographicMapDashboardTileModule, IgcLinearGaugeDashboardTileModule, IgcPieChartDashboardTileModule, IgcRadialGaugeDashboardTileModule } from 'igniteui-webcomponents-dashboards';
import { IgcDashboardTileComponent } from 'igniteui-webcomponents-dashboards';
import { OlympicMedalsTopCountriesItem, OlympicMedalsTopCountries } from './OlympicMedalsTopCountries';

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
            dashboard.dataSource = this.olympicMedalsTopCountries;
        }
        this._bind();

    }

    private _olympicMedalsTopCountries: OlympicMedalsTopCountries = null;
    public get olympicMedalsTopCountries(): OlympicMedalsTopCountries {
        if (this._olympicMedalsTopCountries == null)
        {
            this._olympicMedalsTopCountries = new OlympicMedalsTopCountries();
        }
        return this._olympicMedalsTopCountries;
    }

}

export function initialize() {
  return new Sample();
}