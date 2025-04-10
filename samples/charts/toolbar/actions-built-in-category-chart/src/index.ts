import { IgcLegendModule, IgcCategoryChartModule, IgcCategoryChartToolbarModule } from 'igniteui-webcomponents-charts';
import { IgcToolbarModule } from 'igniteui-webcomponents-layouts';
import { IgcCheckboxListModule } from 'igniteui-webcomponents-grids';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { IgcToolbarComponent } from 'igniteui-webcomponents-layouts';
import { CountryRenewableElectricityItem, CountryRenewableElectricity } from './CountryRenewableElectricity';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcToolbarModule,
    IgcCategoryChartModule,
    IgcCategoryChartToolbarModule,
    IgcCheckboxListModule
);

export class Sample {

    private legend: IgcLegendComponent
    private toolbar: IgcToolbarComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var toolbar = this.toolbar = document.getElementById('toolbar') as IgcToolbarComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            toolbar.target = this.chart;
            chart.dataSource = this.countryRenewableElectricity;
            chart.legend = this.legend;
        }
        this._bind();

    }

    private _countryRenewableElectricity: CountryRenewableElectricity = null;
    public get countryRenewableElectricity(): CountryRenewableElectricity {
        if (this._countryRenewableElectricity == null)
        {
            this._countryRenewableElectricity = new CountryRenewableElectricity();
        }
        return this._countryRenewableElectricity;
    }

}

new Sample();
