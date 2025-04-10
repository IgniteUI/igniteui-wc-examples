import { html } from 'lit-html';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { DataContext } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapBindingShapefilePolylines {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.onDataLoaded = this.onDataLoaded.bind(this);

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.updateZoomWindow({ left: 0.2, top: 0.1, width: 0.6, height: 0.6 });

        const url = 'https://static.infragistics.com/xplatform';
        // loading a shapefile with geographic polygons
        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = url + '/shapes/WorldCableRoutes.shp';
        sds.databaseSource  = url + '/shapes/WorldCableRoutes.dbf';
        sds.dataBind();
    }

    public onDataLoaded(sds: IgcShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log('loaded WorldCities.shp ' + shapeRecords.length);

        const geoPolylines: any[] = [];
        // parsing shapefile data and creating geo-polygons
        for (const record of shapeRecords) {
            // using field/column names from .DBF file
            const route = {
                points: record.points,
                name: record.fieldValues.Name,
                capacity: record.fieldValues.CapacityG,
                distance: record.fieldValues.DistanceKM
            };
            geoPolylines.push(route);
        }

        const geoSeries = new IgcGeographicPolylineSeriesComponent();
        geoSeries.name = 'series';
        geoSeries.dataSource = geoPolylines;
        geoSeries.shapeMemberPath = 'points';
        geoSeries.shapeFilterResolution = 0.0;
        geoSeries.shapeStrokeThickness = 3;
        geoSeries.shapeStroke = 'rgb(82, 82, 82, 0.4)';
        geoSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(geoSeries);
    }

    public createTooltip(context: any): any {
        const dataContext = context.dataContext as DataContext;
        if (!dataContext) return null;

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const capacity = dataItem.capacity + ' GB/s';
        const distance = dataItem.distance + ' KM';

        return html`<div>
            <div class='tooltipBox'>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Name</div>
                    <div class='tooltipVal'>${dataItem.name}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Distance</div>
                    <div class='tooltipVal'>${distance}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Capacity</div>
                    <div class='tooltipVal'>${capacity}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Service</div>
                    <div class='tooltipVal'>${dataItem.service}</div>
                </div>
            </div>`;
    }

}

new MapBindingShapefilePolylines();
