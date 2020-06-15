import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';

import { IgcRangeAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcRangeColumnSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { IgcRangeAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRangeColumnSeriesComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleRangeData } from "../utilities/SampleRangeData";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcRangeAreaSeriesModule,
    IgcRangeColumnSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="option-label">Type of Range Series: </span>
        <select id="seriesTypeSelect">
            <option>Column</option>
            <option>Area</option>
        </select>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            chart-title="ANNUAL TEMPERATURE CHANGES">
            <igc-category-x-axis name="xAxis" label="Year" gap="0.5">
            </igc-category-x-axis>
            <igc-numeric-y-axis  name="yAxis" minimum-value="20"
                title="Temperature (°C)">
            </igc-numeric-y-axis>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeRangeSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeRangeSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeRangeSeries); return this;
    }

    private chart: IgcDataChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleRangeData.create();

        const seriesTypeSelect = document.getElementById("seriesTypeSelect") as HTMLSelectElement;
        seriesTypeSelect.value = "Column";
        seriesTypeSelect.addEventListener("change", this.onSeriesTypeChanged);
        this.setSeries("Column");
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
         if (seriesType === "Area") {

            const series1 = new IgcRangeAreaSeriesComponent();
            series1.highMemberPath = "High";
            series1.lowMemberPath  = "Low";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";
            series1.thickness = 0;

            this.chart.series.clear();
            this.chart.series.add(series1);

        } else if (seriesType === "Column") {

            const series1 = new IgcRangeColumnSeriesComponent();
            series1.highMemberPath = "High";
            series1.lowMemberPath  = "Low";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";

            this.chart.series.clear();
            this.chart.series.add(series1);
        }
    }
}