import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcColumnSeriesComponent } from 'igniteui-webcomponents-charts';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataTemplateMeasureInfo } from 'igniteui-webcomponents-core';
import { DataTemplateRenderInfo } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcLineSeriesModule
);

export class DataChartSeriesMarkerTemplate {

    private chart: IgcDataChartComponent;
    private series: IgcColumnSeriesComponent;

    constructor() {

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.getData();

        this.series = document.getElementById('series') as IgcColumnSeriesComponent;
        this.series.markerTemplate = this.getMarker();
    }

    getData(): any[] {
        let numbers : number[] = [80, 50, 75, 100, 80, 40, 80, 75, 80, 85, 50, 85, 50, 75, 100, 80, 40, 80, 75, 80, 85, 50, 85, 50, 75, 100];

        let data : any[] = [];

        for(let i=0; i<numbers.length; i++){
            data.push({ Label: i.toString(), Value: numbers[i]});
        }

        return data;
    }

    public getMarker(): any
    {
        let style = { outline: "#9FB328", fill: "white", text: "black" };
        const size = 12;

        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                const data = measureInfo.data;
                const context = measureInfo.context;
                let value = "0.00";
                let item = data.item as any;
                if (item != null) {
                    value = item.Value.toString();
                }
                const height = context.measureText("M").width;
                const width = context.measureText(value).width;
                measureInfo.width = width;
                measureInfo.height = height + size;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                const item = renderInfo.data.item as any;
                const value = item.Value.toString();

                const ctx = renderInfo.context as CanvasRenderingContext2D;
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;

                let halfHeight = renderInfo.availableHeight / 2.0;

                if (renderInfo.isHitTestRender) {
                    ctx.fillStyle = renderInfo.data.actualItemBrush.fill;

                    let width = renderInfo.availableWidth;
                    let height = renderInfo.availableHeight;

                    ctx.fillRect(x - (width / 2), y - (height / 2), renderInfo.availableWidth, renderInfo.availableHeight);
                    return;
                }

                ctx.beginPath();
                ctx.fillStyle = style.outline;

                let xOffset = 14;
                let yOffset = 10;

                if(renderInfo.data.item.Value >= 100){
                    xOffset = 20;
                }

                let width = renderInfo.availableWidth + xOffset;
                let height = halfHeight + yOffset;

                ctx.fillRect(x - (width / 2), y - (height / 2), width, height);
                ctx.closePath();

                ctx.font = '8pt Verdana';
                ctx.textBaseline = 'top';
                ctx.fillStyle = style.fill;
                ctx.fillText(value, x - (xOffset / 2), y - (yOffset / 2));
            }
        }
    }
}

export function initialize() {
  return new DataChartSeriesMarkerTemplate();
}