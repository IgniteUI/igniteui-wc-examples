import { SampleBase } from "../../../sample-base";
import { SampleRadialData } from "../utilities/SampleRadialData";

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartRadialCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartRadialModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { IgcRadialAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRadialLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRadialPieSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialPieSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRadialColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRadialColumnSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartRadialCoreModule,
    IgcDataChartRadialModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule,
    IgcRadialAreaSeriesModule,
    IgcRadialLineSeriesModule,
    IgcRadialPieSeriesModule,
    IgcRadialColumnSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="option-label">Type of Radial Series: </span>
        <select id="seriesTypeSelect">
            <option>Area</option>
            <option>Column</option>
            <option>Pie</option>
            <option>Line</option>
        </select>
        <span class="legend-title">Legend: </span>
        <div class="legend-inline">
            <igc-legend id="legend" orientation="Horizontal"></igc-legend>
        </div>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            chart-title="COMPANY FINANCES BY DEPARTMENT"
            grid-mode="BeforeSeries"
            brushes="#9FB328, #7446B9"
            outlines="#9FB328, #7446B9">

            <igc-category-angle-axis name="angleAxis" label="Department"></igc-category-angle-axis>
            <igc-numeric-radius-axis name="radiusAxis" inner-radius-extent-scale="0.1" minimum-value="0"></igc-numeric-radius-axis>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeRadialSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeRadialSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeRadialSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleRadialData.create();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
        this.setSeries("Pie");

        const seriesTypeSelect = document.getElementById("seriesTypeSelect") as HTMLSelectElement;
        seriesTypeSelect.value = "Pie";
        seriesTypeSelect.addEventListener("change", this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
         if (seriesType === "Area") {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialAreaSeriesComponent();
            series1.valueMemberPath  = "Budget";
            series1.valueAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcRadialAreaSeriesComponent();
            series2.valueMemberPath  = "Spending";
            series2.valueAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.title = "Budget";
            series2.title = "Spending";
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === "Pie") {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialPieSeriesComponent();
            series1.valueMemberPath  = "Budget";
            series1.valueAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcRadialPieSeriesComponent();
            series2.valueMemberPath  = "Spending";
            series2.valueAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.title = "Budget";
            series2.title = "Spending";
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === "Line") {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialLineSeriesComponent();
            series1.valueMemberPath  = "Budget";
            series1.valueAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcRadialLineSeriesComponent();
            series2.valueMemberPath  = "Spending";
            series2.valueAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.title = "Budget";
            series2.title = "Spending";
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);

        } else if (seriesType === "Column") {
            // creating a series with mapping to data columns of financial data
            const series1 = new IgcRadialColumnSeriesComponent();
            series1.valueMemberPath  = "Budget";
            series1.valueAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcRadialColumnSeriesComponent();
            series2.valueMemberPath  = "Spending";
            series2.valueAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.title = "Budget";
            series2.title = "Spending";
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        }
    }
}