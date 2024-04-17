import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { ComponentRenderer, NumberAbbreviatorDescriptionModule, DataChartCoreDescriptionModule, DataChartScatterDescriptionModule, DataChartScatterCoreDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule, PropertyEditorPanelDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcSizeScaleComponent, IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
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
            valueBrushScale1.maximumValue = 100000;
            valueBrushScale1.brushes = ["rgba(26, 161, 226, 1)", "rgba(24, 154, 217, 1)", "rgba(22, 146, 206, 1)", "rgba(19, 133, 188, 1)", "rgba(15, 121, 171, 1)", "rgba(12, 107, 153, 1)", "rgba(9, 94, 136, 1)", "rgba(5, 82, 119, 1)", "rgba(2, 70, 105, 1)", "rgba(0, 63, 94, 1)"];

            this._valueBrushScale1 = valueBrushScale1;
        }
        return this._valueBrushScale1;
    }
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
            bubbleSeries1.radiusScale = this.sizeScale1;
            bubbleSeries1.xAxis = this.xAxis;
            bubbleSeries1.yAxis = this.yAxis;
            bubbleSeries1.dataSource = this.worldDebtAndPopulation;
            bubbleSeries1.fillScale = this.valueBrushScale1;
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
