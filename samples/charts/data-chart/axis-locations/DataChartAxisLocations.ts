import { SampleBase } from "../../../sample-base";

// data chart's modules:
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

// series' module:
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';

// legend's module:
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcLegendModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="legend-title">Legend: </span>
        <div class="legend-inline">
            <igc-legend id="legend" orientation="Horizontal">
            </igc-legend>
        </div>
    </div>
    <div class="chart"  style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            chart-title="Company Financial Projections"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true">

            <!-- multiple axes at various location: -->
            <igc-Category-x-axis name="xAxisYears"
            interval="12" label-location="OutsideBottom" overlap="1" gap="0.4"
            label="Year"  label-text-color="gray" tick-length="0">
            </igc-Category-x-axis>
            <igc-Category-x-axis name="xAxisMonths" overlap="1" gap="0.4"
            interval="1"  label-location="OutsideBottom"
            label="Month" label-text-color="gray">
            </igc-Category-x-axis>
            <igc-numeric-y-axis  name="yAxisLeft" title="Expanse | Revenue"
            title-text-color="gray"
            minimum-value="-900" label-location="OutsideLeft"
            maximum-value="900" label-text-color="gray"
            interval="300">
            </igc-numeric-y-axis>
            <igc-numeric-y-axis  name="yAxisRight" title="Profit (%)"
            title-text-color="gray"
            minimum-value="0"  label-location="OutsideRight"
            major-stroke-thickness="0"
            maximum-value="100" label-text-color="gray"
            label-horizontal-alignment="left"
            title-vertical-alignment="center">
            </igc-numeric-y-axis>

            <!-- multiple series: -->
            <igc-column-series name="series1" title="Revenue"
            value-member-path="Revenue" brush="#9b58e2" outline="#9b58e2"
            x-axis-name="xAxisMonths" show-default-tooltip="true"
            y-axis-name="yAxisLeft"
            isTransitionInEnabled="true">
            </igc-column-series>
            <igc-column-series name="series3" title="Expanse"
            value-member-path="Expanse" brush="#f23030" outline="#f23030"
            x-axis-name="xAxisMonths" show-default-tooltip="true"
            y-axis-name="yAxisLeft"
            is-transition-in-enabled="true">
            </igc-column-series>
            <igc-column-series name="series2" title="Profit"
            value-member-path="Profit" brush="#48ba39" outline="#48ba39"
            x-axis-name="xAxisYears" show-default-tooltip="true"
            y-axis-name="yAxisRight"
            is-transition-in-enabled="true">
            </igc-column-series>
        </igc-data-chart>
    <div>
</div>
`;

export class DataChartAxisLocations extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartAxisLocations");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartAxisLocations); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
    }

    getData(): any[] {
        const items: any[] = [];
        const months: string[] = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];

        let revenue = 200;
        let profit = 15;
        let expanse = 0;

        let year = 2020;
        let month = 0;
        for (let i = 0; i < 25; i++) {
            revenue += Math.random() * 50 - 20;
            profit += Math.random() * 4.0 - 2.0; // percentage
            expanse = revenue - (revenue * profit / 100);
            items.push(
                {
                    Expanse: Math.round(-expanse),
                    Month:  months[month],
                    Profit: Math.round(profit),
                    Revenue: Math.round(revenue),
                    Year: year,
            });
            month += 1;
            if (month >= 12) {
                month = 0;
                year += 1;
            }
        }


        const data = items;

        return data;
    }
}