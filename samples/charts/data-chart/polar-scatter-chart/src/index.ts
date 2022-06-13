import { IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { BoatSailingDataItem, BoatSailingData } from './BoatSailingData';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private angleAxis: IgcNumericAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private polarScatterSeries1: IgcPolarScatterSeriesComponent
    private polarScatterSeries2: IgcPolarScatterSeriesComponent

    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarScatterSeries1 = this.polarScatterSeries1 = document.getElementById('PolarScatterSeries1') as IgcPolarScatterSeriesComponent;
        var polarScatterSeries2 = this.polarScatterSeries2 = document.getElementById('PolarScatterSeries2') as IgcPolarScatterSeriesComponent;

        this._bind = () => {
            polarScatterSeries1.angleAxis = this.angleAxis
            polarScatterSeries1.radiusAxis = this.radiusAxis
            polarScatterSeries1.dataSource = this.boatSailingData
            polarScatterSeries2.dataSource = this.boatSailingData
            polarScatterSeries2.angleAxis = this.angleAxis
            polarScatterSeries2.radiusAxis = this.radiusAxis
        }
        this._bind();
    }

    private _boatSailingData: BoatSailingData = null;
    public get boatSailingData(): BoatSailingData {
        if (this._boatSailingData == null)
        {
            this._boatSailingData = new BoatSailingData();
        }
        return this._boatSailingData;
    }
    



}

new Sample();
