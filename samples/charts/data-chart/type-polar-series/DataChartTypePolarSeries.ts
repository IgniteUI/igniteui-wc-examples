import { SampleBase } from "../../../sample-base";
import { SamplePolarData } from "../utilities/SamplePolarData";

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartPolarModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';

import { IgcPolarAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarSplineAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcPolarScatterSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcPolarScatterSeriesComponent } from 'igniteui-webcomponents-charts';

import { MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartPolarCoreModule,
    IgcDataChartPolarModule,
    IgcDataChartInteractivityModule,
    IgcLegendModule,
    IgcPolarAreaSeriesModule,
    IgcPolarLineSeriesModule,
    IgcPolarSplineSeriesModule,
    IgcPolarSplineAreaSeriesModule,
    IgcPolarScatterSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="option-label">Type of Polar Series: </span>
        <select id="seriesTypeSelect">
            <option>Area</option>
            <option>Spline Area</option>
            <option>Spline</option>
            <option>Line</option>
            <option>Scatter</option>
        </select>
        <span class="legend-title">Legend: </span>
        <div class="legend-inline">
            <igc-legend id="legend" orientation="Horizontal">
            </igc-legend>
        </div>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
            is-horizontal-zoom-enabled="true"
            is-vertical-zoom-enabled="true"
            title-top-margin="10px"
            chart-title="SAIL CHART"
            subtitle="Wind Speed vs. Boat Speed">
            <igc-numeric-angle-axis  name="angleAxis"
                start-angle-offset="-90"
                interval="30"
                minimum-value="0"
                maximum-value="360">
            </igc-numeric-angle-axis>
            <igc-numeric-radius-axis name="radiusAxis"
                inner-radius-extent-scale="0.1"
                radius-extent-scale="0.9"
                minimum-value="0"
                maximum-value="100"
                interval="25">
            </igc-numeric-radius-axis>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypePolarSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypePolarSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypePolarSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SamplePolarData.create();

        this.legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart.legend = this.legend;
        this.setSeries("Spline");

        const seriesTypeSelect = document.getElementById("seriesTypeSelect") as HTMLSelectElement;
        seriesTypeSelect.value = "Spline";
        seriesTypeSelect.addEventListener("change", this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
         if (seriesType === "Area") {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarAreaSeriesComponent();
            series1.angleMemberPath = "Direction";
            series1.radiusMemberPath  = "BoatSpeed";
            series1.radiusAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcPolarAreaSeriesComponent();
            series2.angleMemberPath = "Direction";
            series2.radiusMemberPath  = "WindSpeed";
            series2.radiusAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.areaFillOpacity = 1;
            series2.areaFillOpacity = 1;
            series1.markerType = MarkerType.Circle;
            series2.markerType = MarkerType.Circle;
            series1.title = "Boat Speed";
            series2.title = "Wind Speed";
            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);

        }
        else if (seriesType === "Spline Area") {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarSplineAreaSeriesComponent();
            series1.angleMemberPath = "Direction";
            series1.radiusMemberPath  = "BoatSpeed";
            series1.radiusAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";

            const series2 = new IgcPolarSplineAreaSeriesComponent();
            series2.angleMemberPath = "Direction";
            series2.radiusMemberPath  = "WindSpeed";
            series2.radiusAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.areaFillOpacity = 0.3;
            series2.areaFillOpacity = 0.3;
            series1.markerType = MarkerType.Circle;
            series2.markerType = MarkerType.Circle;
            series1.title = "Boat Speed";
            series2.title = "Wind Speed";
            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);

        }
        else if (seriesType === "Spline") {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarSplineSeriesComponent();
            series1.angleMemberPath = "Direction";
            series1.radiusMemberPath  = "BoatSpeed";
            series1.radiusAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcPolarSplineSeriesComponent();
            series2.angleMemberPath = "Direction";
            series2.radiusMemberPath  = "WindSpeed";
            series2.radiusAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.markerType = MarkerType.Circle;
            series2.markerType = MarkerType.Circle;
            series1.title = "Boat Speed";
            series2.title = "Wind Speed";
            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);

        }
        else if (seriesType === "Line") {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarLineSeriesComponent();
            series1.angleMemberPath = "Direction";
            series1.radiusMemberPath  = "BoatSpeed";
            series1.radiusAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcPolarLineSeriesComponent();
            series2.angleMemberPath = "Direction";
            series2.radiusMemberPath  = "WindSpeed";
            series2.radiusAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.markerType = MarkerType.Circle;
            series2.markerType = MarkerType.Circle;
            series1.title = "Boat Speed";
            series2.title = "Wind Speed";
            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);

        }
        else if (seriesType === "Scatter") {
            // creating a series with mapping to data columns of wind pattern
            const series1 = new IgcPolarScatterSeriesComponent();
            series1.angleMemberPath = "Direction";
            series1.radiusMemberPath  = "BoatSpeed";
            series1.radiusAxisName = "radiusAxis";
            series1.angleAxisName = "angleAxis";
            const series2 = new IgcPolarScatterSeriesComponent();
            series2.angleMemberPath = "Direction";
            series2.radiusMemberPath  = "WindSpeed";
            series2.radiusAxisName = "radiusAxis";
            series2.angleAxisName = "angleAxis";

            series1.markerType = MarkerType.Circle;
            series2.markerType = MarkerType.Circle;
            series1.title = "Boat Speed";
            series2.title = "Wind Speed";
            this.chart.series.clear();
            this.chart.series.add(series2);
            this.chart.series.add(series1);
        }
    }
}