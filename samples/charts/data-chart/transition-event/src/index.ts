import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartCoreModule, IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, DataChartCoreDescriptionModule, DataChartCategoryDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcWaterfallSeriesComponent } from 'igniteui-webcomponents-charts';
import { CompanyIncomeDataItem, CompanyIncomeData } from './CompanyIncomeData';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';

defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private waterfallSeries1: IgcWaterfallSeriesComponent
    private waterfallSeries2: IgcWaterfallSeriesComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorButtonReplayTransitionIn = this.editorButtonReplayTransitionIn.bind(this);
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var waterfallSeries1 = this.waterfallSeries1 = document.getElementById('WaterfallSeries1') as IgcWaterfallSeriesComponent;
        var waterfallSeries2 = this.waterfallSeries2 = document.getElementById('WaterfallSeries2') as IgcWaterfallSeriesComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer;
            propertyEditorPanel1.target = this.chart;
            propertyEditorPropertyDescription1.buttonClicked = this.editorButtonReplayTransitionIn;
            xAxis.dataSource = this.companyIncomeData;
            waterfallSeries1.xAxis = this.xAxis;
            waterfallSeries1.yAxis = this.yAxis;
            waterfallSeries1.dataSource = this.companyIncomeData;
            waterfallSeries2.xAxis = this.xAxis;
            waterfallSeries2.yAxis = this.yAxis;
            waterfallSeries2.dataSource = this.companyIncomeData;
        }
        this._bind();
    }

    private _companyIncomeData: CompanyIncomeData = null;
    public get companyIncomeData(): CompanyIncomeData {
        if (this._companyIncomeData == null)
        {
            this._companyIncomeData = new CompanyIncomeData();
        }
        return this._companyIncomeData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
            DataChartCategoryDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public editorButtonReplayTransitionIn(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        var series = this.chart.actualSeries;
        for (var i = 0; i < series.length; i++) {
            series[i].replayTransitionIn();
        }
    }

}

new Sample();
