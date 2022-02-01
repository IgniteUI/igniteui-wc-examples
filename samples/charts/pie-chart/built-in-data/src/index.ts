import { IgcItemLegendModule, IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent, IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { CompanyMarketSharesItem, CompanyMarketShares } from './CompanyMarketShares';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcItemLegendModule,
    IgcPieChartModule
);

export class Sample {

    private legend: IgcItemLegendComponent
    private chart: IgcPieChartComponent

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcItemLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcPieChartComponent;

        chart.dataSource = this.companyMarketShares
        chart.legend = this.legend
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
