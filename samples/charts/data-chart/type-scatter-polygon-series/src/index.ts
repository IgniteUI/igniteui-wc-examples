import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolygonSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolygonSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStyleShapeEventArgs } from 'igniteui-webcomponents-charts';
import { DataContext } from 'igniteui-webcomponents-core';
import { html } from 'lit-html';
import "./MapLegendStyles.css";

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartShapeCoreModule,
    IgcDataChartShapeModule,
    IgcDataChartInteractivityModule,
    IgcScatterPolygonSeriesModule
);

export class DataChartTypeScatterPolygonSeries {

    constructor() {

        this.onAirplaneShapesLoaded = this.onAirplaneShapesLoaded.bind(this);
        this.onAirplaneSeatsLoaded = this.onAirplaneSeatsLoaded.bind(this);
        this.createTooltip = this.createTooltip.bind(this);

        fetch('https://static.infragistics.com/xplatform/json/airplane-shape.json')
            .then((response) => response.json())
            .then((data) => this.onAirplaneShapesLoaded(data));

        fetch('https://static.infragistics.com/xplatform/json/airplane-seats.json')
            .then((response) => response.json())
            .then((data) => this.onAirplaneSeatsLoaded(data));
    }

    public onAirplaneShapesLoaded(jsonData: any[]) {
        console.log('onAirplaneShapesLoaded');
        let airplaneShapeSeries = (document.getElementById('airplaneShapeSeries') as IgcScatterPolygonSeriesComponent);
        airplaneShapeSeries.dataSource = jsonData;
        airplaneShapeSeries.renderSeries(false);
    }

    public onAirplaneSeatsLoaded(jsonData: any[]) {
        console.log('onAirplaneSeatsLoaded');
        let airplaneSeatSeries = (document.getElementById('airplaneSeatSeries') as IgcScatterPolygonSeriesComponent);
        airplaneSeatSeries.styleShape = this.onStylingShape;
        airplaneSeatSeries.dataSource = jsonData;
        airplaneSeatSeries.tooltipTemplate = this.createTooltip;
        airplaneSeatSeries.renderSeries(false);
    }

    public onStylingShape(sender: any, args: IgcStyleShapeEventArgs) {

        args.shapeOpacity = 1.0;
        args.shapeStrokeThickness = 0.5;
        args.shapeStroke = "Black";
        args.shapeFill = "White";

        const itemRecord = args.item as any;
        if (itemRecord.class === 'First') {
            args.shapeFill = "DodgerBlue";
        }
        if (itemRecord.class === 'Business') {
            args.shapeFill = "LimeGreen";
        }
        if (itemRecord.class === 'Premium') {
            args.shapeFill = "Orange";
        }
        if (itemRecord.class === 'Economy') {
            args.shapeFill = "Red";
        }

        if (itemRecord.status === 'Sold') {
            args.shapeFill = 'Gray';
        }
    }

    public createTooltip(context: any) {
        const dataContext = context as DataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        let tooltip = html`<div>

        <div style='display: 'inline-block', marginLeft: 5'>
            <div class='tooltipBox'>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Class</div>
                    <div class='tooltipVal'>${dataItem.class}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Seat</div>
                    <div class='tooltipVal'>${dataItem.seat} </div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Price</div>
                    <div class='tooltipVal'>${dataItem.price}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Status</div>
                    <div class='tooltipVal'>${dataItem.status}</div>
                </div>
            </div>
        </div>`;
        return tooltip;
    }
}

new DataChartTypeScatterPolygonSeries();
