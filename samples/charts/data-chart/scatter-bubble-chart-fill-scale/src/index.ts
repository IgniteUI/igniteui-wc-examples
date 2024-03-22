import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcSizeScaleComponent, IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { ComponentRenderer, NumberAbbreviatorDescriptionModule, DataChartCoreDescriptionModule, DataChartScatterDescriptionModule, DataChartScatterCoreDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule, PropertyEditorPanelDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { WorldDebtAndPopulationItem, WorldDebtAndPopulation } from './WorldDebtAndPopulation';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { EnumUtil } from 'igniteui-webcomponents-core';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcNumberAbbreviatorModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private fillScaleMinimumValueEditor: IgcPropertyEditorPropertyDescriptionComponent
    private fillScaleMaximumValueEditor: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private bubbleSeries1: IgcBubbleSeriesComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var fillScaleMinimumValueEditor = this.fillScaleMinimumValueEditor = document.getElementById('FillScaleMinimumValueEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.scatterBubbleSeriesFillScaleSliderChanged = this.scatterBubbleSeriesFillScaleSliderChanged.bind(this);
        var fillScaleMaximumValueEditor = this.fillScaleMaximumValueEditor = document.getElementById('FillScaleMaximumValueEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.scatterBubbleSeriesFillScaleSliderChanged = this.scatterBubbleSeriesFillScaleSliderChanged.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var bubbleSeries1 = this.bubbleSeries1 = document.getElementById('BubbleSeries1') as IgcBubbleSeriesComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.chart;
            fillScaleMinimumValueEditor.changed = this.scatterBubbleSeriesFillScaleSliderChanged;
            fillScaleMaximumValueEditor.changed = this.scatterBubbleSeriesFillScaleSliderChanged;
            bubbleSeries1.xAxis = this.xAxis;
            bubbleSeries1.yAxis = this.yAxis;
            bubbleSeries1.dataSource = this.worldDebtAndPopulation;

            const sizeScale = new IgcSizeScaleComponent();
            sizeScale.minimumValue = 10;
            sizeScale.maximumValue = 50;
            bubbleSeries1.radiusScale = sizeScale;

            const fillScale = new IgcValueBrushScaleComponent();
            fillScale.brushes = ["#1AA1E2", "#189AD9", "#1692CE", "#1385BC", "#0F79AB", "#0C6B99", "#095E88", "#055277", "#024669", "#003F5E"];
            bubbleSeries1.fillScale = fillScale;
            
        }
        this._bind();

    }

    private _worldDebtAndPopulation: WorldDebtAndPopulation = null;
    public get worldDebtAndPopulation(): WorldDebtAndPopulation {
        if (this._worldDebtAndPopulation == null)
        {
            this._worldDebtAndPopulation = new WorldDebtAndPopulation();
        }
        return this._worldDebtAndPopulation;
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
            PropertyEditorPanelDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public scatterBubbleSeriesFillScaleSliderChanged(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        let series: IgcBubbleSeriesComponent = this.chart.actualSeries[0] as IgcBubbleSeriesComponent;

        let fillScale = (series.fillScale as any);

        if(args.newValue >= 25000){
            fillScale.maximumValue = args.newValue;
        }
        else{
            fillScale.minimumValue = args.newValue;
        }
    }

}

new Sample();
