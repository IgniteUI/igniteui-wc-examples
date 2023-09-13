import { IgcDataChartCoreModule, IgcCategoryXAxisComponent, IgcDataChartCategoryModule, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcPlotAreaMouseButtonEventArgs, IgcPlotAreaMouseEventArgs, IgcLegendModule, IgcAnnotationLayerProxyModule, IgcDataChartScatterCoreModule, IgcNumberAbbreviatorModule, IgcScatterSeriesComponent, IgcPointSeriesComponent, IgcFinancialPriceSeriesComponent, IgcDataChartCategoryCoreModule, IgcDataChartFinancialCoreModule, IgcDataChartFinancialModule, IgcDataChartFinancialOverlaysModule, IgcDataChartToolbarModule, IgcDataChartComponent, IgcLegendComponent, IgcRangeAreaSeriesComponent, IgcSeriesViewerComponent, IgcLineSeriesComponent, IgcNumericYAxisComponent, IgcCategoryAngleAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcToolActionLabelComponent, IgcToolCommandEventArgs, IgcToolbarComponent, IgcToolbarModule } from 'igniteui-webcomponents-layouts';
import { StockItem, StocksHistory } from './StocksHistory';
import { IgPoint, ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcToolbarModule,
    IgcLegendModule,
    IgcDataChartToolbarModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartFinancialCoreModule,
    IgcDataChartFinancialModule,
    IgcDataChartFinancialOverlaysModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule
);

export class Sample {    

    private data: any[];    
    private chart: IgcDataChartComponent;
    private xAxis: IgcCategoryXAxisComponent;
    private yAxis: IgcNumericYAxisComponent;

    private axisMinValue: number;
    private axisMaxValue: number;

    private chartMouseDownLocation: IgPoint;
    private chartMouseMoveLocation: IgPoint;

    private toolbar: IgcToolbarComponent;
    private drawHorizontalLineToolAction: IgcToolActionLabelComponent;
    private drawSlopeLineToolAction: IgcToolActionLabelComponent;
    private drawRangeAreaToolAction: IgcToolActionLabelComponent;

    private drawMode: string;

    private isAxisRangeInitialized: boolean;
    private isDrawingHorizontalLine: boolean;
    private isDrawingRangeArea: boolean;
    private isDrawingSlopeLine: boolean;    

    private horizontalLine: IgcLineSeriesComponent;
    private rangeArea: IgcRangeAreaSeriesComponent;
    private slopeLine: IgcLineSeriesComponent;
    
    constructor() {        

        const legend = document.getElementById("legend") as IgcLegendComponent;
        this.chart = document.getElementById("chart") as IgcDataChartComponent;
        
        this.toolbar = document.getElementById("toolbar") as IgcToolbarComponent;        
        this.toolbar.target = this.chart;
       
        this.drawHorizontalLineToolAction = document.getElementById("drawHorizontalLineToolAction") as IgcToolActionLabelComponent;
        this.drawSlopeLineToolAction = document.getElementById("drawSlopeLineToolAction") as IgcToolActionLabelComponent;
        this.drawRangeAreaToolAction = document.getElementById("drawRangeAreaToolAction") as IgcToolActionLabelComponent;

        this.xAxis = document.getElementById("xAxis") as IgcCategoryXAxisComponent;
        this.xAxis.formatLabel = this.onFormatXAxisLabel.bind(this);   

        this.yAxis = document.getElementById("yAxis") as IgcNumericYAxisComponent;

        let financialSeries = document.getElementById("financialSeries") as IgcFinancialPriceSeriesComponent;
                
        this.horizontalLine = document.getElementById("horizontalLine") as IgcLineSeriesComponent;
        this.rangeArea = document.getElementById("rangeAreaSeries") as IgcRangeAreaSeriesComponent;
        this.slopeLine = document.getElementById("slopeLine") as IgcLineSeriesComponent;
        
        StocksHistory.getMicrosoftStock().then((stocks: any[]) => {
            this.data = stocks;
            this.xAxis.dataSource = this.data;
            financialSeries.dataSource = this.data; 
            
            this.plotHorizontalLine(38, true);
            this.plotRangeArea(50, 60, true);
            this.plotSlopeLine({x: 0, y:45}, {x: this.data.length - 1, y: 80}, true);
        });

        this.chart.legend = legend;

        this.chart.plotAreaMouseOver = this.onChartMouseOver.bind(this);
        this.chart.plotAreaMouseLeftButtonDown = this.onChartMouseLeftButtonDown.bind(this);
        this.chart.plotAreaMouseLeftButtonUp = this.onChartMouseLeftButtonUp.bind(this);
        this.toolbar.onCommand = this.onToolbarCommandChanged.bind(this);

        this.initializeAxisRange = this.initializeAxisRange.bind(this);
    }

    public onChartMouseLeftButtonDown(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseButtonEventArgs){
        this.initializeAxisRange();
        if (!this.isAxisRangeInitialized) return;    

        if (this.drawMode == "DrawHorizontalLine") this.isDrawingHorizontalLine = true; 
        if (this.drawMode == "DrawSlopeLine") this.isDrawingSlopeLine = true; 
        if (this.drawMode == "DrawRangeArea") this.isDrawingRangeArea = true; 

        this.chartMouseDownLocation = this.getDataLocation(e.plotAreaPosition); 
        this.chartMouseMoveLocation = this.getDataLocation(e.plotAreaPosition); 

        this.plotRangeArea(this.chartMouseDownLocation.y, this.chartMouseMoveLocation.y, false); 
        this.plotSlopeLine(this.chartMouseDownLocation, this.chartMouseMoveLocation, false); 
        this.plotHorizontalLine(this.chartMouseMoveLocation.y, false); 
    }

