import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarAreaSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { BoatSailingDataItem, BoatSailingData } from './BoatSailingData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcNumericAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private polarAreaSeries1: IgcPolarAreaSeriesComponent
    private polarAreaSeries2: IgcPolarAreaSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarAreaSeries1 = this.polarAreaSeries1 = document.getElementById('PolarAreaSeries1') as IgcPolarAreaSeriesComponent;
        var polarAreaSeries2 = this.polarAreaSeries2 = document.getElementById('PolarAreaSeries2') as IgcPolarAreaSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('dataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            polarAreaSeries1.dataSource = this.boatSailingData;
            polarAreaSeries1.angleAxis = this.angleAxis;
            polarAreaSeries1.radiusAxis = this.radiusAxis;
            polarAreaSeries2.dataSource = this.boatSailingData;
            polarAreaSeries2.angleAxis = this.angleAxis;
            polarAreaSeries2.radiusAxis = this.radiusAxis;
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
