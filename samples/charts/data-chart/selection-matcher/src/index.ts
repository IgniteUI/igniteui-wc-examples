import { IgcLegendModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartCategoryCoreModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcDataChartStackedModule, IgcStackedFragmentSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcDataChartComponent, IgcCategoryYAxisComponent, IgcNumericXAxisComponent, IgcStacked100BarSeriesComponent, IgcStackedFragmentSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { EnergyRenewableConsumptionItem, EnergyRenewableConsumption } from './EnergyRenewableConsumption';
import { IgcCategoryChartComponent, IgcChartSelection, IgcSeriesMatcher } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcDataChartComponent
    private yAxis: IgcCategoryYAxisComponent
    private xAxis: IgcNumericXAxisComponent
    private stacked100BarSeries: IgcStacked100BarSeriesComponent
    private s1: IgcStackedFragmentSeriesComponent
    private s2: IgcStackedFragmentSeriesComponent
    private s3: IgcStackedFragmentSeriesComponent
    private s4: IgcStackedFragmentSeriesComponent
    private dataToolTipLayer: IgcDataToolTipLayerComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcDataChartComponent;
        var yAxis = this.yAxis = document.getElementById('yAxis') as IgcCategoryYAxisComponent;
        var xAxis = this.xAxis = document.getElementById('xAxis') as IgcNumericXAxisComponent;
        var stacked100BarSeries = this.stacked100BarSeries = document.getElementById('stacked100BarSeries') as IgcStacked100BarSeriesComponent;
        var s1 = this.s1 = document.getElementById('s1') as IgcStackedFragmentSeriesComponent;
        var s2 = this.s2 = document.getElementById('s2') as IgcStackedFragmentSeriesComponent;
        var s3 = this.s3 = document.getElementById('s3') as IgcStackedFragmentSeriesComponent;
        var s4 = this.s4 = document.getElementById('s4') as IgcStackedFragmentSeriesComponent;
        var dataToolTipLayer = this.dataToolTipLayer = document.getElementById('dataToolTipLayer') as IgcDataToolTipLayerComponent;

        this._bind = () => {
            chart.legend = this.legend;
            yAxis.dataSource = this.energyRenewableConsumption;
            stacked100BarSeries.dataSource = this.energyRenewableConsumption;
            stacked100BarSeries.xAxis = this.xAxis;
            stacked100BarSeries.yAxis = this.yAxis;
        }
        this._bind();

        this.selectionMatcherOnViewInit();
    }

    private _energyRenewableConsumption: EnergyRenewableConsumption = null;
    public get energyRenewableConsumption(): EnergyRenewableConsumption {
        if (this._energyRenewableConsumption == null)
        {
            this._energyRenewableConsumption = new EnergyRenewableConsumption();
        }
        return this._energyRenewableConsumption;
    }


    private _timer: ReturnType<typeof setInterval>;

    public selectionMatcherOnViewInit(): void {

    	var chart = this.chart;

    	this._timer = setInterval(() => {
    		var data = this.energyRenewableConsumption;
    		let matcher: IgcSeriesMatcher = new IgcSeriesMatcher();

    		let selection: IgcChartSelection = new IgcChartSelection();
    		selection.item = data[1];
    		matcher.memberPath = "hydro";
    		matcher.memberPathType = "ValueMemberPath";
    		selection.matcher = matcher;
    		chart.selectedSeriesItems.add(selection);

    		let selection2: IgcChartSelection = new IgcChartSelection();
    		selection2.item = data[2];
    		matcher.memberPath = "wind";
    		matcher.memberPathType = "ValueMemberPath";
    		selection2.matcher = matcher;

    		chart.selectedSeriesItems.add(selection2);

        }, 100);
    }

}

new Sample();
