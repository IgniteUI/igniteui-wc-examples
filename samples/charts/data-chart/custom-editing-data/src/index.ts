import { IgcDataChartCoreModule, IgcDataChartScatterModule, IgcCategoryXAxisComponent, IgcLineSeriesComponent, IgcDataChartCategoryModule, IgcSeriesViewerComponent, IgcDataChartMouseButtonEventArgs, IgcChartMouseEventArgs, IgcDataChartInteractivityModule, IgcDataChartAnnotationModule, IgcPlotAreaMouseButtonEventArgs, IgcPlotAreaMouseEventArgs, IgcLegendModule, IgcAnnotationLayerProxyModule, IgcDataChartScatterCoreModule, IgcNumberAbbreviatorModule, IgcScatterSeriesComponent, IgcPointSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcScatterLineSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcLegendModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartScatterModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcAnnotationLayerProxyModule,
    IgcNumberAbbreviatorModule
);

export class Sample {    

    private lineData: any[];
    private scatterData: any[];

    private lineChart: IgcDataChartComponent;
    private lineXAxis: IgcCategoryXAxisComponent;
    private lineYAxis: IgcNumericYAxisComponent;

    private scatterChart: IgcDataChartComponent;
    private scatterXAxis: IgcNumericXAxisComponent;
    private scatterYAxis: IgcNumericYAxisComponent;

    private lineSeriesEditingActive = false;
    private lineSeriesEditingIndex = -1;

    private scatterLineEditingActive = false;
    private scatterLineEditingIndex = -1;
    
    constructor() {        
        this.lineData = this.getLineData();
        this.scatterData = this.getScatterData();

        this.lineChart = document.getElementById('lineChart') as IgcDataChartComponent;
        this.scatterChart = document.getElementById('scatterChart') as IgcDataChartComponent;

        this.lineXAxis = document.getElementById('LineXAxis') as IgcCategoryXAxisComponent;
        this.lineYAxis = document.getElementById('LineYAxis') as IgcNumericYAxisComponent;

        this.scatterXAxis = document.getElementById('ScatterXAxis') as IgcNumericXAxisComponent;
        this.scatterYAxis = document.getElementById('ScatterYAxis') as IgcNumericYAxisComponent;

        var lineSeries = document.getElementById("lineSeries") as IgcLineSeriesComponent;    
        var pointSeries = document.getElementById("pointSeries") as IgcPointSeriesComponent;
        var scatterLineSeries = document.getElementById("scatterLineSeries") as IgcScatterLineSeriesComponent;
        var scatterSeries = document.getElementById("scatterSeries") as IgcScatterSeriesComponent;

        this.lineXAxis.dataSource = this.lineData;
        lineSeries.dataSource = this.lineData;
        pointSeries.dataSource = this.lineData;
        
        scatterLineSeries.dataSource = this.scatterData;
        scatterSeries.dataSource = this.scatterData;

        this.lineChart.seriesMouseLeftButtonDown = this.onLineSeriesMouseLeftButtonDown.bind(this);
        this.lineChart.plotAreaMouseOver = this.onLineChartPlotMouseMove.bind(this);        
        this.lineChart.plotAreaMouseLeftButtonUp = this.onLineChartPlotMouseLeftButtonUp.bind(this);

        this.scatterChart.seriesMouseLeftButtonDown = this.onScatterLineSeriesMouseLeftButtonDown.bind(this);
        this.scatterChart.plotAreaMouseOver = this.onScatterChartPlotAreaMouseMove.bind(this);
        this.scatterChart.plotAreaMouseLeftButtonUp = this.onScatterChartPlotAreaMouseLeftButtonUp.bind(this);
    }

    public getLineData(): any[]{
        var lineData: any[] = [
            { Category: "2010", DataValue: 20, EditingValue: null },
            { Category: "2011", DataValue: 40, EditingValue: null },
            { Category: "2012", DataValue: 30, EditingValue: null },
            { Category: "2013", DataValue: 50, EditingValue: null },
            { Category: "2014", DataValue: 40, EditingValue: null },
            { Category: "2015", DataValue: 60, EditingValue: null },
            { Category: "2016", DataValue: 30, EditingValue: null },
            { Category: "2017", DataValue: 50, EditingValue: null },
            { Category: "2018", DataValue: 40, EditingValue: null },
            { Category: "2019", DataValue: 70, EditingValue: null },
            { Category: "2020", DataValue: 40, EditingValue: null },
            { Category: "2021", DataValue: 60, EditingValue: null },
            { Category: "2022", DataValue: 50, EditingValue: null },
            { Category: "2023", DataValue: 70, EditingValue: null },
            { Category: "2024", DataValue: 60, EditingValue: null },
            { Category: "2025", DataValue: 80, EditingValue: null },
            { Category: "2026", DataValue: 70, EditingValue: null }
        ];

        return lineData;
    }

