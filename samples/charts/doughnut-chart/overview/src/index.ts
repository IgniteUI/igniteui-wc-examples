import { IgcLegendModule, IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent, IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { CompanyMarketSharesItem, CompanyMarketShares } from './CompanyMarketShares';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDoughnutChartModule
);

export class Sample {

    private chart: IgcDoughnutChartComponent
    private series: IgcRingSeriesComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDoughnutChartComponent;
        var series = this.series = document.getElementById('series') as IgcRingSeriesComponent;

        this._bind = () => {
            series.dataSource = this.companyMarketShares
        }
        this._bind();

    }

    private _companyMarketShares: CompanyMarketShares = null;
    public get companyMarketShares(): CompanyMarketShares {
        if (this._companyMarketShares == null)
        {
            this._companyMarketShares = new CompanyMarketShares();
        }
        return this._companyMarketShares;
    }

}

new Sample();
