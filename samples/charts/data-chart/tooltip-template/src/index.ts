import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcChartMouseEventArgs } from 'igniteui-webcomponents-charts'
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SampleCategoryData } from './SampleCategoryData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcColumnSeriesModule
);

export class DataChartTooltipTemplate {

    private chart: IgcDataChartComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = SampleCategoryData.create();
        this.chart.seriesMouseEnter = this.onSeriesMouseEnter;
    }

    public onSeriesMouseEnter = (s: any, e: IgcChartMouseEventArgs) => {
        if (e.series.tooltipTemplate === null ||
            e.series.tooltipTemplate === undefined) {
            e.series.tooltipTemplate = this.createDataChartTooltip;
        }
    }
    
    public createDataChartTooltip(context: any) {
        if (!context) return null;
    
        var dataItem = context.item;
        if (!dataItem) return null;
    
        var dataSeries = context.series;
        if (!dataSeries) return null;
    
        var tooltip = document.createElement("div");
        tooltip.className = "ui-tooltip-content";
    
        var title = document.createElement("div");
        title.innerHTML = dataItem.Country + " Production";
        title.className = "tooltipTitle";
        tooltip.appendChild(title);
    
        var line1 = DataChartTooltipTemplate.createDataChartTooltipLine(dataSeries, "Coal", dataItem.Coal);
        var line2 = DataChartTooltipTemplate.createDataChartTooltipLine(dataSeries, "Hydro", dataItem.Hydro);
        var line3 = DataChartTooltipTemplate.createDataChartTooltipLine(dataSeries, "Nuclear", dataItem.Nuclear);
        var line4 = DataChartTooltipTemplate.createDataChartTooltipLine(dataSeries, "Gas", dataItem.Gas);
        var line5 = DataChartTooltipTemplate.createDataChartTooltipLine(dataSeries, "Oil", dataItem.Oil);
    
        tooltip.appendChild(line1);
        tooltip.appendChild(line2);
        tooltip.appendChild(line3);
        tooltip.appendChild(line4);
        tooltip.appendChild(line5);
    
        return tooltip;
    }
    
    public static createDataChartTooltipLine(dataSeries: any, dataName: string, dataValue: string): any {
    
        var label = document.createElement("label");
        label.innerHTML = dataName + ":";
        label.className = "tooltipLbl";
        label.style.width = "4rem";
    
        var value = document.createElement("label");
        value.innerHTML = dataValue;
        value.className = "tooltipVal";
    
        var line = document.createElement("div");
        line.className = "tooltipHorizontal";
    
        // applying conditional styling based on mapping of the current series
        var isMatching = dataSeries.valueMemberPath == dataName;
        if (isMatching)
            line.style.color = dataSeries.actualBrush;
        else
            line.style.color = "black";
    
        line.appendChild(label);
        line.appendChild(value);
        return line;
    }
}

new DataChartTooltipTemplate();
