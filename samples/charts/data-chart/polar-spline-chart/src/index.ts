import { IgcDataChartCoreModule, IgcDataChartPolarModule, IgcDataChartPolarCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcPolarSplineSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { BoatSailingDataItem, BoatSailingData } from './BoatSailingData';

import { ModuleManager } from 'igniteui-webcomponents-core';

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
    private polarSplineSeries1: IgcPolarSplineSeriesComponent
    private polarSplineSeries2: IgcPolarSplineSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcNumericAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var polarSplineSeries1 = this.polarSplineSeries1 = document.getElementById('PolarSplineSeries1') as IgcPolarSplineSeriesComponent;
        var polarSplineSeries2 = this.polarSplineSeries2 = document.getElementById('PolarSplineSeries2') as IgcPolarSplineSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            polarSplineSeries1.dataSource = this.boatSailingData;
            polarSplineSeries1.angleAxis = this.angleAxis;
            polarSplineSeries1.radiusAxis = this.radiusAxis;
            polarSplineSeries2.dataSource = this.boatSailingData;
            polarSplineSeries2.angleAxis = this.angleAxis;
            polarSplineSeries2.radiusAxis = this.radiusAxis;
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
