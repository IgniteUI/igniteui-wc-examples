import { WorldUtils } from './WorldUtils';
import { html } from 'lit-html';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { DataContext } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapBindingShapefilePolygons {

    private geoMap: IgcGeographicMapComponent;

    constructor() {

        this.onDataLoaded = this.onDataLoaded.bind(this);

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = undefined;
        this.geoMap.updateZoomWindow({ left: 0.2, top: 0.1, width: 0.6, height: 0.6 });

        const url = 'https://static.infragistics.com/xplatform';
        // loading a shapefile with geographic polygons
        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = url + '/shapes/WorldCountries.shp';
        sds.databaseSource  = url + '/shapes/WorldCountries.dbf';
        sds.dataBind();
    }

    public onDataLoaded(sds: IgcShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        console.log('loaded WorldCountries.shp ' + shapeRecords.length);

        const geoPolygons: any[] = [];
        // parsing shapefile data and creating geo-polygons
        for (const record of shapeRecords) {
            // using field/column names from .DBF file
            const country = {
                points: record.points,
                name: record.fieldValues.NAME,
                gdp: record.fieldValues.GDP,
                population: record.fieldValues.POPULATION
            };
            geoPolygons.push(country);
        }

        const geoSeries = new IgcGeographicShapeSeriesComponent();
        geoSeries.name = 'series';
        geoSeries.dataSource = geoPolygons;
        geoSeries.shapeMemberPath = 'points';
        geoSeries.brush = 'rgba(146, 146, 146, 0.6)';
        geoSeries.outline = 'Black';
        geoSeries.tooltipTemplate = this.createTooltip;
        geoSeries.thickness = 1;

        this.geoMap.series.add(geoSeries);
    }

    public createTooltip(context: any): any {
        const dataContext = context.dataContext as DataContext;
        if (!dataContext) return null;

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const pop = WorldUtils.toStringAbbr(dataItem.population);
        const gdp = WorldUtils.toStringAbbr(dataItem.gdp * 1000000 / dataItem.population);

        return html`<div>
            <div  class='tooltipTitle'>${dataItem.name}</div>
            <div class='tooltipBox'>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Population</div>
                    <div class='tooltipVal'>${pop}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>GDP</div>
                    <div class='tooltipVal'>${gdp}</div>
                </div>
            </div>`;
    }
}

new MapBindingShapefilePolygons();
