import { ModuleManager } from 'igniteui-webcomponents-core';
// data chart's modules:
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
// financial series modules:
import { IgcDataChartFinancialModule } from 'igniteui-webcomponents-charts';
// data chart's elements:
import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcFinancialPriceSeriesComponent } from 'igniteui-webcomponents-charts';
import { InteractionState } from 'igniteui-webcomponents-core';
import { ModifierKeys } from 'igniteui-webcomponents-core';
import { SampleFinancialData } from './SampleFinancialData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartFinancialModule,
    IgcDataChartInteractivityModule,
);

export class DataChartNavigation {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleFinancialData.create();

        this.chart.actualWindowScaleHorizontal = 0.60;
        this.chart.actualWindowScaleVertical = 0.60;
        this.chart.actualWindowPositionVertical = 0.20;
        this.chart.actualWindowPositionHorizontal = 0.20;

        const panUp = document.getElementById('panUp') as HTMLButtonElement;
        panUp!.addEventListener('click', this.onPanUpClick);

        const panLeft = document.getElementById('panLeft') as HTMLButtonElement;
        panLeft!.addEventListener('click', this.onPanLeftClick);

        const zoomIn = document.getElementById('zoomIn') as HTMLButtonElement;
        zoomIn!.addEventListener('click', this.onZoomInClick);

        const panDown = document.getElementById('panDown') as HTMLButtonElement;
        panDown!.addEventListener('click', this.onPanDownClick);

        const panRight = document.getElementById('panRight') as HTMLButtonElement;
        panRight!.addEventListener('click', this.onPanRightClick);

        const zoomOut = document.getElementById('zoomOut') as HTMLButtonElement;
        zoomOut!.addEventListener('click', this.onZoomOutClick);

        const panModSelect = document.getElementById('panModSelect') as HTMLSelectElement;
        panModSelect!.value = 'Alt';
        panModSelect!.addEventListener('change', this.onPanModifierChange);

        const interactionSelect = document.getElementById('interactionSelect') as HTMLSelectElement;
        interactionSelect!.value = 'DragPan';
        interactionSelect!.addEventListener('change', this.onDefaultInteractionChange);

        const dragModSelect = document.getElementById('dragModSelect') as HTMLSelectElement;
        dragModSelect!.value = 'Shift';
        dragModSelect!.addEventListener('change', this.onDragModifierChange);

        const zoomEnabled = document.getElementById('zoomEnabled') as HTMLInputElement;
        zoomEnabled!.checked = true;
        zoomEnabled!.addEventListener('change', this.onZoomEnabledChange);
    }

    public onDefaultInteractionChange = (e: any) => {
        switch (e.target.value) {
            case 'DragZoom':
                this.chart.defaultInteraction = InteractionState.DragZoom;
                break;
            case 'DragPan':
                this.chart.defaultInteraction = InteractionState.DragPan;
                break;
            case 'None':
                this.chart.defaultInteraction = InteractionState.None;
                break;
        }
    }

    public onPanModifierChange = (e: any) => {
        switch (e.target.value) {
            case 'Alt':
                this.chart.panModifier = ModifierKeys.Alt;
                break;
            case 'Control':
                this.chart.panModifier = ModifierKeys.Control;
                break;
            case 'Shift':
                this.chart.panModifier = ModifierKeys.Shift;
                break;
            case 'Windows':
                this.chart.panModifier = ModifierKeys.Windows;
                break;
            case 'Apple':
                this.chart.panModifier = ModifierKeys.Apple;
                break;
            case 'None':
                this.chart.panModifier = ModifierKeys.None;
                break;
        }
    }

    public onDragModifierChange = (e: any) => {
        switch (e.target.value) {
            case 'Alt':
                this.chart.dragModifier = ModifierKeys.Alt;
                break;
            case 'Control':
                this.chart.dragModifier = ModifierKeys.Control;
                break;
            case 'Shift':
                this.chart.dragModifier = ModifierKeys.Shift;
                break;
            case 'Windows':
                this.chart.dragModifier = ModifierKeys.Windows;
                break;
            case 'Apple':
                this.chart.dragModifier = ModifierKeys.Apple;
                break;
            case 'None':
                this.chart.dragModifier = ModifierKeys.None;
                break;
        }
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
}

export function initialize() {
  return new DataChartNavigation();
}