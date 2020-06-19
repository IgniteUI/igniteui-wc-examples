import { SampleBase } from "../../sample-base";

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { CrosshairsDisplayMode } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';

import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <label class="optionLabel">Annotations: </label>
        <label class="optionItem">
        <input id="crosshairs" type="checkbox"
        checked="true"></input> Crosshair</label>
        <label class="optionItem">
        <input id="callouts" type="checkbox"
        checked="true"></input> Callouts </label>
        <label class="optionItem">
        <input id="finalvalues" type="checkbox"
        checked="true"></input> Final Values </label>
        <label class="optionItem">
        <input id="markers" type="checkbox"
        checked="true"></input> Markers </label>
    </div>
    <div class="chart" style="height: calc(100% - 40px)">
        <igc-financial-chart id="chart" width="100%" height="100%"
            chart-type="Line"
            thickness="2"
            excluded-properties="index, info"
            callouts-x-member-path="index"
            callouts-y-member-path="value"
            callouts-label-member-path="info"
            callouts-content-member-path="info"
            crosshairs-snap-to-data="false">
        </igc-financial-chart>
    </div>
</div>
`;

export class FinancialChartAnnotations extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("FinancialChartAnnotations");
    public static register(): any {
        window.customElements.define(this.htmlTagName, FinancialChartAnnotations); return this;
    }

    private chart: IgcFinancialChartComponent;
    private calloutsVisible = true;
    private crosshairsMode = CrosshairsDisplayMode.Both;
    private crosshairsVisible = true;
    private finalValuesVisible = true;
    private markersTypes = MarkerType.Circle;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.calloutsVisible = this.calloutsVisible;
        this.chart.crosshairsDisplayMode = this.crosshairsMode;
        this.chart.crosshairsAnnotationEnabled = this.crosshairsVisible;
        this.chart.finalValueAnnotationsVisible = this.finalValuesVisible;
        this.chart.markerTypes.add(this.markersTypes);

        let crosshairs = document.getElementById("crosshairs");
        crosshairs.addEventListener('change', this.onCrosshairsVisible);

        let callouts = document.getElementById("callouts");
        callouts.addEventListener('change', this.onCalloutsVisible);

        let finalvalues = document.getElementById("finalvalues");
        finalvalues.addEventListener('change', this.onFinalValuesVisible);

        let markers = document.getElementById("markers");
        markers.addEventListener('change', this.onMarkersVisible);
    }

    public onCrosshairsVisible = (e: any) => {
        this.crosshairsVisible = e.target.checked;
        if (this.crosshairsVisible) {
            this.crosshairsMode = CrosshairsDisplayMode.Both;
        }
        else {
            this.crosshairsMode = CrosshairsDisplayMode.None;
        }
        this.chart.crosshairsDisplayMode = this.crosshairsMode;
        this.chart.crosshairsAnnotationEnabled = this.crosshairsVisible;
    }
    public onCalloutsVisible = (e: any) => {
        this.calloutsVisible = e.target.checked;
        this.chart.calloutsVisible = this.calloutsVisible;
    }
    public onFinalValuesVisible = (e: any) => {
        this.finalValuesVisible = e.target.checked;
        this.chart.finalValueAnnotationsVisible = this.finalValuesVisible;
    }
    public onMarkersVisible = (e: any) => {
        this.chart.markerTypes.clear();
        this.markersTypes = e.target.checked ? MarkerType.Circle : MarkerType.None;
        this.chart.markerTypes.add(this.markersTypes);
    }

    getData(): any[] {
        const stockData = StocksUtility.GetStocks();

        let minVal: number = Number.MAX_VALUE;
        let maxVal: number = Number.MIN_VALUE;
        let minIndex: number = 0;
        let maxIndex: number = 0;
        let idx: number = 0;
        let currentYear = 0;
        let currentQuarter = 0;

        // adding annotation data for some data item
        for (const item of stockData) {

            if (minVal > item.close) {
                minVal = item.close;
                minIndex = idx;
            }
            if (maxVal < item.close) {
                maxVal = item.close;
                maxIndex = idx;
            }
            const itemYear = StocksUtility.GetYear(item.date);
            if (currentYear !== itemYear) {
                currentYear = itemYear;
                item.info = itemYear;
            }

            const itemQuarter = StocksUtility.GetQuarter(item.date);
            if (currentQuarter !== itemQuarter) {
                currentQuarter = itemQuarter;
                item.info = "Q" + itemQuarter;
            }

            item.index = idx;
            item.value = item.close;
            idx++;
        }

        let intervalSplit = Math.round(stockData.length / 3) - 1;
        for (let i = intervalSplit; i < stockData.length; i += intervalSplit) {
            stockData[i].info = "SPLIT";
        }

        let intervalDividend = Math.round(stockData.length / 4) - 1;
        for (let i = intervalDividend; i < stockData.length; i += intervalDividend) {
            stockData[i].info = "DIV";
        }

        stockData[minIndex].info = "MIN";
        stockData[maxIndex].info = "MAX";

        return stockData;
    }
}