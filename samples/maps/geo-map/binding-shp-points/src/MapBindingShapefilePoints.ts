

import { WorldUtils } from './WorldUtils';

import { html } from 'lit-html';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { DataContext } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);


export class MapBindingShapefilePoints {






    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.onDataLoaded = this.onDataLoaded.bind(this);



        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        const url = 'https://static.infragistics.com/xplatform';
        // loading a shapefile with geographic points
        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = url + '/shapes/WorldCities.shp';
        sds.databaseSource  = url + '/shapes/WorldCities.dbf';
        sds.dataBind();
    }

    public onDataLoaded(sds: IgcShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log('loaded WorldCities.shp ' + shapeRecords.length);

        const geoLocations: any[] = [];
        // parsing shapefile data and creating geo-locations
        for (const record of shapeRecords) {
            // each shapefile record has just one point
            const location = {
                latitude: record.points[0][0].y,
                longitude: record.points[0][0].x,
                city: record.fieldValues.NAME,
                population: record.fieldValues.POPULATION
            };
            geoLocations.push(location);
        }

        const geoSeries = new IgcGeographicSymbolSeriesComponent();
        geoSeries.dataSource = geoLocations;
        geoSeries.markerType = MarkerType.Circle;
        geoSeries.latitudeMemberPath  = 'latitude';
        geoSeries.longitudeMemberPath = 'longitude';
        geoSeries.markerBrush = 'LightGray';
        geoSeries.markerOutline = 'Black';
        geoSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(geoSeries);
    }

    public createTooltip(context: any) {
        // const dataContext = context.dataContext as DataContext;
        // if (!dataContext) return null;

        if (!context) return null;

        // const series = dataContext.series as any;
        // if (!series) return null;

        const dataItem = context.item as any;
        if (!dataItem) return null;

        const pop = WorldUtils.toStringAbbr(dataItem.population);
        const lat = WorldUtils.toStringLat(dataItem.latitude);
        const lon = WorldUtils.toStringLon(dataItem.longitude);

        return html`<div>
            <div class='tooltipTitle'>${dataItem.city}</div>
            <div class='tooltipTable'>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Latitude:</div>
                    <div class='tooltipVal'>${lat}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Longitude:</div>
                    <div class='tooltipVal'>${lon}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Population:</div>
                    <div class='tooltipVal'>${pop}</div>
                </div>
            </div>`;
    }
}

let sample = new MapBindingShapefilePoints();