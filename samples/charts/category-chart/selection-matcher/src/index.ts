import { IgcLegendModule, IgcCategoryChartModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule, IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { ComponentRenderer, LegendDescriptionModule, CategoryChartDescriptionModule, DataChartAnnotationDescriptionModule, DataChartInteractivityDescriptionModule, DataChartCoreDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { EnergyRenewableConsumptionItem, EnergyRenewableConsumption } from './EnergyRenewableConsumption';
import { IgcChartSelection, IgcSeriesMatcher } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcCategoryChartModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcDataChartCoreModule
);

export class Sample {

    private legend: IgcLegendComponent
    private chart: IgcCategoryChartComponent
    private _bind: () => void;

    constructor() {
        var legend = this.legend = document.getElementById('legend') as IgcLegendComponent;
        var chart = this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this._bind = () => {
            chart.legend = this.legend;
            chart.dataSource = this.energyRenewableConsumption;
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            LegendDescriptionModule.register(context);
            CategoryChartDescriptionModule.register(context);
            DataChartAnnotationDescriptionModule.register(context);
            DataChartInteractivityDescriptionModule.register(context);
            DataChartCoreDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    private _timer: ReturnType<typeof setInterval>;

    public selectionMatcherOnViewInit(): void {

    	var chart = this.chart;

    	this._timer = setTimeout(() => {
    		var data = this.energyRenewableConsumption;
    		let matcher: IgcSeriesMatcher = new IgcSeriesMatcher();

    		let selection: IgcChartSelection = new IgcChartSelection();
    		selection.item = data[1];
    		matcher.memberPath = "hydro";
    		matcher.memberPathType = "ValueMemberPath";
    		selection.matcher = matcher;
    		chart.selectedSeriesItems.add(selection);

    		let matcher2: IgcSeriesMatcher = new IgcSeriesMatcher();
    		let selection2: IgcChartSelection = new IgcChartSelection();
    		selection2.item = data[2];
    		matcher2.memberPath = "wind";
    		matcher2.memberPathType = "ValueMemberPath";
    		selection2.matcher = matcher2;

    		chart.selectedSeriesItems.add(selection2);

        }, 100);
    }

}

new Sample();
