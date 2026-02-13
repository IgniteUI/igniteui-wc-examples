import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, TreemapDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';
import { CountryTopUrbanPopDataItem, CountryTopUrbanPopData } from './CountryTopUrbanPopData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcTreemapModule
);

export class Sample {

    private treemap: IgcTreemapComponent
    private _bind: () => void;

    constructor() {
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;

        this._bind = () => {
            treemap.dataSource = this.countryTopUrbanPopData;
        }
        this._bind();

    }

    private _countryTopUrbanPopData: CountryTopUrbanPopData = null;
    public get countryTopUrbanPopData(): CountryTopUrbanPopData {
        if (this._countryTopUrbanPopData == null)
        {
            this._countryTopUrbanPopData = new CountryTopUrbanPopData();
        }
        return this._countryTopUrbanPopData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            TreemapDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

export function initialize() {
  return new Sample();
}