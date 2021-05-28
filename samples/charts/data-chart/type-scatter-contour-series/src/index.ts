import { SampleScatterData } from './SampleScatterData';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule, IgcLinearContourValueResolverComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterContourSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterContourSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleModule } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcLinearContourValueResolverModule } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcScatterContourSeriesModule,
    IgcValueBrushScaleModule,
    IgcLinearContourValueResolverModule
);

export class DataChartTypeScatterContourSeries {
    constructor() {
        let chart = document.getElementById('chart') as IgcDataChartComponent;
        chart!.dataSource = SampleScatterData.create();

        let brushScale = new IgcValueBrushScaleComponent();
        brushScale.minimumValue = -2;
        brushScale.maximumValue = 2;
        brushScale.brushes = [ "#8670CB", "#4AC4FF", "#B5CC2E", "#FC8612", "#ED4840" ];

        const series = document.getElementById('series') as IgcScatterContourSeriesComponent;
        series!.fillScale = brushScale;
    }
}

new DataChartTypeScatterContourSeries();
