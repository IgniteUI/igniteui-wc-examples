import { WorldUtils } from './WorldUtils';
import { ShapeStyling } from './MapShapeStyleUtility';
import { ShapeScaleStyling } from './MapShapeStyleUtility';
import { ShapeRangeStyling } from './MapShapeStyleUtility';
import { ShapeRandomStyling } from './MapShapeStyleUtility';
import { ShapeComparisonStyling } from './MapShapeStyleUtility';
import { html } from 'lit-html';
import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { IgcShapefileRecord } from 'igniteui-webcomponents-core';
import { IgcStyleShapeEventArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class MapShapeStyling {

    public geoMap: IgcGeographicMapComponent;
    public geoSeries: IgcGeographicShapeSeriesComponent;
    public shapeRecords: any[] = [];

    public currentShapeStyling: ShapeStyling;
    public shapeRandomStyling: ShapeRandomStyling;
    public shapeComparisonStyling: ShapeComparisonStyling;
    public shapeScaleStyling: ShapeScaleStyling;
    public shapeRangeStyling: ShapeRangeStyling;

    constructor() {

        this.onDataLoaded = this.onDataLoaded.bind(this);
        this.onOptionsSelected = this.onOptionsSelected.bind(this);
        this.onStylingShape = this.onStylingShape.bind(this);

        // setting up ShapeRandomStyling:
        this.shapeRandomStyling = new ShapeRandomStyling();
        this.shapeRandomStyling.shapeStrokeColors = ['Black'];
        this.shapeRandomStyling.shapeFillColors = ['#8C23D1', '#0E9759', '#B4D336', '#F2A464', '#D74545', 'DodgerBlue'];

        // setting up ShapeScaleStyling:
        this.shapeScaleStyling = new ShapeScaleStyling();
        this.shapeScaleStyling.defaultFill = 'Gray';
        this.shapeScaleStyling.shapeStrokeColors = ['Black'];
        this.shapeScaleStyling.shapeFillColors = ['DodgerBlue', 'yellow', '#c2f542', '#e8c902', '#e8b602', '#e87902', 'brown'];
        this.shapeScaleStyling.itemMinimumValue = 5000;
        this.shapeScaleStyling.itemMaximumValue = 2000000000; // 2 Billions
        this.shapeScaleStyling.itemMemberPath = 'Population';
        this.shapeScaleStyling.isLogarithmic = true;

        // setting up ShapeComparisonStyling:
        this.shapeRangeStyling = new ShapeRangeStyling();
        this.shapeRangeStyling.defaultFill = 'Gray';
        this.shapeRangeStyling.itemMemberPath = 'Population';
        this.shapeRangeStyling.ranges = [
            { fill: 'yellow', minimum: 5000, maximum: 10000000, },        // 5 K - 10 M
            { fill: 'orange', minimum: 10000000, maximum: 100000000, },   // 10 M - 100 M
            { fill: 'red',    minimum: 100000000, maximum: 500000000, },  // 100 M - 500 M
            { fill: 'brown',  minimum: 500000000, maximum: 2000000000, }, // 500 M - 2 B
        ];

        // setting up ShapeComparisonStyling:
        this.shapeComparisonStyling = new ShapeComparisonStyling();
        this.shapeComparisonStyling.defaultFill = 'Gray';
        this.shapeComparisonStyling.itemMemberPath = 'Region';
        this.shapeComparisonStyling.itemMappings = [
            { fill: 'Red', itemValue: 'Central Asia' },
            { fill: 'Red', itemValue: 'Eastern Asia' },
            { fill: 'Orange', itemValue: 'Southern Asia' },
            { fill: 'Orange', itemValue: 'Middle East' },
            { fill: 'Orange', itemValue: 'Northern Africa' },
            { fill: 'Yellow', itemValue: 'Eastern Africa' },
            { fill: 'Yellow', itemValue: 'Western Africa' },
            { fill: 'Yellow', itemValue: 'Middle Africa' },
            { fill: 'Yellow', itemValue: 'Southern Africa' },
            { fill: 'DodgerBlue', itemValue: 'Central America' },
            { fill: 'DodgerBlue', itemValue: 'Northern America' },
            { fill: 'DodgerBlue', itemValue: 'Western Europe' },
            { fill: 'DodgerBlue', itemValue: 'Southern Europe' },
            { fill: 'DodgerBlue', itemValue: 'Northern Europe' },
            { fill: 'DodgerBlue', itemValue: 'Eastern Europe' },
            { fill: '#22c928', itemValue: 'South America' },
            { fill: '#b64fff', itemValue: 'Melanesia' },
            { fill: '#b64fff', itemValue: 'Micronesia' },
            { fill: '#b64fff', itemValue: 'Polynesia' },
            { fill: '#b64fff', itemValue: 'Australia' },
            // { fill: 'Gray', itemValue: 'Antarctica' },
        ];

        // setting default value for current shape styling
        this.currentShapeStyling = this.shapeComparisonStyling;

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = undefined;
        // this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        // loading a shapefile with geographic polygons
        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onDataLoaded;
        sds.shapefileSource = 'https://static.infragistics.com/xplatform/shapes/world_countries_all.shp';
        sds.databaseSource  = 'https://static.infragistics.com/xplatform/shapes/world_countries_all.dbf';
        sds.dataBind();

        let optionsSelected = document.getElementById('OptionsSelect');
        optionsSelected!.addEventListener('change', this.onOptionsSelected);
    }

    public onDataLoaded(sds: IgcShapeDataSource, e: any) {
        this.shapeRecords = sds.getPointData();
        console.log('loaded WorldCountries.shp ' +  this.shapeRecords.length);

        this.geoSeries = new IgcGeographicShapeSeriesComponent();
        this.geoSeries.name = 'series';
        this.geoSeries.dataSource = this.shapeRecords;
        this.geoSeries.shapeMemberPath = 'points';
        this.geoSeries.brush = 'rgba(146, 146, 146, 0.6)';
        this.geoSeries.outline = 'Black';
        this.geoSeries.tooltipTemplate = this.createTooltip;
        this.geoSeries.thickness = 1;
        // adding event handler for styleShape
        this.geoSeries.styleShape = this.onStylingShape;

        this.geoMap.series.add(this.geoSeries);
    }

    public onStylingShape(s: IgcGeographicShapeSeriesComponent, args: IgcStyleShapeEventArgs) {

        const itemRecord = args.item as IgcShapefileRecord;

        const shapeStyle = this.currentShapeStyling.generate(itemRecord);
        args.shapeOpacity = shapeStyle.opacity;
        args.shapeFill = shapeStyle.fill;
        args.shapeStroke = shapeStyle.stroke;
        args.shapeStrokeThickness = shapeStyle.strokeThickness;

        // console.log(ShapeStyling.fill + ' ' + itemRecord.fieldValues.Name + ' ' + itemRecord.fieldValues.Population.toFixed(0));
    }

    public onOptionsSelected = (e: any) => {
        const stylingType = e.target.value;

        if (stylingType === 'ShapeComparisonStyling') {
            this.currentShapeStyling = this.shapeComparisonStyling;
        } else if (stylingType === 'ShapeScaleStyling') {
            this.currentShapeStyling = this.shapeScaleStyling;
        } else if (stylingType === 'ShapeRangeStyling') {
            this.currentShapeStyling = this.shapeRangeStyling;
        } else {
            this.currentShapeStyling = this.shapeRandomStyling;
        }

        this.geoSeries.dataSource = this.shapeRecords;
    }

    public createTooltip(context: any): any {
        if (!context) return null;

        const dataItem = context.item as any;
        if (!dataItem) return null;

        if (!dataItem.fieldValues) return null;

        const reg = dataItem.fieldValues.Region;
        const name = dataItem.fieldValues.Name;
        const pop = WorldUtils.toStringAbbr(dataItem.fieldValues.Population);

        return html`<div>
            <div class='tooltipTitle'>${name}</div>
            <div class='tooltipTable'>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Region</div>
                    <div class='tooltipVal'>${reg}</div>
                </div>
                <div class='tooltipRow'>
                    <div class='tooltipLbl'>Population</div>
                    <div class='tooltipVal'>${pop}</div>
                </div>
            </div>`;
    }
}

new MapShapeStyling();
