import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcCalloutLayerModule } from 'igniteui-webcomponents-charts';
import { IgcCrosshairLayerModule } from 'igniteui-webcomponents-charts';
import { IgcFinalValueLayerModule } from 'igniteui-webcomponents-charts';
import { IgcValueOverlayModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcCalloutLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcCrosshairLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcFinalValueLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcValueOverlayComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcSeriesComponent } from 'igniteui-webcomponents-charts';
import { FinalValueSelectionMode } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule,
    IgcCalloutLayerModule,
    IgcCrosshairLayerModule,
    IgcFinalValueLayerModule,
    IgcValueOverlayModule
);

export class DataChartSeriesAnnotations {

    private chart: IgcDataChartComponent;

    public targetSeries: IgcColumnSeriesComponent;

    public calloutLayer: IgcCalloutLayerComponent;
    public crosshairLayer: IgcCrosshairLayerComponent;
    public finalValueLayer: IgcFinalValueLayerComponent;
    public valueOverlay: IgcValueOverlayComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        const xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        xAxis.formatLabel = this.formatDateLabel;

        const callouts = document.getElementById('callouts') as HTMLInputElement;
        callouts.checked = true;
        callouts!.addEventListener('change', this.onCalloutChange);

        const finalValue = document.getElementById('finalValue') as HTMLInputElement;
        finalValue.checked = true;
        finalValue!.addEventListener('change', this.onFinalValueChange);

        const crosshairs = document.getElementById('crosshairs') as HTMLInputElement;
        crosshairs.checked = true;
        crosshairs!.addEventListener('change', this.onCrosshairChange);

        /*const valueOverlay = document.getElementById('valueOverlay') as HTMLInputElement;
        valueOverlay.checked = true;
        valueOverlay!.addEventListener('change', this.onValueOverlayChange);*/

        this.calloutLayer = new IgcCalloutLayerComponent();
        this.calloutLayer.xMemberPath = 'index';
        this.calloutLayer.yMemberPath = 'value';
        this.calloutLayer.labelMemberPath = 'value';
        this.calloutLayer.brush = 'gray';
        this.calloutLayer.outline = 'white';

        this.crosshairLayer = new IgcCrosshairLayerComponent();
        this.crosshairLayer.isAxisAnnotationEnabled = true;
        this.crosshairLayer.yAxisAnnotationInterpolatedValuePrecision = 0;
        this.crosshairLayer.brush = '#9FB328';
        this.crosshairLayer.outline = 'Black';

        this.finalValueLayer = new IgcFinalValueLayerComponent();
        this.finalValueLayer.axisAnnotationInterpolatedValuePrecision = 0;
        this.finalValueLayer.axisAnnotationTextColor = 'White';
        this.finalValueLayer.finalValueSelectionMode = FinalValueSelectionMode.FinalVisibleInterpolated;
        const series1 = document.getElementById('series1') as IgcColumnSeriesComponent;
        this.finalValueLayer.targetSeries = series1;

        this.valueOverlay = new IgcValueOverlayComponent();
        this.valueOverlay.thickness = 3;
        this.valueOverlay.value = 100;
        this.valueOverlay.brush = 'Green';
        this.valueOverlay.isAxisAnnotationEnabled = true;
        const yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        this.valueOverlay.axis = yAxis;

        this.toggleCrosshairs(true);
        this.toggleCallouts(true);
        this.toggleFinalValues(true);
        this.toggleValueOverlay(true);
    }

    public onFinalValueChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleFinalValues(isChecked);
    }

    public onCalloutChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleCallouts(isChecked);
    }

    public onCrosshairChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleCrosshairs(isChecked);
    }

    public onValueOverlayChange = (e: any) => {
        const isChecked: boolean = e.target.checked;
        this.toggleValueOverlay(isChecked);
    }

    public toggleCrosshairs(isChecked: boolean) {
        this.toggleSeries(this.crosshairLayer, isChecked);
    }

    public toggleFinalValues(isChecked: boolean) {
        this.toggleSeries(this.finalValueLayer, isChecked);
    }

    public toggleCallouts(isChecked: boolean) {
        this.toggleSeries(this.calloutLayer, isChecked);
    }

    public toggleValueOverlay(isChecked: boolean) {
        this.valueOverlay.isAxisAnnotationEnabled = isChecked;
        this.toggleSeries(this.valueOverlay, isChecked);
    }

    public toggleSeries(series: IgcSeriesComponent, isChecked: boolean) {
        if (isChecked) {
            this.chart.series.add(series);
        }
        else {
            this.chart.series.remove(series);
        }
    }

    public formatDateLabel(item: any): string {
        const months = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];
        return months[item.date.getMonth()];
    }

    getData(): any[] {
        const year: number = new Date().getFullYear();
        const data = [
            { temperature: 74, date: new Date(year, 0, 1), index: 0, value: 0 },
            { temperature: 74, date: new Date(year, 1, 1), index: 0, value: 0 },
            { temperature: 76, date: new Date(year, 2, 1), index: 0, value: 0 },
            { temperature: 78, date: new Date(year, 3, 1), index: 0, value: 0 },
            { temperature: 83, date: new Date(year, 4, 1), index: 0, value: 0 },
            { temperature: 87, date: new Date(year, 5, 1), index: 0, value: 0 },
            { temperature: 94, date: new Date(year, 6, 1), index: 0, value: 0 },
            { temperature: 97, date: new Date(year, 7, 1), index: 0, value: 0 },
            { temperature: 93, date: new Date(year, 8, 1), index: 0, value: 0 },
            { temperature: 86, date: new Date(year, 9, 1), index: 0, value: 0 },
            { temperature: 81, date: new Date(year, 10, 1), index: 0, value: 0 },
            { temperature: 79, date: new Date(year, 11, 1), index: 0, value: 0 },
        ];

        let idx: number = 0;
        for (const item of data) {
             item.index = idx;
            item.value = item.temperature;
            idx++;
        }

        return data;
    }
}

new DataChartSeriesAnnotations();
