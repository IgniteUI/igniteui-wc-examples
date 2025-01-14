import { IgcFinancialChartModule } from "igniteui-webcomponents-charts";
import { IgcFinancialChartComponent } from "igniteui-webcomponents-charts";
import { FinancialChartVolumeType } from "igniteui-webcomponents-charts";
import { FinancialChartType } from "igniteui-webcomponents-charts";
import { FinancialChartZoomSliderType } from "igniteui-webcomponents-charts";
import { FinancialIndicatorType } from "igniteui-webcomponents-charts";
import { ModuleManager } from "igniteui-webcomponents-core";
import { StocksUtility } from "./StocksUtility";

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartPanes {

    private chart: IgcFinancialChartComponent;

    constructor() {

        this.chart = document.getElementById("chart") as IgcFinancialChartComponent;
        this.chart.dataSource = this.initData();

        this.chart.volumeType = FinancialChartVolumeType.Area;
        this.chart.indicatorTypes.add(FinancialIndicatorType.AbsoluteVolumeOscillator);

        let volumeTypeSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("volumeTypeSelect");
        volumeTypeSelect!.value = "Area";
        volumeTypeSelect!.addEventListener("change", this.volumeTypeChanged);

        let chartTypeSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("chartTypeSelect");
        chartTypeSelect!.value = "Line";
        chartTypeSelect!.addEventListener("change", this.chartTypeChanged);

        let zoomTypeSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById("zoomTypeSelect");
        zoomTypeSelect!.value = "Line";
        zoomTypeSelect!.addEventListener("change", this.zoomTypeChanged);
    }

    initData(): any[] {
        return StocksUtility.getStocksForMonths(12);
    }

    public volumeTypeChanged = (e: any) => {
        const mode: string  = e.target.value;
        if (mode === "Time") {
            this.chart.volumeType = FinancialChartVolumeType.Line;
        } else if (mode === "Area") {
            this.chart.volumeType = FinancialChartVolumeType.Area;
        } else if (mode === "Column") {
            this.chart.volumeType = FinancialChartVolumeType.Column;
        }
    }

    public chartTypeChanged = (e: any) => {
        const mode: string = e.target.value;
        if (mode === "Bar") {
            this.chart.chartType = FinancialChartType.Bar;
        } else if (mode === "Candle") {
            this.chart.chartType = FinancialChartType.Candle;
        } else if (mode === "Line") {
            this.chart.chartType = FinancialChartType.Line;
        } else if (mode === "Column") {
            this.chart.chartType = FinancialChartType.Column;
        }
    }

    public zoomTypeChanged = (e: any) => {
        const mode: string = e.target.value;
        if (mode === "Bar") {
            this.chart.zoomSliderType = FinancialChartZoomSliderType.Bar;
        } else if (mode === "Candle") {
            this.chart.zoomSliderType = FinancialChartZoomSliderType.Candle;
        } else if (mode === "Line") {
            this.chart.zoomSliderType = FinancialChartZoomSliderType.Line;
        } else if (mode === "Column") {
            this.chart.zoomSliderType = FinancialChartZoomSliderType.Column;
        }
    }

}

// tslint:disable-next-line:no-unused-expression
new FinancialChartPanes();
