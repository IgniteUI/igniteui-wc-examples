import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialAreaSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './FootballPlayerStats';
import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";


ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialAreaSeries1: IgcRadialAreaSeriesComponent
    private radialAreaSeries2: IgcRadialAreaSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialAreaSeries1 = this.radialAreaSeries1 = document.getElementById('RadialAreaSeries1') as IgcRadialAreaSeriesComponent;
        var radialAreaSeries2 = this.radialAreaSeries2 = document.getElementById('RadialAreaSeries2') as IgcRadialAreaSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('dataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            angleAxis.dataSource = this.footballPlayerStats;
            radialAreaSeries1.dataSource = this.footballPlayerStats;
            radialAreaSeries1.angleAxis = this.angleAxis;
            radialAreaSeries1.valueAxis = this.radiusAxis;
            radialAreaSeries2.dataSource = this.footballPlayerStats;
            radialAreaSeries2.angleAxis = this.angleAxis;
            radialAreaSeries2.valueAxis = this.radiusAxis;
        }
        this._bind();
    }

    private _footballPlayerStats: FootballPlayerStats = null;
    public get footballPlayerStats(): FootballPlayerStats {
        if (this._footballPlayerStats == null)
        {
            this._footballPlayerStats = new FootballPlayerStats();
        }
        return this._footballPlayerStats;
    }

}

new Sample();
