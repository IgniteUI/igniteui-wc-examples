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
import "./MapLegendStyles.css";

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

new DataChartTypeScatterPolylineSeries();
