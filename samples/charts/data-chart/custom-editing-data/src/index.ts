import { EditableDataSource } from './EditableDataSource';
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
        this.lineData = EditableDataSource.getLineData();
        this.scatterData = EditableDataSource.getScatterData();

        this.lineChart = document.getElementById('lineChart') as IgcDataChartComponent;
        this.scatterChart = document.getElementById('scatterChart') as IgcDataChartComponent;

        this.lineXAxis = document.getElementById('LineXAxis') as IgcCategoryXAxisComponent;
        this.lineYAxis = document.getElementById('LineYAxis') as IgcNumericYAxisComponent;

        this.scatterXAxis = document.getElementById('ScatterXAxis') as IgcNumericXAxisComponent;
        this.scatterYAxis = document.getElementById('ScatterYAxis') as IgcNumericYAxisComponent;

        var lineDataSeries = document.getElementById("lineDataSeries") as IgcLineSeriesComponent;
        var lineEditSeries = document.getElementById("lineEditSeries") as IgcPointSeriesComponent;

        var scatterDataSeries = document.getElementById("scatterDataSeries") as IgcScatterLineSeriesComponent;
        var scatterEditSeries = document.getElementById("scatterEditSeries") as IgcScatterSeriesComponent;

        this.lineXAxis.dataSource = this.lineData;
        lineDataSeries.dataSource = this.lineData;
        lineEditSeries.dataSource = this.lineData;

        scatterDataSeries.dataSource = this.scatterData;
        scatterEditSeries.dataSource = this.scatterData;

        this.lineChart.seriesMouseLeftButtonDown = this.onLineChartMouseDown.bind(this);
        this.lineChart.plotAreaMouseOver = this.onLineChartMouseMove.bind(this);
        this.lineChart.plotAreaMouseLeftButtonUp = this.onLineChartMouseUp.bind(this);

        this.scatterChart.seriesMouseLeftButtonDown = this.onScatterChartMouseDown.bind(this);
        this.scatterChart.plotAreaMouseOver = this.onScatterChartMouseMove.bind(this);
        this.scatterChart.plotAreaMouseLeftButtonUp = this.onScatterChartMouseUp.bind(this);
    }

    public onLineChartMouseDown(s: IgcSeriesViewerComponent, e: IgcDataChartMouseButtonEventArgs){
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

    public onLineChartMouseMove(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseEventArgs) {
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

    public onLineChartMouseUp(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseButtonEventArgs){
        this.lineSeriesEditingActive = false;
    }

    public onScatterChartMouseDown(s: IgcSeriesViewerComponent, e: IgcDataChartMouseButtonEventArgs){
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

    public onScatterChartMouseMove(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseEventArgs){
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

    public onScatterChartMouseUp(s: IgcSeriesViewerComponent, e: IgcPlotAreaMouseButtonEventArgs){
        this.scatterLineEditingActive = false;
    }
}

new Sample();
