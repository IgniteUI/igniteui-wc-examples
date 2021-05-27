import { SampleScatterData } from './SampleScatterData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterAreaSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterAreaSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteColorScaleModule } from 'igniteui-webcomponents-charts';
import { IgcCustomPaletteColorScaleComponent } from 'igniteui-webcomponents-charts';
import { ColorScaleInterpolationMode } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcScatterAreaSeriesModule,
    IgcCustomPaletteColorScaleModule
);

export class DataChartTypeScatterAreaSeries {
    constructor() {
        let chart = document.getElementById('chart') as IgcDataChartComponent;
        chart.dataSource = SampleScatterData.create();

        let colorScale = new IgcCustomPaletteColorScaleComponent();
        colorScale.interpolationMode = ColorScaleInterpolationMode.InterpolateHSV;
        colorScale.minimumValue = -2;
        colorScale.maximumValue = 2;
        colorScale.palette = [ "#8670CB", "#4AC4FF", "#B5CC2E", "#FC8612", "#ED4840" ];

        const series = document.getElementById('series') as IgcScatterAreaSeriesComponent;
        series.colorScale = colorScale;
    }
}

new DataChartTypeScatterAreaSeries();
