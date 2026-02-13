import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { CrosshairsDisplayMode } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { ToolTipType } from 'igniteui-webcomponents-charts';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartAnnotations {

    private chart: IgcFinancialChartComponent;
    private calloutsVisible = true;
    private crosshairsMode = CrosshairsDisplayMode.Both;
    private crosshairsVisible = true;
    private finalValuesVisible = true;
    private markersTypes = MarkerType.None;
    private toolTipType = ToolTipType.Item;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.calloutsVisible = this.calloutsVisible;
        this.chart.crosshairsDisplayMode = this.crosshairsMode;
        this.chart.crosshairsAnnotationEnabled = this.crosshairsVisible;
        this.chart.finalValueAnnotationsVisible = this.finalValuesVisible;
        this.chart.markerTypes.add(this.markersTypes);
        this.chart.toolTipType = this.toolTipType;

        let crosshairs = document.getElementById('crosshairs');
        crosshairs!.addEventListener('change', this.onCrosshairsVisible);

        let callouts = document.getElementById('callouts');
        callouts!.addEventListener('change', this.onCalloutsVisible);

        let useFinalValues = document.getElementById('useFinalValues');
        useFinalValues!.addEventListener('change', this.onFinalValuesVisible);

        let markers = document.getElementById('markers');
        markers!.addEventListener('change', this.onMarkersVisible);

        let itemTooltip = document.getElementById('itemTooltip');
        itemTooltip!.addEventListener('change', this.onItemTooltipChanged);
    }

    public onCrosshairsVisible = (e: any) => {
        this.crosshairsVisible = e.target.checked;
        this.chart.crosshairsDisplayMode = this.crosshairsVisible ? CrosshairsDisplayMode.Both : CrosshairsDisplayMode.None;
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

    public onItemTooltipChanged = (e: any) => {
        this.toolTipType = e.target.checked ? ToolTipType.Item : ToolTipType.None;
        this.chart.toolTipType = this.toolTipType;
    }

    getData(): any[] {
        const stockData = StocksUtility.getStocksForMonths(12);

        let minVal: number = Number.MAX_VALUE;
        let maxVal: number = Number.MIN_VALUE;
        let minIndex: number = 0;
        let maxIndex: number = 0;
        let idx: number = 0;
        let currentYear: number = 0;
        let currentQuarter: number = 0;

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
            const itemYear: number = StocksUtility.getYear(item.date);
            if (currentYear !== itemYear) {
                currentYear = itemYear;
                item.info = itemYear;
            }

            const itemQuarter: number = StocksUtility.getQuarter(item.date);
            if (currentQuarter !== itemQuarter) {
                currentQuarter = itemQuarter;
                item.info = 'Q' + itemQuarter;
            }

            item.index = idx;
            item.value = item.close;
            idx++;
        }

        let intervalSplit: number = Math.round(stockData.length / 3) - 1;
        for (let i = intervalSplit; i < stockData.length; i += intervalSplit) {
            stockData[i].info = 'SPLIT';
        }

        let intervalDividend: number = Math.round(stockData.length / 4) - 1;
        for (let i = intervalDividend; i < stockData.length; i += intervalDividend) {
            stockData[i].info = 'DIV';
        }

        stockData[minIndex].info = 'MIN';
        stockData[maxIndex].info = 'MAX';

        return stockData;
    }
}

export function initialize() {
  return new FinancialChartAnnotations();
}