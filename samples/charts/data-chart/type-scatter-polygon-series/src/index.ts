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
        let airplaneShapeSeries = document.getElementById('airplaneShapeSeries') as IgcScatterPolygonSeriesComponent;
        airplaneShapeSeries.dataSource = jsonData;
    }

    public onAirplaneSeatsLoaded(jsonData: any[]) {
        let airplaneSeatSeries = document.getElementById('airplaneSeatSeries') as IgcScatterPolygonSeriesComponent;
        airplaneSeatSeries.styleShape = this.onStylingShape;
        airplaneSeatSeries.dataSource = jsonData;
        airplaneSeatSeries.tooltipTemplate = this.createTooltip;
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

        let tooltip = html`
            <div class='ui-tooltip-content'>
                <div>Class: ${dataItem.class}</div>
                <div>Seat: ${dataItem.seat}</div>
                <div>Price: $${dataItem.price}</div>
                <div>Status: ${dataItem.status}</div>
            </div>`;
        return tooltip;
    }
}

new DataChartTypeScatterPolygonSeries();
