import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStyleShapeEventArgs } from 'igniteui-webcomponents-charts';
import { DataContext } from 'igniteui-webcomponents-core';
import { html } from 'lit-html';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartShapeCoreModule,
    IgcDataChartShapeModule,
    IgcDataChartInteractivityModule,
    IgcScatterPolylineSeriesModule
);

export class DataChartTypeScatterPolylineSeries {

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
        let airplaneShapeSeries = (document.getElementById('airplaneShapeSeries') as IgcScatterPolylineSeriesComponent);
        airplaneShapeSeries.dataSource = jsonData;
        airplaneShapeSeries.renderSeries(false);
    }

    public onAirplaneSeatsLoaded(jsonData: any[]) {
        console.log('onAirplaneSeatsLoaded');
        let airplaneSeatSeries = (document.getElementById('airplaneSeatSeries') as IgcScatterPolylineSeriesComponent);
        airplaneSeatSeries.styleShape = this.onStylingShape;
        airplaneSeatSeries.dataSource = jsonData;
        airplaneSeatSeries.tooltipTemplate = this.createTooltip;
        airplaneSeatSeries.renderSeries(false);
    }

    public onStylingShape(sender: any, args: IgcStyleShapeEventArgs) {

        args.shapeOpacity = 1.0;
        args.shapeStrokeThickness = 1.0;
        args.shapeStroke = "Black";

        const itemRecord = args.item as any;
        if (itemRecord.class === 'First') {
            args.shapeStroke = "DodgerBlue";
        }
        if (itemRecord.class === 'Business') {
            args.shapeStroke = "LimeGreen";
        }
        if (itemRecord.class === 'Premium') {
            args.shapeStroke = "Orange";
        }
        if (itemRecord.class === 'Economy') {
            args.shapeStroke = "Red";
        }

        if (itemRecord.status === 'Sold') {
            args.shapeStroke = 'Gray';
        }
    }

    public createTooltip(context: any): any {
        const dataContext = context as DataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        let tooltip = html`<div>
        <div class='ui-tooltip-content'>
            <div>Class: ${dataItem.class}</div>
            <div>Seat: ${dataItem.seat}</div>
            <div>Price: $${dataItem.price}</div>
            <div>Status: ${dataItem.status}</div>
        </div>`;
        return tooltip;
    }

}

new DataChartTypeScatterPolylineSeries();
