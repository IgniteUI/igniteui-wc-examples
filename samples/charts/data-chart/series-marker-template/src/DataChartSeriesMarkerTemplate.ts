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
        const markerHeight = 25;
        const markerWidth = 40;

        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                measureInfo.width = markerWidth;
                measureInfo.height = markerHeight;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                const item = renderInfo.data.item as any;    
                const value = item.Value.toString(); 
                
                const ctx = renderInfo.context as CanvasRenderingContext2D;                
                                
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;

                ctx.fillStyle = "#9FB328";                
                ctx.fillRect(x - (markerWidth / 2), y - (markerHeight / 2), markerWidth, markerHeight);

                ctx.fillStyle = "white";

                let textMeasure : TextMetrics = ctx.measureText(value);
                
                let textHeight = Math.abs(textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent);

                ctx.fillText(value, x - (textMeasure.width / 2), y - ((textHeight / 2)));            
            }
        }
    }
}

new DataChartSeriesMarkerTemplate();
