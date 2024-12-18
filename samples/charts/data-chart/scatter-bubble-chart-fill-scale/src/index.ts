import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, NumberAbbreviatorDescriptionModule, DataChartCoreDescriptionModule, DataChartScatterDescriptionModule, DataChartScatterCoreDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcSizeScaleComponent, IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { WorldStatsItem, WorldStats } from './WorldStats';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private _sizeScale1: IgcSizeScaleComponent | null = null;
    public get sizeScale1(): IgcSizeScaleComponent {
        if (this._sizeScale1 == null)
        {
            var sizeScale1 = new IgcSizeScaleComponent();
            sizeScale1.isLogarithmic = false;
            sizeScale1.minimumValue = 10;
            sizeScale1.maximumValue = 120;

            this._sizeScale1 = sizeScale1;
        }
        return this._sizeScale1;
    }
    private _valueBrushScale1: IgcValueBrushScaleComponent | null = null;
    public get valueBrushScale1(): IgcValueBrushScaleComponent {
        if (this._valueBrushScale1 == null)
        {
            var valueBrushScale1 = new IgcValueBrushScaleComponent();
            valueBrushScale1.isLogarithmic = false;
            valueBrushScale1.minimumValue = 0;
            valueBrushScale1.maximumValue = 260000;
            valueBrushScale1.brushes = ["rgba(137, 181, 250, 1)", "rgba(20, 108, 247, 1)", "rgba(82, 144, 242, 1)"];

            this._valueBrushScale1 = valueBrushScale1;
        }
        return this._valueBrushScale1;
    }
    private _bind: () => void;

    constructor() {
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('bubbleSeries1') as IgcBubbleSeriesComponent;

        this._bind = () => {
            bubbleSeries1.radiusScale = this.sizeScale1;
            bubbleSeries1.xAxis = this.xAxis;
            bubbleSeries1.yAxis = this.yAxis;
            bubbleSeries1.dataSource = this.worldStats;
            bubbleSeries1.fillScale = this.valueBrushScale1;
        }
        this._bind();

    }

    private _worldStats: WorldStats = null;
    public get worldStats(): WorldStats {
        if (this._worldStats == null)
        {
            this._worldStats = new WorldStats();
        }
        return this._worldStats;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            NumberAbbreviatorDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
            DataChartScatterDescriptionModule.register(context);
            DataChartScatterCoreDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
