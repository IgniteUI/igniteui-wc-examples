import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineMixedDataItem, SparklineMixedData } from './SparklineMixedData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcSparklineModule
);

export class Sample {

    private chart: IgcSparklineComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcSparklineComponent;

        this._bind = () => {
            chart.dataSource = this.sparklineMixedData;
        }
        this._bind();

    }

    private _sparklineMixedData: SparklineMixedData = null;
    public get sparklineMixedData(): SparklineMixedData {
        if (this._sparklineMixedData == null)
        {
            this._sparklineMixedData = new SparklineMixedData();
        }
        return this._sparklineMixedData;
    }

}

export function initialize() {
  return new Sample();
}