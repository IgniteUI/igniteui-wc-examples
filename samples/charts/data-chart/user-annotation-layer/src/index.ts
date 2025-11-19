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
    private annotationTextArea: IgcTextareaComponent;
    private annotationBadgeColorEditor: IgcColorEditorComponent;
    private annotationMainColorEditor: IgcColorEditorComponent;
    private currentAnnotationInfo: IgcUserAnnotationInformation;

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
        this.annotationTextArea = document.getElementById('annotationTextArea') as IgcTextareaComponent;
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

    public onUserAnnotationInformationRequested(s: IgcSeriesViewerComponent, e: IgcUserAnnotationInformationEventArgs){        
        this.currentAnnotationInfo = e.annotationInfo;
        this.toggleDialogState(true);
    }

    public onUserAnnotationToolTipContentUpdating(s: IgcSeriesViewerComponent, e: IgcUserAnnotationToolTipContentUpdatingEventArgs) {
        var tooltipText = e.annotationInfo.annotationData;

        if (e.content.children.length == 0) {
            var element = document.createElement("div");
            element.textContent = tooltipText;
            e.content.appendChild(element);
        }
        else {
            var element: HTMLDivElement = e.content.children[0];
            element.textContent = tooltipText;
        }
    }

    public onDoneBtnClick() {

        this.currentAnnotationInfo.label = this.annotationInput.value;
        this.currentAnnotationInfo.annotationData = this.annotationTextArea.value;
        this.currentAnnotationInfo.mainColor = this.annotationMainColorEditor.value;
        this.currentAnnotationInfo.badgeColor = this.annotationBadgeColorEditor.value;

        this.chart.finishAnnotationFlow(this.currentAnnotationInfo);
        this.toggleDialogState(false);
    }

    public onCancelBtnClick(){        
        this.chart.cancelAnnotationFlow(this.currentAnnotationInfo.annotationId);
        this.toggleDialogState(false);
    }

    public toggleDialogState(open: boolean) : void{
        var popup = document.getElementsByClassName('annotationPopup')[0] as HTMLDivElement;
        
        if(open){
            popup.style.display = "block";
        }
        else{
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
