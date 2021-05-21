import { SampleScatterStats } from './SampleScatterStats';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcLegendModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterLineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcScatterSplineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterSplineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { BrushSelectionMode } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcBubbleSeriesModule,
    IgcScatterSeriesModule,
    IgcScatterLineSeriesModule,
    IgcScatterSplineSeriesModule,
    IgcLegendModule
);

export class DataChartTypeScatterSeries {

    private chart: IgcDataChartComponent;
    private legend: IgcLegendComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;

        this.legend = document.getElementById('legend') as IgcLegendComponent;
        this.chart.legend = this.legend;
        this.setSeries('Point');

        const seriesTypeSelect = document.getElementById('seriesTypeSelect') as HTMLSelectElement;
        seriesTypeSelect!.value = 'Point';
        seriesTypeSelect!.addEventListener('change', this.onSeriesTypeChanged);
    }

    public onSeriesTypeChanged = (e: any) => {
        const selectedSeries = e.target.value.toString();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {
        if (seriesType === "Point") {
            const series1 = new IgcScatterSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.showDefaultTooltip = true;
            series1.title = "High Income Countries";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";
            series1.xMemberPath = "Population";
            series1.yMemberPath = "GdpTotal";
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
            
            const series2 = new IgcScatterSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.showDefaultTooltip = true;
            series2.title = "Low Income Countries";
            series2.xAxisName = "xAxis";
            series2.yAxisName = "yAxis";
            series2.xMemberPath = "Population";
            series2.yMemberPath = "GdpTotal";
            series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
            
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        } else if (seriesType === "Line") {
            const series1 = new IgcScatterLineSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.showDefaultTooltip = true;
            series1.title = "High Income Countries";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";
            series1.xMemberPath = "Population";
            series1.yMemberPath = "GdpTotal";
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();

            const series2 = new IgcScatterLineSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.showDefaultTooltip = true;
            series2.title = "Low Income Countries";
            series2.xAxisName = "xAxis";
            series2.yAxisName = "yAxis";
            series2.xMemberPath = "Population";
            series2.yMemberPath = "GdpTotal";
            series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
            
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        } else if (seriesType === "Spline") {
            const series1 = new IgcScatterSplineSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.showDefaultTooltip = true;
            series1.title = "High Income Countries";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";
            series1.xMemberPath = "Population";
            series1.yMemberPath = "GdpTotal";
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
            
            const series2 = new IgcScatterSplineSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.showDefaultTooltip = true;
            series2.title = "Low Income Countries";
            series2.xAxisName = "xAxis";
            series2.yAxisName = "yAxis";
            series2.xMemberPath = "Population";
            series2.yMemberPath = "GdpTotal";
            series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
            
            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        } else if (seriesType === "Bubble") {
            const series1 = new IgcBubbleSeriesComponent();
            series1.markerType = MarkerType.Circle;
            series1.showDefaultTooltip = true;
            series1.title = "High Income Countries";
            series1.xAxisName = "xAxis";
            series1.yAxisName = "yAxis";
            series1.xMemberPath = "Population";
            series1.yMemberPath = "GdpTotal";
            series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();

            const series2 = new IgcBubbleSeriesComponent();
            series2.markerType = MarkerType.Circle;
            series2.showDefaultTooltip = true;
            series2.title = "Low Income Countries";
            series2.xAxisName = "xAxis";
            series2.yAxisName = "yAxis";
            series2.xMemberPath = "Population";
            series2.yMemberPath = "GdpTotal";
            series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();

            this.chart.series.clear();
            this.chart.series.add(series1);
            this.chart.series.add(series2);
        }
    }
}

new DataChartTypeScatterSeries();
