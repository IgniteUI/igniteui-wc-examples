import { IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarSplineAreaSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { BoatSailingDataItem, BoatSailingData } from './BoatSailingData';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private angleAxis: IgcNumericAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private polarSplineAreaSeries1: IgcPolarSplineAreaSeriesComponent
    private polarSplineAreaSeries2: IgcPolarSplineAreaSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarSplineAreaSeries1 = this.polarSplineAreaSeries1 = document.getElementById('PolarSplineAreaSeries1') as IgcPolarSplineAreaSeriesComponent;
        var polarSplineAreaSeries2 = this.polarSplineAreaSeries2 = document.getElementById('PolarSplineAreaSeries2') as IgcPolarSplineAreaSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            polarSplineAreaSeries1.dataSource = this.boatSailingData;
            polarSplineAreaSeries1.angleAxis = this.angleAxis;
            polarSplineAreaSeries1.radiusAxis = this.radiusAxis;
            polarSplineAreaSeries2.dataSource = this.boatSailingData;
            polarSplineAreaSeries2.angleAxis = this.angleAxis;
            polarSplineAreaSeries2.radiusAxis = this.radiusAxis;
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