    public onChartMouseOver(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseEventArgs){
        if (!this.isAxisRangeInitialized) return; 

        this.chartMouseMoveLocation = this.getDataLocation(e.plotAreaPosition);        

        this.plotRangeArea(this.chartMouseDownLocation.y, this.chartMouseMoveLocation.y, false); 
        this.plotSlopeLine(this.chartMouseDownLocation, this.chartMouseMoveLocation, false); 
        this.plotHorizontalLine(this.chartMouseMoveLocation.y, false);         
    }

    public onChartMouseLeftButtonUp(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseButtonEventArgs){
        this.isDrawingSlopeLine = false;
        this.isDrawingRangeArea = false;
        this.isDrawingHorizontalLine = false;   
    }

    public initializeAxisRange(){
        if (this.isAxisRangeInitialized) return;
        this.isAxisRangeInitialized = true;        

        this.axisMaxValue = this.yAxis.actualMaximumValue;
        this.axisMinValue = this.yAxis.actualMinimumValue;        

        this.yAxis.maximumValue = this.axisMaxValue;
        this.yAxis.minimumValue = this.axisMinValue;
    }

    public getDataLocation(chartPixel: IgPoint): IgPoint
    {    
        var x = this.xAxis.unscaleValue(chartPixel.x);
        var y = this.yAxis.unscaleValue(chartPixel.y);

        return {x: x, y: y};
    }

    public plotHorizontalLine(value: number, forceRender: boolean){
        if(!forceRender){
            if(!this.isAxisRangeInitialized) return;
            if(!this.isDrawingHorizontalLine) return;
        }

        let dataPoints: any[] = [];

        for(let i=0; i<this.data.length; i++){
            let point: IgPoint = { x: i, y: value};
            dataPoints.push(point);            
        }

        this.horizontalLine.dataSource = dataPoints;
    }

    public plotSlopeLine(start: IgPoint, end: IgPoint, forceRender: boolean){
        if(!forceRender){
            if(!this.isAxisRangeInitialized) return;
            if(!this.isDrawingSlopeLine) return;
        }

        let slope = 0.0;
        let offset = end.y;

        if(Math.abs(end.x - start.x) > 0.01){
            slope = (end.y - start.y) / (end.x - start.x);
            offset = end.y - (end.x  * slope);
        }

        let dataPoints: any[] = [];

        for(let i=0; i<this.data.length; i++){
            let y = (slope * i) + offset;
            let point: IgPoint = {x: i, y: y};
            dataPoints.push(point);
        }

        this.slopeLine.dataSource = dataPoints;
    }

    public plotRangeArea(start: number, end: number, forceRender: boolean){
        if(!forceRender){
            if(!this.isAxisRangeInitialized) return;
            if(!this.isDrawingRangeArea) return;
        }

        let low = Math.min(end, start);
        let high = Math.max(end, start);

        let dataPoints: any[] = [];

        for(let i=0; i<this.data.length; i++){
            let point: any = {low: low, high: high};            
            dataPoints.push(point);
        }

        this.rangeArea.dataSource = dataPoints;
    }         

    public onFormatXAxisLabel(item: any): string{
        
        let year = item.date.getFullYear();
        let monthString: string = "";
        let dayString: string = "";        

        if((item.date.getMonth() + 1) < 10){
            monthString = "0" + (item.date.getMonth() + 1);
        }
        else{
            monthString = item.date.getMonth() + 1;
        }

        if((item.date.getDay() + 1) < 10){
            dayString = "0" + (item.date.getDay() + 1);
        }
        else{
            dayString = item.date.getDay() + 1;
        }

        return year + "-" + monthString + "-" + dayString;
    }

    public onToolbarCommandChanged(s: IgcToolbarComponent, e: IgcToolCommandEventArgs){
        this.updateDrawMode(e.command.commandId);
    }

    public updateDrawMode(selectedDrawMode: string){
        switch(selectedDrawMode){
            case "DrawRangeArea":
                this.drawMode = "DrawRangeArea";
                this.drawHorizontalLineToolAction.textStyle = "13px Verdana";
                this.drawSlopeLineToolAction.textStyle = "13px Verdana";
                this.drawRangeAreaToolAction.textStyle = "800 13px Verdana";
                break;

            case "DrawSlopeLine":
                this.drawMode = "DrawSlopeLine";
                this.drawHorizontalLineToolAction.textStyle = "13px Verdana";
                this.drawSlopeLineToolAction.textStyle = "800 13px Verdana";
                this.drawRangeAreaToolAction.textStyle = "13px Verdana";
                break;

            case "DrawHorizontalLine":
                this.drawMode = "DrawHorizontalLine";
                this.drawHorizontalLineToolAction.textStyle = "800 13px Verdana";
                this.drawSlopeLineToolAction.textStyle = "13px Verdana";
                this.drawRangeAreaToolAction.textStyle = "13px Verdana";                
                break;
        }
    }    
}

new Sample();
