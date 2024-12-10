import { IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './FootballPlayerStats';
import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";


ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcLegendModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialColumnSeries1: IgcRadialColumnSeriesComponent
    private radialColumnSeries2: IgcRadialColumnSeriesComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialColumnSeries1 = this.radialColumnSeries1 = document.getElementById('RadialColumnSeries1') as IgcRadialColumnSeriesComponent;
        var radialColumnSeries2 = this.radialColumnSeries2 = document.getElementById('RadialColumnSeries2') as IgcRadialColumnSeriesComponent;

        this._bind = () => {
            chart.legend = this.legend;
            angleAxis.dataSource = this.footballPlayerStats;
            radialColumnSeries1.dataSource = this.footballPlayerStats;
            radialColumnSeries1.angleAxis = this.angleAxis;
            radialColumnSeries1.valueAxis = this.radiusAxis;
            radialColumnSeries2.dataSource = this.footballPlayerStats;
            radialColumnSeries2.angleAxis = this.angleAxis;
            radialColumnSeries2.valueAxis = this.radiusAxis;
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
