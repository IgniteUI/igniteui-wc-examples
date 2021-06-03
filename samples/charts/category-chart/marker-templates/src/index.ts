import { IgcCategoryChartModule, IgcChartSeriesEventArgs, IgcCategoryChartComponent, IgcDomainChartComponent,
         IgcColumnSeriesComponent, IgcLegendModule, IgcLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager, DataTemplateMeasureInfo, DataTemplateRenderInfo } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);
ModuleManager.register(IgcLegendModule);

export class CategoryChartMarkerTemplates {

    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.onSeriesAdded = this.onSeriesAdded.bind(this);
        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.seriesAdded = this.onSeriesAdded;
        this.chart.dataSource = this.data;
        
        this.chart.legend = document.getElementById("legend") as IgcLegendComponent;
    }

    public initData() {
        this.data = [
            { Location: "World", Solar: 23, Coal: -1, Hydropower: 1, Wind: 12, Nuclear: 3 },
            { Location: "China", Solar: 26, Coal: 2, Hydropower: 5, Wind: 10, Nuclear: 18 },
            { Location: "U.S.", Solar: 15, Coal: -15, Hydropower: -7, Wind: 10, Nuclear: 1 },
            { Location: "EU", Solar: 11, Coal: -12, Hydropower: -2, Wind: 14, Nuclear: -1 }
        ];
    }

    public onSeriesAdded(s: IgcDomainChartComponent, e: IgcChartSeriesEventArgs){        
        let series : IgcColumnSeriesComponent = e.series as IgcColumnSeriesComponent;
        series.markerTemplate = this.getMarker();
    }

    public getMarker(): any {
        let style = { outline: "#8B5BB1", fill: "white", text: "black" };
        const size = 12;

        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                const context = measureInfo.context;
                const height = context.measureText("M").width;
                const width = context.measureText("0.00").width;
                measureInfo.width = width;
                measureInfo.height = height + 12;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                let ctx = renderInfo.context;
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;

                if (renderInfo.isHitTestRender) {
                    ctx.fillStyle = renderInfo.data.actualItemBrush.fill;

                    let width = renderInfo.availableWidth;
                    let height = renderInfo.availableHeight;

                    ctx.fillRect(x - (width / 2), y - (height), renderInfo.availableWidth, renderInfo.availableHeight);
                    return;
                }


                const dataItem = renderInfo.data.item;
                if (dataItem === null) return;

                const series = renderInfo.data.series;
                const dataPath = series.valueColumn.propertyName;

                let dataValue = 0;
                switch (dataPath) {
                    case "Solar": dataValue = dataItem.Solar; break;
                    case "Coal": dataValue = dataItem.Coal; break;
                    case "Hydropower": dataValue = dataItem.Hydropower; break;
                    case "Wind": dataValue = dataItem.Wind; break;
                    case "Nuclear": dataValue = dataItem.Nuclear; break;
                }
                ctx.font = '8pt Verdana';
                ctx.textBaseline = 'top';
                ctx.fillStyle = "black";

                let xOffset = 20;
                let yOffset = 10;
                if (dataValue < 0) {
                    ctx.fillText(dataValue + "%", x - (xOffset / 2), y + (yOffset));
                }
                else {
                    ctx.fillText(dataValue + "%", x - (xOffset / 2), y - (yOffset * 2));
                }

                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
            }
        }
    }
}

new CategoryChartMarkerTemplates();
