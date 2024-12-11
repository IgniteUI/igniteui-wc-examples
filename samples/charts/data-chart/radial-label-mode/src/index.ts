import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCoreModule, IgcDataChartRadialModule, IgcDataChartRadialCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcLegendModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCoreDescriptionModule, DataChartRadialDescriptionModule, DataChartRadialCoreDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule, LegendDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryAngleAxisComponent, IgcNumericRadiusAxisComponent, IgcRadialColumnSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './FootballPlayerStats';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataChartCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcLegendModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private labelExtent: IgcPropertyEditorPropertyDescriptionComponent
    private labelMode: IgcPropertyEditorPropertyDescriptionComponent
    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private angleAxis: IgcCategoryAngleAxisComponent
    private radiusAxis: IgcNumericRadiusAxisComponent
    private radialColumnSeries1: IgcRadialColumnSeriesComponent
    private radialColumnSeries2: IgcRadialColumnSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var labelExtent = this.labelExtent = document.getElementById('LabelExtent') as IgcPropertyEditorPropertyDescriptionComponent;
        var labelMode = this.labelMode = document.getElementById('LabelMode') as IgcPropertyEditorPropertyDescriptionComponent;
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var angleAxis = this.angleAxis = document.getElementById('angleAxis') as IgcCategoryAngleAxisComponent;
        var radiusAxis = this.radiusAxis = document.getElementById('radiusAxis') as IgcNumericRadiusAxisComponent;
        var radialColumnSeries1 = this.radialColumnSeries1 = document.getElementById('RadialColumnSeries1') as IgcRadialColumnSeriesComponent;
        var radialColumnSeries2 = this.radialColumnSeries2 = document.getElementById('RadialColumnSeries2') as IgcRadialColumnSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('dataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.angleAxis;
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
            DataChartRadialDescriptionModule.register(context);
            DataChartRadialCoreDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
            LegendDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
