import { SampleBase } from "../../../sample-base";

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcMedianPriceIndicatorModule } from 'igniteui-webcomponents-charts';
import { IgcBollingerBandsOverlayModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcMedianPriceIndicatorComponent } from 'igniteui-webcomponents-charts';
import { IndicatorDisplayType } from 'igniteui-webcomponents-charts';
import { PriceDisplayType } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleFinancialData } from '../utilities/SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcFinancialPriceSeriesModule,
    IgcMedianPriceIndicatorModule,
    IgcBollingerBandsOverlayModule
);

let templateHTML = `
<div class="sample-container"> 
    <div class="options">
    <span class="option-label"> Series Display Type: </span>
    <select id="seriesSelect">
        <option>Candlestick</option>
        <option>OHLC</option>
    </select>
    <span class="option-label"> Indicator Display Type: </span>
    <select id="indicatorSelect">
        <option>Line</option>
        <option>Area</option>
        <option>Column</option>
    </select>
    </div>
    <div class="chart" style="height: calc(100% - 45px)">
        <igc-data-chart id="chart" width="100%" height="100%"
        is-horizontal-zoom-enabled="true"
        is-vertical-zoom-enabled="true">

            <igc-category-x-axis name="xAxis" label="Label">
            </igc-category-x-axis>
            <igc-numeric-y-axis  name="yAxis1" label-location="OutsideRight"
                title="Financial Prices">
            </igc-numeric-y-axis>
            <igc-numeric-y-axis  name="yAxis2" label-location="OutsideLeft"
                title="Indicator Values" major-stroke-thickness="0" maximum-value="800">
            </igc-numeric-y-axis>

            <igc-bollinger-bands-overlay
                name="series1"
                x-axis-name="xAxis"
                y-axis-name="yAxis1"
                high-member-path="High"
                low-member-path="Low"
                close-member-path="Close"
                open-member-path="Open"
                brush="rgba(171, 82, 235, 0.39)">
            </igc-bollinger-bands-overlay>

            <igc-financial-price-series
                id="series2"
                x-axis-name="xAxis"
                y-axis-name="yAxis1"
                high-member-path="High"
                low-member-path="Low"
                close-member-path="Close"
                open-member-path="Open"
                volume-member-path="Volume">
            </igc-financial-price-series>

            <igc-median-price-indicator
                id="series3"
                x-axis-name="xAxis"
                y-axis-name="yAxis2"
                high-member-path="High"
                low-member-path="Low"
                close-member-path="Close"
                open-member-path="Open"
                volume-member-path="Volume">
            </igc-median-price-indicator>
        </igc-data-chart>
    </div>
</div>
`;

export class DataChartTypeFinancialSeries extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataChartTypeFinancialSeries");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataChartTypeFinancialSeries); return this;
    }

    private chart: IgcDataChartComponent;
    private priceSeries: IgcFinancialPriceSeriesComponent;
    private medianPriceIndicator: IgcMedianPriceIndicatorComponent;
    public displayTypeSeries: PriceDisplayType = PriceDisplayType.Candlestick;
    public displayTypeIndicator: IndicatorDisplayType = IndicatorDisplayType.Line;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();

        this.priceSeries = document.getElementById("series2") as IgcFinancialPriceSeriesComponent;
        this.priceSeries.displayType = this.displayTypeSeries;

        this.medianPriceIndicator = document.getElementById("series3") as IgcMedianPriceIndicatorComponent;
        this.medianPriceIndicator.displayType = this.displayTypeIndicator;

        const seriesSelect = document.getElementById("seriesSelect") as HTMLSelectElement;
        seriesSelect.addEventListener("change", this.onDisplayTypeSeriesChanged);

        const indicatorSelect = document.getElementById("indicatorSelect") as HTMLSelectElement;
        indicatorSelect.addEventListener("change", this.onDisplayTypeIndicatorChanged);
    }

    public onDisplayTypeSeriesChanged = (e: any) =>{
        const type = e.target.value.toString();
        switch (type) {
            case "Candlestick":
                this.displayTypeSeries = PriceDisplayType.Candlestick;
                break;
            case "OHLC":
                this.displayTypeSeries = PriceDisplayType.OHLC;
                break;
        }
        this.priceSeries.displayType = this.displayTypeSeries;
    }

    public onDisplayTypeIndicatorChanged = (e: any) =>{
        const type = e.target.value.toString();
        switch (type) {
            case "Line":
                this.displayTypeIndicator = IndicatorDisplayType.Line;
                break;
            case "Area":
                this.displayTypeIndicator = IndicatorDisplayType.Area;
                break;
            case "Column":
                this.displayTypeIndicator = IndicatorDisplayType.Column;
                break;
        }
        this.medianPriceIndicator.displayType = this.displayTypeIndicator;
    }
}