import { IgcToolbarModule } from 'igniteui-webcomponents-layouts';
import { IgcDataChartToolbarModule, IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartAnnotationModule, IgcDataChartInteractivityModule, IgcAnnotationLayerProxyModule, IgcDataChartCategoryTrendLineModule, IgcUserAnnotationInformation } from 'igniteui-webcomponents-charts';
import { IgcToolbarComponent } from 'igniteui-webcomponents-layouts';
import { IgcDataChartComponent, IgcCategoryXAxisComponent, IgcNumericYAxisComponent, IgcLineSeriesComponent,
    IgcSeriesViewerComponent, IgcUserAnnotationInformationEventArgs,
    IgcUserAnnotationToolTipContentUpdatingEventArgs } from 'igniteui-webcomponents-charts';
import { CountryRenewableElectricity } from './CountryRenewableElectricity';
import { defineComponents, IgcInputComponent, IgcTextareaComponent } from 'igniteui-webcomponents';
import { IgcColorEditorComponent, IgcColorEditorModule } from 'igniteui-webcomponents-inputs';

import { ModuleManager } from 'igniteui-webcomponents-core';
import "./index.css";
import "igniteui-webcomponents/themes/light/bootstrap.css";

defineComponents(IgcTextareaComponent, IgcInputComponent);

ModuleManager.register(
    IgcToolbarModule,
    IgcDataChartToolbarModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartAnnotationModule,
    IgcDataChartInteractivityModule,
    IgcAnnotationLayerProxyModule,
    IgcDataChartCategoryTrendLineModule,
    IgcColorEditorModule
);

export class Sample {    
    private chart: IgcDataChartComponent
    private xAxis: IgcCategoryXAxisComponent
    private yAxis: IgcNumericYAxisComponent
    private annotationInput: IgcInputComponent;    
    private annotationDetails: IgcTextareaComponent;
    private annotationBadgeColorEditor: IgcColorEditorComponent;
    private annotationMainColorEditor: IgcColorEditorComponent;
    private annotationInfo: IgcUserAnnotationInformation;

    private _bind: () => void;

    constructor() {
        var toolbar = document.getElementById('toolbar') as IgcToolbarComponent;
        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.xAxis = document.getElementById('xAxis') as IgcCategoryXAxisComponent;
        this.yAxis = document.getElementById('yAxis') as IgcNumericYAxisComponent;
        var lineSeries1 = document.getElementById('lineSeries1') as IgcLineSeriesComponent;
        var lineSeries2 = document.getElementById('lineSeries2') as IgcLineSeriesComponent;
        var lineSeries3 = document.getElementById('lineSeries3') as IgcLineSeriesComponent;  
        this.annotationInput = document.getElementById('annotationInput') as IgcInputComponent;
        this.annotationDetails = document.getElementById('annotationDetails') as IgcTextareaComponent;
        this.annotationMainColorEditor = document.getElementById('annotationMainColorEditor') as IgcColorEditorComponent;
        this.annotationBadgeColorEditor = document.getElementById('annotationBadgeColorEditor') as IgcColorEditorComponent;

        var doneButton = document.getElementById('doneButton') as HTMLButtonElement;
        var cancelButton = document.getElementById('cancelButton') as HTMLButtonElement;

        this.chart.userAnnotationInformationRequested = this.onUserAnnotationInformationRequested.bind(this);
        this.chart.userAnnotationToolTipContentUpdating = this.onUserAnnotationToolTipContentUpdating.bind(this);

        doneButton.onclick = this.onDoneBtnClick.bind(this);
        cancelButton.onclick = this.onCancelBtnClick.bind(this);

        this._bind = () => {
            toolbar.target = this.chart;
            this.xAxis.dataSource = this.countryRenewableElectricity;
            lineSeries1.xAxis = this.xAxis;
            lineSeries1.yAxis = this.yAxis;
            lineSeries1.dataSource = this.countryRenewableElectricity;
            lineSeries2.xAxis = this.xAxis;
            lineSeries2.yAxis = this.yAxis;
            lineSeries2.dataSource = this.countryRenewableElectricity;
            lineSeries3.xAxis = this.xAxis;
            lineSeries3.yAxis = this.yAxis;
            lineSeries3.dataSource = this.countryRenewableElectricity;
        }

        this._bind();
    }

    public onUserAnnotationInformationRequested(s: IgcSeriesViewerComponent, e: IgcUserAnnotationInformationEventArgs) {
        this.annotationInfo = e.annotationInfo;
        this.toggleDialogState(true);
    }

    public onUserAnnotationToolTipContentUpdating(s: IgcSeriesViewerComponent, e: IgcUserAnnotationToolTipContentUpdatingEventArgs) {
        var tooltipText = e.annotationInfo.annotationData;

        if (e.content.children.length == 0) {
            var element = document.createElement("div");
            element.textContent = tooltipText;
            element.style = "color: white";
            e.content.appendChild(element);
        }
        else {
            var element: HTMLDivElement = e.content.children[0];
            element.textContent = tooltipText;
        }
    }

    public onDoneBtnClick() {

        this.annotationInfo.label = this.annotationInput.value;
        this.annotationInfo.annotationData = this.annotationDetails.value;
        this.annotationInfo.mainColor = this.annotationMainColorEditor.value;
        this.annotationInfo.badgeColor = this.annotationBadgeColorEditor.value;

        this.chart.finishAnnotationFlow(this.annotationInfo);
        this.toggleDialogState(false);
    }

    public onCancelBtnClick() {

        if (this.annotationInfo !== undefined && this.annotationInfo.annotationId !== undefined)
        { 
            this.chart.cancelAnnotationFlow(this.annotationInfo.annotationId);
        }

        this.toggleDialogState(false);
    }

    public toggleDialogState(open: boolean) : void{
        var popup = document.getElementById('annotationPopup') as HTMLDivElement;
        
        if (open) {
            popup.style.display = "flex";
        }
        else {
            popup.style.display = "none";
        }
    }

    private _countryRenewableElectricity: CountryRenewableElectricity = null;
    public get countryRenewableElectricity(): CountryRenewableElectricity {
        if (this._countryRenewableElectricity == null)
        {
            this._countryRenewableElectricity = new CountryRenewableElectricity();
        }
        return this._countryRenewableElectricity;
    }

}

new Sample();
