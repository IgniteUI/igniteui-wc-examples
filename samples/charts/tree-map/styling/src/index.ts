import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent, IgcTreemapNodeStyleMappingComponent } from 'igniteui-webcomponents-charts';
import { CountyHierarchicalDataItem, CountyHierarchicalData } from './CountyHierarchicalData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcTreemapModule
);

export class Sample {

    private treemap: IgcTreemapComponent
    private styling1: IgcTreemapNodeStyleMappingComponent
    private styling2: IgcTreemapNodeStyleMappingComponent
    private styling3: IgcTreemapNodeStyleMappingComponent
    private styling4: IgcTreemapNodeStyleMappingComponent
    private styling5: IgcTreemapNodeStyleMappingComponent
    private styling6: IgcTreemapNodeStyleMappingComponent
    private styling7: IgcTreemapNodeStyleMappingComponent
    private styling8: IgcTreemapNodeStyleMappingComponent
    private _bind: () => void;

    constructor() {
        var treemap = this.treemap = document.getElementById('treemap') as IgcTreemapComponent;
        var styling1 = this.styling1 = document.getElementById('styling1') as IgcTreemapNodeStyleMappingComponent;
        var styling2 = this.styling2 = document.getElementById('styling2') as IgcTreemapNodeStyleMappingComponent;
        var styling3 = this.styling3 = document.getElementById('styling3') as IgcTreemapNodeStyleMappingComponent;
        var styling4 = this.styling4 = document.getElementById('styling4') as IgcTreemapNodeStyleMappingComponent;
        var styling5 = this.styling5 = document.getElementById('styling5') as IgcTreemapNodeStyleMappingComponent;
        var styling6 = this.styling6 = document.getElementById('styling6') as IgcTreemapNodeStyleMappingComponent;
        var styling7 = this.styling7 = document.getElementById('styling7') as IgcTreemapNodeStyleMappingComponent;
        var styling8 = this.styling8 = document.getElementById('styling8') as IgcTreemapNodeStyleMappingComponent;

        this._bind = () => {
            treemap.dataSource = this.countyHierarchicalData;
        }
        this._bind();

    }

    private _countyHierarchicalData: CountyHierarchicalData = null;
    public get countyHierarchicalData(): CountyHierarchicalData {
        if (this._countyHierarchicalData == null)
        {
            this._countyHierarchicalData = new CountyHierarchicalData();
        }
        return this._countyHierarchicalData;
    }

}

export function initialize() {
  return new Sample();
}