    public getScatterData(): any[] {
        var scatterData: any[] = [
            { X: 10, Y: 20, EditingX: null, EditingY: null },
            { X: 11, Y: 40, EditingX: null, EditingY: null },
            { X: 12, Y: 30, EditingX: null, EditingY: null },
            { X: 13, Y: 50, EditingX: null, EditingY: null },
            { X: 14, Y: 40, EditingX: null, EditingY: null },
            { X: 15, Y: 60, EditingX: null, EditingY: null },
            { X: 16, Y: 30, EditingX: null, EditingY: null },
            { X: 17, Y: 50, EditingX: null, EditingY: null },
            { X: 18, Y: 40, EditingX: null, EditingY: null },
            { X: 19, Y: 70, EditingX: null, EditingY: null },
            { X: 20, Y: 40, EditingX: null, EditingY: null },
            { X: 21, Y: 60, EditingX: null, EditingY: null },
            { X: 22, Y: 50, EditingX: null, EditingY: null },
            { X: 23, Y: 70, EditingX: null, EditingY: null },
            { X: 24, Y: 60, EditingX: null, EditingY: null },
            { X: 25, Y: 80, EditingX: null, EditingY: null },
            { X: 26, Y: 70, EditingX: null, EditingY: null }
        ];
        return scatterData;
    }

    public onLineSeriesMouseLeftButtonDown(s: IgcSeriesViewerComponent, e: IgcDataChartMouseButtonEventArgs){
        this.lineSeriesEditingActive = true;
        this.lineSeriesEditingIndex = -1;

        var itemData = e.item;
        
        for(var i=0; i<this.lineData.length; i++){
            
            var lineDataItem = this.lineData[i];            
            var newItemData = { Category: lineDataItem.Category, DataValue: lineDataItem.DataValue, EditingValue: lineDataItem.EditingValue };   

            newItemData.EditingValue = null;

            if(lineDataItem.Category === itemData.Category){
                this.lineSeriesEditingIndex = i;
            }

            this.lineChart.notifySetItem(this.lineData, i, lineDataItem, newItemData);
        }
    }

    public onLineChartPlotMouseMove(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseEventArgs) {
        if (this.lineSeriesEditingIndex !== -1) {
            var index = this.lineSeriesEditingIndex;

            var oldItem = this.lineData[index];
            var newItem = { Category: oldItem.Category, DataValue: oldItem.DataValue, EditingValue: oldItem.EditingValue };

            if (!this.lineSeriesEditingActive) {
                newItem.EditingValue = null;
                this.lineChart.notifySetItem(this.lineData, index, oldItem, newItem);
            }
            else {
                var y = this.lineYAxis.unscaleValue(e.chartPosition.y);

                newItem.DataValue = y;
                newItem.EditingValue = y;

                oldItem.DataValue = y;
                oldItem.EditingValue = y;

                this.lineChart.notifySetItem(this.lineData, index, oldItem, newItem);
            }
        }
    }

    public onLineChartPlotMouseLeftButtonUp(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseButtonEventArgs){
        this.lineSeriesEditingActive = false;
    }

    public onScatterLineSeriesMouseLeftButtonDown(s: IgcSeriesViewerComponent, e: IgcDataChartMouseButtonEventArgs){
        this.scatterLineEditingActive = true;
        this.scatterLineEditingIndex = -1;

        var itemData = e.item;
        
        for(var i=0; i<this.scatterData.length; i++){
            
            var scatterDataItem = this.scatterData[i];            
            var newItemData = { X: scatterDataItem.X, Y: scatterDataItem.Y, EditingX: scatterDataItem.EditingX, EditingY: scatterDataItem.EditingY };   

            newItemData.EditingX = null;
            newItemData.EditingY = null;

            if(scatterDataItem.X === itemData.X && scatterDataItem.Y === itemData.Y){
                this.scatterLineEditingIndex = i;
            }

            this.scatterChart.notifySetItem(this.lineData, i, scatterDataItem, newItemData);
        }
    }

    public onScatterChartPlotAreaMouseMove(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseEventArgs){
        if (this.scatterLineEditingIndex !== -1) {
            var index = this.scatterLineEditingIndex;

            var oldItem = this.scatterData[index];
            var newItem = { X: oldItem.X, Y: oldItem.Y, EditingX: oldItem.EditingX, EditingY: oldItem.EditingY };

            if (!this.scatterLineEditingActive) {
                newItem.EditingX = null;
                newItem.EditingY = null;
                this.scatterChart.notifySetItem(this.scatterData, index, oldItem, newItem);
            }
            else {
                var x = this.scatterXAxis.unscaleValue(e.chartPosition.x);
                var y = this.scatterYAxis.unscaleValue(e.chartPosition.y);

                newItem.X = x;
                newItem.EditingX = x;

                newItem.Y = y;
                newItem.EditingY = y;

                oldItem.X = x;
                oldItem.EditingX = x;

                oldItem.Y = y;
                oldItem.EditingY = y;

                this.scatterChart.notifySetItem(this.scatterData, index, oldItem, newItem);
            }
        }
    }

    public onScatterChartPlotAreaMouseLeftButtonUp(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseButtonEventArgs){
        this.scatterLineEditingActive = false;
    }
}

new Sample();
