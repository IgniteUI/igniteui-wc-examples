import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, LegendDescriptionModule, DataChartCoreDescriptionModule, DataChartScatterDescriptionModule, DataChartScatterCoreDescriptionModule, DataChartInteractivityDescriptionModule, DataChartAnnotationDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcLegendComponent, IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { CountryDemographicEuropeItem, CountryDemographicEurope } from './CountryDemographicEurope';
import { CountryDemographicAfricanItem, CountryDemographicAfrican } from './CountryDemographicAfrican';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';

import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule,
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private markerSizeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private markerTypeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private xAxis: IgcNumericXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private scatterSeries1: IgcScatterSeriesComponent
    private scatterSeries2: IgcScatterSeriesComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var markerSizeEditor = this.markerSizeEditor = document.getElementById('MarkerSizeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateDataChartMarkerSize = this.editorChangeUpdateDataChartMarkerSize.bind(this);
        var markerTypeEditor = this.markerTypeEditor = document.getElementById('MarkerTypeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.editorChangeUpdateDataChartMarkerType = this.editorChangeUpdateDataChartMarkerType.bind(this);
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var scatterSeries1 = this.scatterSeries1 = document.getElementById('scatterSeries1') as IgcScatterSeriesComponent;
        var scatterSeries2 = this.scatterSeries2 = document.getElementById('scatterSeries2') as IgcScatterSeriesComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.chart;
            markerSizeEditor.changed = this.editorChangeUpdateDataChartMarkerSize;
            markerTypeEditor.changed = this.editorChangeUpdateDataChartMarkerType;
            chart.legend = this.legend;
            scatterSeries1.xAxis = this.xAxis;
            scatterSeries1.yAxis = this.yAxis;
            scatterSeries1.dataSource = this.countryDemographicEurope;
            scatterSeries2.xAxis = this.xAxis;
            scatterSeries2.yAxis = this.yAxis;
            scatterSeries2.dataSource = this.countryDemographicAfrican;
        }
        this._bind();

    }

    private _countryDemographicEurope: CountryDemographicEurope = null;
    public get countryDemographicEurope(): CountryDemographicEurope {
        if (this._countryDemographicEurope == null)
        {
            this._countryDemographicEurope = new CountryDemographicEurope();
        }
        return this._countryDemographicEurope;
    }

    private _countryDemographicAfrican: CountryDemographicAfrican = null;
    public get countryDemographicAfrican(): CountryDemographicAfrican {
        if (this._countryDemographicAfrican == null)
        {
            this._countryDemographicAfrican = new CountryDemographicAfrican();
        }
        return this._countryDemographicAfrican;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            LegendDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
            DataChartScatterDescriptionModule.register(context);
            DataChartScatterCoreDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public editorChangeUpdateDataChartMarkerSize(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var chart = this.chart;
        var markerSizeVal = parseInt(args.newValue);
        var series = chart.actualSeries;
        for (var i = 0; i < series.length; i++) {
            (series[i] as any).markerSize = markerSizeVal;
        }
    }

    public editorChangeUpdateDataChartMarkerType(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var chart = this.chart;
        var markerTypeVal = args.newValue;
        var series = chart.actualSeries;
        for (var i = 0; i < series.length; i++) {
            (series[i] as any).markerType = markerTypeVal;
        }
    }

}

new Sample();
