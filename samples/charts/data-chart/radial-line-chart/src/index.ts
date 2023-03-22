import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialLineSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './FootballPlayerStats';

import { ModuleManager } from 'igniteui-webcomponents-core';

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
    private radialLineSeries1: IgcRadialLineSeriesComponent
    private radialLineSeries2: IgcRadialLineSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialLineSeries1 = this.radialLineSeries1 = document.getElementById('RadialLineSeries1') as IgcRadialLineSeriesComponent;
        var radialLineSeries2 = this.radialLineSeries2 = document.getElementById('RadialLineSeries2') as IgcRadialLineSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('DataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend
            angleAxis.dataSource = this.footballPlayerStats
            radialLineSeries1.dataSource = this.footballPlayerStats
            radialLineSeries1.angleAxis = this.angleAxis
            radialLineSeries1.valueAxis = this.radiusAxis
            radialLineSeries2.dataSource = this.footballPlayerStats
            radialLineSeries2.angleAxis = this.angleAxis
            radialLineSeries2.valueAxis = this.radiusAxis
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
