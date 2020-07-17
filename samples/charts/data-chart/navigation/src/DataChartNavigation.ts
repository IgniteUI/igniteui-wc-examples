

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcValueBrushScaleComponent } from 'igniteui-webcomponents-charts';
import { ModifierKeys } from 'igniteui-webcomponents-core';
import { InteractionState } from 'igniteui-webcomponents-core';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { SampleScatterStats } from './SampleScatterStats';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcBubbleSeriesModule,
    IgcNumberAbbreviatorModule
);


export class DataChartNavigation {


    
    
        

    private chart: IgcDataChartComponent;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.createSeries();
        this.chart.actualWindowScaleHorizontal = 0.60;
        this.chart.actualWindowScaleVertical = 0.60;
        this.chart.actualWindowPositionVertical = 0.20;
        this.chart.actualWindowPositionHorizontal = 0.20;

        this.chart.isVerticalZoomEnabled = true;
        this.chart.isHorizontalZoomEnabled = true;
        this.chart.panModifier = ModifierKeys.Control;
        this.chart.dragModifier = ModifierKeys.Alt;
        this.chart.defaultInteraction = InteractionState.DragZoom;

        const panUp = document.getElementById('panUp') as HTMLButtonElement;
        panUp.addEventListener('click', this.onPanUpClick);

        const panLeft = document.getElementById('panLeft') as HTMLButtonElement;
        panLeft.addEventListener('click', this.onPanLeftClick);

        const zoomIn = document.getElementById('zoomIn') as HTMLButtonElement;
        zoomIn.addEventListener('click', this.onZoomInClick);

        const panDown = document.getElementById('panDown') as HTMLButtonElement;
        panDown.addEventListener('click', this.onPanDownClick);

        const panRight = document.getElementById('panRight') as HTMLButtonElement;
        panRight.addEventListener('click', this.onPanRightClick);

        const zoomOut = document.getElementById('zoomOut') as HTMLButtonElement;
        zoomOut.addEventListener('click', this.onZoomOutClick);

        const panModSelect = document.getElementById('panModSelect') as HTMLSelectElement;
        panModSelect.value = 'Alt';
        panModSelect.addEventListener('change', this.onPanModifierChange);

        const interactionSelect = document.getElementById('interactionSelect') as HTMLSelectElement;
        interactionSelect.addEventListener('change', this.onDefaultInteractionChange);

        const dragModSelect = document.getElementById('dragModSelect') as HTMLSelectElement;
        dragModSelect.addEventListener('change', this.onDragModifierChange);

        const zoomEnabled = document.getElementById('zoomEnabled') as HTMLInputElement;
        zoomEnabled.checked = true;
        zoomEnabled.addEventListener('change', this.onZoomEnabledChange);

    }

    public onDefaultInteractionChange = (e: any) => {
        let defaultInteraction: InteractionState;
        switch (e.target.value) {
            case 'DragZoom':
                defaultInteraction = InteractionState.DragZoom;
                break;
            case 'DragPan':
                defaultInteraction = InteractionState.DragPan;
                break;
            case 'None':
                defaultInteraction = InteractionState.None;
                break;
        }
        this.chart.defaultInteraction = defaultInteraction;
    }

    public onPanModifierChange = (e: any) => {
        let panModifier: ModifierKeys;
        switch (e.target.value) {
            case 'Alt':
                panModifier = ModifierKeys.Alt;
                break;
            case 'Control':
                panModifier = ModifierKeys.Control;
                break;
            case 'Shift':
                panModifier = ModifierKeys.Shift;
                break;
            case 'Windows':
                panModifier = ModifierKeys.Windows;
                break;
            case 'Apple':
                panModifier = ModifierKeys.Apple;
                break;
            case 'None':
                panModifier = ModifierKeys.None;
                break;
        }
        this.chart.panModifier = panModifier;
    }

    public onDragModifierChange = (e: any) => {
        let dragModifier: ModifierKeys;
        switch (e.target.value) {
            case 'Alt':
                dragModifier = ModifierKeys.Alt;
                break;
            case 'Control':
                dragModifier = ModifierKeys.Control;
                break;
            case 'Shift':
                dragModifier = ModifierKeys.Shift;
                break;
            case 'Windows':
                dragModifier = ModifierKeys.Windows;
                break;
            case 'Apple':
                dragModifier = ModifierKeys.Apple;
                break;
            case 'None':
                dragModifier = ModifierKeys.None;
                break;
        }
        this.chart.dragModifier = dragModifier;
    }

    public onZoomEnabledChange = (e: any) => {
        const isZoomEnabled = e.target.checked;
        this.chart.isHorizontalZoomEnabled = isZoomEnabled;
        this.chart.isVerticalZoomEnabled = isZoomEnabled;
    }

    public onPanUpClick = (e: any) => {
        this.chart.actualWindowPositionVertical -= 0.05;
    }

    public onPanDownClick = (e: any) => {
        this.chart.actualWindowPositionVertical += 0.05;
    }

    public onPanLeftClick = (e: any) => {
        this.chart.actualWindowPositionHorizontal -= 0.05;
    }

    public onPanRightClick = (e: any) => {
        this.chart.actualWindowPositionHorizontal += 0.05;
    }

    public onZoomOutClick = (e: any) => {
        if (this.chart.actualWindowPositionHorizontal > 0.025) {
            this.chart.actualWindowPositionHorizontal -= 0.025;
        }
        if (this.chart.actualWindowPositionVertical > 0.025) {
            this.chart.actualWindowPositionVertical -= 0.025;
        }

        if (this.chart.actualWindowScaleHorizontal < 1.0) {
            this.chart.actualWindowScaleHorizontal += 0.05;
        }
        if (this.chart.actualWindowScaleVertical < 1.0) {
            this.chart.actualWindowScaleVertical += 0.05;
        }
    }

    public onZoomInClick = (e: any) => {
        if (this.chart.actualWindowPositionHorizontal < 1.0) {
            this.chart.actualWindowPositionHorizontal += 0.025;
        }
        if (this.chart.actualWindowPositionVertical < 1.0) {
            this.chart.actualWindowPositionVertical += 0.025;
        }

        if (this.chart.actualWindowScaleHorizontal > 0.05) {
            this.chart.actualWindowScaleHorizontal -= 0.05;
        }
        if (this.chart.actualWindowScaleVertical > 0.05) {
            this.chart.actualWindowScaleVertical -= 0.05;
        }

    }

    public createSeries() {
        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 10;
        sizeScale.maximumValue = 60;

        const brushScale1 = new IgcValueBrushScaleComponent();
        brushScale1.brushes = ['#FFFFFF', '#b56ffc'];
        brushScale1.minimumValue = 10;
        brushScale1.maximumValue = 60;

        const series = new IgcBubbleSeriesComponent();
        series.title = 'Countries';
        series.dataSource = SampleScatterStats.getCountries();
        series.showDefaultTooltip = true;
        series.xMemberPath = 'Population';
        series.yMemberPath = 'GdpTotal';
        series.radiusMemberPath = 'GdpPerCapita';
        series.radiusScale = sizeScale;
        // series.fillMemberPath = 'GdpPerCapita';
        // series.fillScale = brushScale1;
        series.xAxisName = 'xAxis';
        series.yAxisName = 'yAxis';

        this.chart.series.clear();
        this.chart.series.add(series);
    }

    getData(): any[] {
        const data = SampleScatterStats.getCountriesWithHighIncome();
        return data;
    }
}

let sample = new DataChartNavigation();