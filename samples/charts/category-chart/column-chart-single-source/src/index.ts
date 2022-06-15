import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { TemperatureAverageDataItem, TemperatureAverageData } from './TemperatureAverageData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcCategoryChartModule
);

export class Sample {

    private chart: IgcCategoryChartComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            chart.dataSource = this.temperatureAverageData
        }
        this._bind();
    }

    private _temperatureAverageData: TemperatureAverageData = null;
    public get temperatureAverageData(): TemperatureAverageData {
        if (this._temperatureAverageData == null)
        {
            this._temperatureAverageData = new TemperatureAverageData();
        }
        return this._temperatureAverageData;
    }
    



}

new Sample();
