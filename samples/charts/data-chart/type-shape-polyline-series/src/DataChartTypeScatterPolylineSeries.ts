import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartShapeModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcScatterPolylineSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcStyleShapeEventArgs } from 'igniteui-webcomponents-charts';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { IgcShapefileRecord } from 'igniteui-webcomponents-core';
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

        const url = 'https://static.infragistics.com/xplatform/shapes/airplanes/';

        const airplaneShapeSource = new IgcShapeDataSource();
        airplaneShapeSource.importCompleted = this.onAirplaneShapesLoaded;
        airplaneShapeSource.shapefileSource = url + 'airplane-shape.shp';
        airplaneShapeSource.databaseSource  = url + 'airplane-shape.dbf';
        airplaneShapeSource.dataBind();

        const airplaneSeatSource = new IgcShapeDataSource();
        airplaneSeatSource.importCompleted = this.onAirplaneSeatsLoaded;
        airplaneSeatSource.shapefileSource = url + 'airplane-seats.shp';
        airplaneSeatSource.databaseSource  = url + 'airplane-seats.dbf';
        airplaneSeatSource.dataBind();
    }

    public onAirplaneShapesLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onAirplaneShapesLoaded');
        let airplaneShapes = sds.getPointData();
        let airplaneShapeSeries = (document.getElementById('airplaneShapeSeries') as IgcScatterPolylineSeriesComponent);
        airplaneShapeSeries.dataSource = airplaneShapes;
        airplaneShapeSeries.renderSeries(false);
    }

    public onAirplaneSeatsLoaded(sds: IgcShapeDataSource, e: any) {
        console.log('onAirplaneSeatsLoaded');
        let airplaneShapes = sds.getPointData();
        let airplaneSeatSeries = (document.getElementById('airplaneSeatSeries') as IgcScatterPolylineSeriesComponent);
        airplaneSeatSeries.styleShape = this.onStylingShape;
        airplaneSeatSeries.dataSource = airplaneShapes;
        airplaneSeatSeries.tooltipTemplate = this.createTooltip;
        airplaneSeatSeries.renderSeries(false);
    }

    public onStylingShape(sender: any, args: IgcStyleShapeEventArgs) {

        args.shapeOpacity = 1.0;
        args.shapeStrokeThickness = 0.5;
        // args.shapeStroke = "Black";

        let itemRecord = args.item as IgcShapefileRecord;
        if (itemRecord.fieldValues['Class'] === 'First Class') {
            args.shapeStroke = "DodgerBlue";
        }
        if (itemRecord.fieldValues['Class'] === 'Business Class') {
            args.shapeStroke = "LimeGreen";
        }
        if (itemRecord.fieldValues['Class'] === 'Premium Class') {
            args.shapeStroke = "Orange";
        }
        if (itemRecord.fieldValues['Class'] === 'Economy Class') {
            args.shapeStroke = "Red";
        }

        if (itemRecord.fieldValues['Status'] === 'Sold') {
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
                    <div class='tooltipVal'>${dataItem.fieldValues['Class']}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Seat</div>
                    <div class='tooltipVal'>${dataItem.fieldValues['Seat']} </div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Price</div>
                    <div class='tooltipVal'>${dataItem.fieldValues['Price']}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Status</div>
                    <div class='tooltipVal'>${dataItem.fieldValues['Status']}</div>
                </div>
            </div>
        </div>`;
        return tooltip;
    }

}

new DataChartTypeScatterPolylineSeries();
