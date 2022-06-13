import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialPieSeriesComponent } from 'igniteui-webcomponents-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './FootballPlayerStats';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialPieSeries1: IgcRadialPieSeriesComponent
    private radialPieSeries2: IgcRadialPieSeriesComponent

    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('Legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialPieSeries1 = this.radialPieSeries1 = document.getElementById('RadialPieSeries1') as IgcRadialPieSeriesComponent;
        var radialPieSeries2 = this.radialPieSeries2 = document.getElementById('RadialPieSeries2') as IgcRadialPieSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend
            angleAxis.dataSource = this.footballPlayerStats
            radialPieSeries1.angleAxis = this.angleAxis
            radialPieSeries1.valueAxis = this.radiusAxis
            radialPieSeries1.dataSource = this.footballPlayerStats
            radialPieSeries2.angleAxis = this.angleAxis
            radialPieSeries2.valueAxis = this.radiusAxis
            radialPieSeries2.dataSource = this.footballPlayerStats
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
