import { IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialColumnSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { SolarDaysData } from './SolarDaysData';

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
    private radialSeries: IgcRadialColumnSeriesComponent
    private dataTooltip: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        // var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialSeries = this.radialSeries = document.getElementById('radialSeries') as IgcRadialColumnSeriesComponent;
        var dataTooltip = this.dataTooltip = document.getElementById('dataTooltip') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            // chart.legend = this.legend;
            angleAxis.dataSource = this.dataSource; 
            angleAxis.startAngleOffset = -95; 
            radialSeries.dataSource = this.dataSource;
            radialSeries.angleAxis = this.angleAxis;
            radialSeries.valueAxis = this.radiusAxis;
        }
        this._bind();

    }

    private _dataSource: SolarDaysData = null;
    public get dataSource(): SolarDaysData {
        if (this._dataSource == null)
        {
            this._dataSource = new SolarDaysData();
        }
        return this._dataSource;
    }

}

new Sample();
