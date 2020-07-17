

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcNumericYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { BrushSelectionMode } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';


import { SampleScatterStats } from './SampleScatterStats';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcNumberAbbreviatorModule,
    IgcBubbleSeriesModule,
    IgcNumericYAxisModule,
    IgcNumericXAxisModule
);


export class DataChartTypeScatterBubbleSeries {


    
    
        

    private chart: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.setSeries();
    }

    public setSeries() {
        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 10;
        sizeScale.maximumValue = 60;

        const brushScale1 = new IgcValueBrushScaleComponent();
        brushScale1.brushes = ['#FFFFFF', '#b56ffc'];
        brushScale1.minimumValue = 10;
        brushScale1.maximumValue = 60;

        const series1 = new IgcBubbleSeriesComponent();
        series1.title = 'Large Countries';
        series1.markerType = MarkerType.Circle;
        series1.dataSource = SampleScatterStats.getCountriesWithLargePop();
        series1.showDefaultTooltip = true;
        series1.xMemberPath = 'Population';
        series1.yMemberPath = 'GdpTotal';
        series1.radiusMemberPath = 'GdpPerCapita';
        series1.radiusScale = sizeScale;
        // series1.fillMemberPath = 'GdpPerCapita';
        // series1.fillScale = brushScale1;
        series1.xAxisName = 'xAxis';
        series1.yAxisName = 'yAxis';

        const brushScale2 = new IgcCustomPaletteBrushScaleComponent();
        brushScale2.brushes = ['#FFFFFF', '#b56ffc'];
        brushScale2.brushSelectionMode = BrushSelectionMode.Interpolate;

        const series2 = new IgcBubbleSeriesComponent();
        series2.title = 'Small Countries';
        series2.markerType = MarkerType.Circle;
        series2.dataSource = SampleScatterStats.getCountriesWithSmallPop();
        series2.showDefaultTooltip = true;
        series2.xMemberPath = 'Population';
        series2.yMemberPath = 'GdpTotal';
        series2.radiusMemberPath = 'GdpPerCapita';
        series2.radiusScale = sizeScale;
        // series2.fillMemberPath = 'GdpPerCapita';
        // series2.fillScale = brushScale2;
        series2.xAxisName = 'xAxis';
        series2.yAxisName = 'yAxis';

        this.chart.series.clear();
        this.chart.series.add(series1);
        this.chart.series.add(series2);

    }
}

let sample = new DataChartTypeScatterBubbleSeries();