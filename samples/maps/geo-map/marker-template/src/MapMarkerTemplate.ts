
import { WorldLocations } from './WorldLocations';
import { IgcGeographicMapModule, IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule, MarkerType } from 'igniteui-webcomponents-charts';
import { ModuleManager, DataTemplateMeasureInfo, DataTemplateRenderInfo } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapMarkerTemplate {


    private geoMap: IgcGeographicMapComponent;
    private symbolSeries: IgcGeographicSymbolSeriesComponent;

    constructor() {

        this.getMarker = this.getMarker.bind(this);



        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.zoomable = true;

        this.symbolSeries = new IgcGeographicSymbolSeriesComponent();
        this.symbolSeries.dataSource = WorldLocations.getCapitals();
        this.symbolSeries.latitudeMemberPath = 'lat';
        this.symbolSeries.longitudeMemberPath = 'lon';
        this.symbolSeries.thickness = 1;
        this.symbolSeries.markerType = MarkerType.Circle;
        this.symbolSeries.markerOutline = 'White';
        this.symbolSeries.markerBrush = 'DodgerBlue' ;
        this.symbolSeries.markerTemplate = this.getMarker();

        this.geoMap.series.add(this.symbolSeries);
    }

    public getMarker(): any
    {
        let style = { outline: '#7D73E6', fill: 'white', text: 'black' };

        const size = 12;
        const radius = size / 2;
        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                 const data = measureInfo.data;
                const context = measureInfo.context;
                let value = '0.00';
                let item = data.item as any;
                if (item != null) {
                    value = item.pop.toString().toUpperCase();
                }
                const height = context.measureText('M').width;
                const width = context.measureText(value).width;
                measureInfo.width = width;
                measureInfo.height = height + size;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                const item = renderInfo.data.item as any;
                const value = item.pop.toString().toUpperCase();

                const ctx = renderInfo.context as CanvasRenderingContext2D;
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;
                let halfWidth  = renderInfo.availableWidth / 2.0;
                let halfHeight = renderInfo.availableHeight / 2.0;

                if (renderInfo.isHitTestRender) {
                    ctx.fillStyle = renderInfo.data.actualItemBrush.fill;
                    ctx.fillRect(x, y, renderInfo.availableWidth, renderInfo.availableHeight);
                    return;
                } else {
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = style.fill;
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = style.outline;
                    ctx.stroke();
                    ctx.closePath();
                }

                x = renderInfo.xPosition + 5;
                y = renderInfo.yPosition + 7.5;
                if (y < 0) {
                    y -= renderInfo.availableHeight + 7.5;
                }

                let bottomEdge = renderInfo.passInfo.viewportTop + renderInfo.passInfo.viewportHeight;
                if (y + renderInfo.availableHeight > bottomEdge) {
                    y -= renderInfo.availableHeight + 5;
                }

                let rightEdge = renderInfo.passInfo.viewportLeft + renderInfo.passInfo.viewportWidth;
                if (x + renderInfo.availableWidth > rightEdge) {
                    x -= renderInfo.availableWidth + 12;
                }

                ctx.beginPath();
                ctx.fillStyle = style.outline;
                ctx.fillRect(x - 2, y - 2, renderInfo.availableWidth + 8, halfHeight + 6);
                ctx.closePath();

                ctx.font = '8pt Verdana';
                ctx.textBaseline = 'top';
                ctx.fillStyle = style.fill;
                ctx.fillText(value, x + 2, y + 1);

            }
        }
    }

}
