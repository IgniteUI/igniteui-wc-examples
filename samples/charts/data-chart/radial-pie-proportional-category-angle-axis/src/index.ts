import { IgcDataPieChartCoreModule, IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcProportionalCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialPieSeriesComponent } from 'igniteui-webcomponents-charts';
import { RadialProportionalDataItem, RadialProportionalData } from './RadialProportionalData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataPieChartCoreModule,
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private angleAxis: IgcProportionalCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialPieSeries1: IgcRadialPieSeriesComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcProportionalCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialPieSeries1 = this.radialPieSeries1 = document.getElementById('RadialPieSeries1') as IgcRadialPieSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend;
            angleAxis.dataSource = this.radialProportionalData;
            radialPieSeries1.dataSource = this.radialProportionalData;
            radialPieSeries1.angleAxis = this.angleAxis;
            radialPieSeries1.valueAxis = this.radiusAxis;
        }
        this._bind();

    }

    private _radialProportionalData: RadialProportionalData = null;
    public get radialProportionalData(): RadialProportionalData {
        if (this._radialProportionalData == null)
        {
            this._radialProportionalData = new RadialProportionalData();
        }
        return this._radialProportionalData;
    }

}

new Sample();
