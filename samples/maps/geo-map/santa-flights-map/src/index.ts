import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts'; 
import { IgcStyleShapeEventArgs } from 'igniteui-webcomponents-charts';
import { IgcShapeDataSource } from 'igniteui-webcomponents-core';
import { IgcChartMouseEventArgs } from 'igniteui-webcomponents-charts'
import { IgcSeriesViewerComponent} from 'igniteui-webcomponents-charts'
import { IgcOpenStreetMapImagery } from 'igniteui-webcomponents-maps';

import { MarkerType } from 'igniteui-webcomponents-charts';
import { DataContext } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core'; 
import { SantaShapeStyling } from './SantaShapeStyling';
import { SantaWorldConnections } from './SantaWorldConnections';
import { SantaWorldUtils } from './SantaWorldUtils';
import { html } from 'lit-html';

import './index.css'

import { DataTemplateMeasureInfo, DataTemplateRenderInfo } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcGeographicMapModule
);

export class WorldFlightMap {

    private geoMap: IgcGeographicMapComponent;

    private worldFlights: any[] = [];
    private worldGridlines: any[] = [];
    private airportLocations: any[] = [];
    private airportConnections: any = {};

    private currentShapeStyling: SantaShapeStyling = new SantaShapeStyling();

    private airportLookup: any = {};
    private airportIndex: any = {};

    private santaLocations: any[] = [];
    private santaStart: any = null;
    private santaEnd: any = null;
    private santaFlight: any = null;

    constructor() {

        this.addFlightPathSeries = this.addFlightPathSeries.bind(this);
        this.addGridlineSeries = this.addGridlineSeries.bind(this);
        this.addAirportLocationSeries = this.addAirportLocationSeries.bind(this);
        this.addAirportConnections = this.addAirportConnections.bind(this);
        
        this.createShapeTooltip = this.createShapeTooltip.bind(this);
        this.createCityTooltip = this.createCityTooltip.bind(this);
        this.createFlightTooltip = this.createFlightTooltip.bind(this);
        
        this.onMapShapeLoaded = this.onMapShapeLoaded.bind(this); 
        this.onMapShapeStyling = this.onMapShapeStyling.bind(this);
        this.onMapMouseLeave = this.onMapMouseLeave.bind(this);
        this.onMapMouseEnter = this.onMapMouseEnter.bind(this);
        this.onMapMouseMove = this.onMapMouseMove.bind(this);
        // this.onAirportMarker = this.onAirportMarker.bind(this);

        let osm = new IgcOpenStreetMapImagery();
        osm.opacity = 0.0;

        this.geoMap = document.getElementById('geoMap') as IgcGeographicMapComponent;
        this.geoMap.backgroundContent = osm;

        const region = { left: -120, top: 20.0, width: 240.0, height: 130.0 };
        // const region = { left: -180, top: 25.0, width: 360.0, height: 135.0 };
        this.geoMap.zoomToGeographic(region);

        this.worldFlights = SantaWorldConnections.getFlights();
        this.airportLocations = SantaWorldConnections.getAirportLocations();
        this.worldGridlines = SantaWorldConnections.getGridlines();

        this.airportConnections = SantaWorldConnections.getAirportConnections();

        console.log("worldFlights " + this.worldFlights.length);
        // console.log(this.worldFlights[0]);
        // console.log(this.worldFlights[this.worldFlights.length - 1]);
        console.log("airportLocations " + this.airportLocations.length);
        // console.log(this.airportLocations[0]);
        // console.log(this.airportLocations[this.airportLocations.length - 1]);

        for (let i = 0; i < this.airportLocations.length; i++) {
            let ap = this.airportLocations[i];
            this.airportLookup[ap.name] = ap;
            this.airportIndex[ap.name] = i;
        }


        // this.santaStart = this.airportLookup["London"];
        // this.santaEnd   = this.airportLookup["New York"];

        // this.santaFlight = SantaWorldUtils.getFlight(this.santaStart, this.santaEnd);
        // console.log(this.santaFlight);

        // this.santaFlight = this.worldFlights[0];
        this.santaFlight = this.worldFlights[this.worldFlights.length - 1];
        console.log(this.santaFlight);
        this.santaStart = this.santaFlight.origin;
        this.santaEnd   = this.santaFlight.dest;
        console.log(this.santaStart);
        console.log(this.santaEnd);

        this.santaLocations.push(this.santaStart);
        // this.santaLocations.push(this.santaEnd);

        const sds = new IgcShapeDataSource();
        sds.importCompleted = this.onMapShapeLoaded;
        sds.shapefileSource = 'https://static.infragistics.com/xplatform/shapes/WorldCountries.shp';
        sds.databaseSource  = 'https://static.infragistics.com/xplatform/shapes/WorldCountries.dbf';
        sds.dataBind();
    }

    public onSeriesMouseEnter = (s: any, e: IgcChartMouseEventArgs) => {
        // if (e.series.tooltipTemplate === null ||
        //     e.series.tooltipTemplate === undefined) {
        //     e.series.tooltipTemplate = this.createDataChartTooltip;
        // }
    }

    private shapeCountries: any[] = [];
    private shapeSeries: IgcGeographicShapeSeriesComponent = new IgcGeographicShapeSeriesComponent();

    public onMapShapeLoaded(sds: IgcShapeDataSource, e: any) {
        const shapeRecords = sds.getPointData();
        // console.log('loaded WorldCountries.shp ' + shapeRecords.length);

        this.shapeCountries = [];
        // parsing shapefile data and creating geo-polygons
        for (const record of shapeRecords) {
            // using field/column names from .DBF file
            const country = {
                isHighlighted: false,   
                points: record.points,
                name: record.fieldValues.NAME,
                gdp: record.fieldValues.GDP,
                population: record.fieldValues.POPULATION
            };
            if (country.name === 'Antarctica') continue;

            this.shapeCountries.push(country);
        }

        // this.currentShapeStyling = this.shapeComparisonStyling;
        this.currentShapeStyling = new SantaShapeStyling();
        // this.currentShapeStyling.defaultFill = '#959494';
        this.currentShapeStyling.defaultFill = '#db960b';
        this.currentShapeStyling.itemMemberPath = 'isHighlighted';
        this.currentShapeStyling.itemMappings = [
            { itemValue: true,  opacity: 1.0, fill: "rgba(113, 113, 113, 1)", stroke: "rgba(190, 188, 188, 1)",   },
            { itemValue: false, opacity: 0.8, fill: "rgba(66, 64, 64, 1)",    stroke: "rgba(190, 188, 188, 1)",    }, 
            // { itemValue: false, opacity: 0.8, fill: "rgba(66, 64, 64, 1)",    stroke: "rgba(190, 188, 188, 1)",    }, 
        ];

        // const shapeSeries = new IgcGeographicShapeSeriesComponent();
        this.shapeSeries.name = 'series';
        this.shapeSeries.dataSource = this.shapeCountries;
        this.shapeSeries.shapeMemberPath = 'points';
        // this.shapeSeries.brush = 'rgba(146, 146, 146, 0.6)';
        // this.shapeSeries.brush = 'rgba(66, 64, 64, 1)';
        // this.shapeSeries.outline = 'rgba(190, 188, 188, 1)';
        this.shapeSeries.tooltipTemplate = this.createShapeTooltip;
        this.shapeSeries.thickness = 0.5;
        this.shapeSeries.title = 'countries';
        this.shapeSeries.showDefaultTooltip = true;

        this.shapeSeries.styleShape = this.onMapShapeStyling;

        this.geoMap.series.add(this.shapeSeries);

        this.geoMap.seriesMouseEnter = this.onMapMouseEnter;
        this.geoMap.seriesMouseLeave = this.onMapMouseLeave;
        this.geoMap.seriesMouseMove = this.onMapMouseMove;
        
        // this.addGridlineSeries();
        this.addAirportConnections();
        this.addFlightPathSeries();

        this.addAirportLocationSeries();

        // christmas effects in geo-map
        this.addSantaSeries();
        this.addSnowSeries();

        this.statsSnowLabel = document.getElementById('statsSnowLabel') as HTMLLabelElement;
        this.statsVisitedLabel = document.getElementById('statsVisitedLabel') as HTMLLabelElement;
        this.statsDistanceLabel = document.getElementById('statsDistanceLabel') as HTMLLabelElement;
 
        this.setupInterval();
    }

    private statsSnowLabel?: HTMLLabelElement;
    private statsVisitedLabel?: HTMLLabelElement;
    private statsDistanceLabel?: HTMLLabelElement;

    public onMapShapeStyling(s: IgcGeographicShapeSeriesComponent, args: IgcStyleShapeEventArgs) {
        const shapeStyle = this.currentShapeStyling.generate(args.item);
        // console.log(args.item);

        args.shapeOpacity = shapeStyle.opacity;
        args.shapeFill = shapeStyle.fill;
        args.shapeStroke = shapeStyle.stroke;
        args.shapeStrokeThickness = shapeStyle.strokeThickness;
    }

    public onMapMouseMove(s: IgcSeriesViewerComponent, e: IgcChartMouseEventArgs) {
        // console.log("onMapMouseMove");

        let series = e.series;
        let item = e.item as any;
        if (item !== null && series !== null ) {
            // console.log('onMapMouseEnter "' + series.title + '"');
            
            if (series.title === 'flights') {
                let flight = e.item as any;
                this.onHighlightFlight(flight);
            } 

            if (series.title === 'countries') {
                // let flight = e.item as any;
                this.onHighlightCountry(item.name);
            } 

            if (series.title === 'airports') {

                let connections = this.airportConnections[item.name];
                if (connections) {
                    this.airportConnectionSeries.dataSource = connections;
                }
            }
        }
    }

    public onMapMouseEnter(s: IgcSeriesViewerComponent, e: IgcChartMouseEventArgs) {
        // console.log("onMapMouseEnter");
   
    }

    public onMapMouseLeave(s: IgcSeriesViewerComponent, e: IgcChartMouseEventArgs) {
        // console.log("onMapMouseLeave");
        this.onHighlightCountry(null);
        this.onHighlightFlight(null);
        
        this.airportConnectionSeries.dataSource = [];
    }
    
    public onHighlightFlight(flight: any): void {

        if (flight !== null) {
            for (let i = 0; i < this.airportLocations.length; i++) {
                if (this.airportLocations[i].name === flight.origin.name) {
                    this.airportLocations[i].isHighlighted = true; 
                }
                else if (this.airportLocations[i].name === flight.dest.name) {
                    this.airportLocations[i].isHighlighted = true; 
                } else {
                    this.airportLocations[i].isHighlighted = false; 
                }
            }
            this.airportConnectionSeries.dataSource = [flight];
        } else {

            for (let i = 0; i < this.airportLocations.length; i++) {
                this.airportLocations[i].isHighlighted = false; 
            }
            this.airportConnectionSeries.dataSource = null;
        }
    }
    
    public onHighlightCountry(target: any): void {
        // console.log("onHighlightCountry");
        // this.shapeCountries
        for (let i = 0; i < this.shapeCountries.length; i++) {
            let item = this.shapeCountries[i];
            if (item.name === target) {
                this.shapeCountries[i].isHighlighted = true;
                // console.log('onHighlightCountry ' + target);
                // this.geoMap.notifySetItem(this.shapeCountries, i, item, this.shapeCountries[i])
    
            } else {
                this.shapeCountries[i].isHighlighted = false;
            }
        }
        this.shapeSeries.dataSource = null;
        this.shapeSeries.dataSource = this.shapeCountries;
    }

    public createShapeTooltip(dataContext: any): any {
        // console.log("createShapeTooltip");
        // const dataContext = context.dataContext as DataContext;
        // if (!dataContext) return null;

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        // console.log(dataItem);

        const pop = SantaWorldUtils.toStringAbbr(dataItem.population);
        // const gdp = SantaWorldUtils.toStringAbbr(dataItem.gdp * 1000000 / dataItem.population);

                // <div class='tooltipTitle' style='${this.tooltipTextColor} ${this.tooltipTextCenter}'>Merry Christmas</div>
        return html`<div>
            
            <div class='tooltipBox'>
                <div class='tooltipTitle' style='${this.tooltipTextColor} ${this.tooltipTextCenter}'>Country Info</div>
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Name</div>
                    <div class='tooltipVal'>${dataItem.name}</div>
                </div>
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Population</div>
                    <div class='tooltipVal'>${pop}</div>
                </div>
            </div>`;
    }

    public createCityTooltip(dataContext: any): any {
        // console.log("createCityTooltip"); createFlightTooltip

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        // console.log(dataItem);

        const flights = Math.round(dataItem.flights * 50 * Math.random());
        return html`<div> 
            <div class='tooltipBox'>
                <div  class='tooltipTitle' style='${this.tooltipTextColor} ${this.tooltipTextCenter}'>Airport Info</div>
         
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Name</div>
                    <div class='tooltipVal'>${dataItem.name}</div>
                </div> 
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Population</div>
                    <div class='tooltipVal'>${dataItem.pop} M</div>
                </div> 
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Flights</div>
                    <div class='tooltipVal'>${flights}</div>
                </div> 
             </div>`;
                // <div class='tooltipRow'>
                //     <div class='tooltipLbl'>Merry Christmas from</div>
                //     <div class='tooltipVal'>${dataItem.name}</div>
                // </div>
    }

    public tooltipTextColor: string = 'color: #ffffff; ';
    public tooltipTextCenter: string = 'text-align: center; '; 

    public createFlightTooltip(dataContext: any): any {
        // console.log("createCityTooltip"); createFlightTooltip

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        // console.log(dataItem);
// <div class='tooltipTitle' style='${this.tooltipTextColor} ${this.tooltipTextCenter}'>Flight Information</div>
         
        return html`<div>
            <div class='tooltipBox' >
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'></div>
                    <div class='tooltipVal'>Flight Info</div>
                </div>
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>From</div>
                    <div class='tooltipVal'>${dataItem.origin.name}, ${dataItem.origin.country}</div>
                </div>
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>To</div>
                    <div class='tooltipVal'>${dataItem.dest.name}, ${dataItem.dest.country}</div>
                </div>
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Distance</div>
                    <div class='tooltipVal'>${dataItem.distance} KM</div>
                </div>
                <div class='tooltipRow' style='${this.tooltipTextColor}'>
                    <div class='tooltipLbl'>Passengers</div>
                    <div class='tooltipVal'>${dataItem.passengers}</div>
                </div>
             </div>`;
    }

    public addGridlineSeries() {
        const gridSeries = new IgcGeographicPolylineSeriesComponent();
        gridSeries.dataSource = this.worldGridlines;
        gridSeries.shapeMemberPath = 'points';
        gridSeries.shapeStroke = 'rgba(59, 59, 59, 1)';
        gridSeries.shapeStrokeThickness = 1;
        gridSeries.title = "grid";
        //gridSeries.tooltipTemplate = this.createGridlineTooltip;
        this.geoMap.series.add(gridSeries);
    }

    public addFlightPathSeries() {
        const lineSeries = new IgcGeographicPolylineSeriesComponent();
        lineSeries.dataSource = this.worldFlights;
        lineSeries.shapeMemberPath = 'points';
        // lineSeries.shapeStroke = 'rgba(196, 14, 14, 0.05)';
        lineSeries.shapeStroke = 'rgba(196, 14, 14, 0.1)';
        lineSeries.shapeStroke = 'rgba(44, 196, 14, 0.1)'; // green
        lineSeries.shapeStroke = 'rgba(186, 188, 186, 0.1)'; // green
        lineSeries.shapeStrokeThickness = 2;
        lineSeries.title = "flights";
        lineSeries.tooltipTemplate = this.createFlightTooltip;
        //lineSeries.tooltipTemplate = this.createPolylineTooltip;
        this.geoMap.series.add(lineSeries);
    }
    
    public highlightColor: string = 'rgba(28, 165, 0, 0.5)';

    public airportConnectionSeries: IgcGeographicPolylineSeriesComponent = new IgcGeographicPolylineSeriesComponent();
    public addAirportConnections() {
        this.airportConnectionSeries = new IgcGeographicPolylineSeriesComponent();
        // this.airportConnectionSeries.dataSource = this.worldFlights;
        this.airportConnectionSeries.shapeMemberPath = 'points';  
        this.airportConnectionSeries.shapeStroke = this.highlightColor; // green
        this.airportConnectionSeries.shapeStrokeThickness = 3;
        // this.airportConnectionSeries.shapeOpacity = 0.5;
        // this.airportConnectionSeries.areaFillOpacity = 0.5;

        // this.airportConnectionSeries.tooltipTemplate = this.createFlightTooltip;
        this.airportConnectionSeries.showDefaultTooltip = false;
        this.geoMap.series.add(this.airportConnectionSeries);
    }

    
    private colors: any[] = [];
    public addAirportLocationSeries() {

        this.colors = [
            'rgb(214, 2, 2)',
            'rgb(243, 163, 3)',
            'rgb(193, 193, 2)',
            'rgb(2, 193, 214)',
            'rgb(1, 138, 1)',
            'rgb(214, 2, 196)',
        ];
        for (let i = 0; i < this.airportLocations.length; i++) {
            let ind = Math.round(Math.random() * (this.colors.length - 1));
            let item = this.airportLocations[i];
            // item.fill = this.colors[ind];
            // item.outline = this.colors[ind];
            // item.fill = '#aad3df';
            // item.outline = '#aad3df';
            item.fill = '#1b9901';
            item.outline = '#1b9901';
            item.outline = '#1a1a1a';
            // item.fill = 'white';
        }

        const symbolSeries = new IgcGeographicSymbolSeriesComponent();
        symbolSeries.dataSource = this.airportLocations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.latitudeMemberPath = 'y';
        symbolSeries.longitudeMemberPath = 'x';
        symbolSeries.markerBrush = '#aad3df';
        symbolSeries.markerOutline = 'rgb(73, 73, 73)';
        symbolSeries.thickness = 1;
        symbolSeries.title = "airports";
        symbolSeries.markerTemplate = this.onAirportMarker();
        symbolSeries.tooltipTemplate = this.createCityTooltip;
        //symbolSeries.tooltipTemplate = this.createSymbolTooltip;
        this.geoMap.series.add(symbolSeries);
    }
    
    public onAirportMarker(): any
    {
        let style = { outline: '#de0d0d', fill: '#de0d0d00', text: 'black' };

        const size = 8;
        const radius = size / 2;
        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                const data = measureInfo.data;
                const context = measureInfo.context;
                // let name = 'Philadelphia';
                // let item = data.item as any;
                // if (item != null) {
                //     name = item.name.toUpperCase();
                // }
                // const height = context.measureText('M').width;
                // const width = context.measureText(name).width;
                measureInfo.width = size + 2; // width;
                measureInfo.height = size + 2; // height + size;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                const item = renderInfo.data.item as any;
                // const name = item.name.toUpperCase();

                const ctx = renderInfo.context as CanvasRenderingContext2D;
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;
                // let halfWidth  = renderInfo.availableWidth / 2.0;
                // let halfHeight = renderInfo.availableHeight / 2.0;

                if (renderInfo.isHitTestRender) {
                    ctx.fillStyle = renderInfo.data.actualItemBrush.fill;
                    ctx.fillRect(x, y, renderInfo.availableWidth, renderInfo.availableHeight);
                    return;
                } else {
                    ctx.beginPath();

                    let markerColor = item.fill;

                    if (item.isHighlighted) 
                        markerColor = 'rgba(28, 165, 0, 0.5)';
                    else if (item.isVisited) 
                        markerColor = 'rgba(28, 165, 0, 0.5)';

                    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                    // ctx.fillStyle = style.fill;
                    ctx.fillStyle = markerColor;
                    ctx.fill();
                    ctx.lineWidth = 2;
                    // ctx.strokeStyle = style.outline;
                    ctx.strokeStyle = markerColor;
                    ctx.stroke();


                    // ctx.strokeStyle = '#f70606'; // Set color to white
                    // ctx.lineWidth = 1;
                    // // Draw 6 main arms
                    // for (let i = 0; i < 6; i++) {
                    //     ctx.moveTo(x, y);
                    //     ctx.lineTo(x + size, y);
                    //     // Add small V-shapes to the arms
                    //     ctx.moveTo(x + size * 0.75, y - size * 0.1);
                    //     ctx.lineTo(x + size, y);
                    //     ctx.lineTo(x + size * 0.75, y + size * 0.1);
                    //     // Rotate the canvas for the next arm
                    //     ctx.translate(x, y);
                    //     ctx.rotate(Math.PI / 3); // Rotate by 60 degrees (360/6)
                    //     ctx.translate(-x, -y);
                    // }
                    // ctx.stroke();
                    // // Remember to reset the transform if you plan to draw other shapes
                    // ctx.setTransform(1, 0, 0, 1, 0, 0)
                    
                    ctx.closePath();
                }
            }
        }
    }
    
    public onSantaMarker(): any
    {
        const img = new Image();
        img.onload = function() { console.log('imgLoaded'); };
        img.src = 'https://raw.githubusercontent.com/IgniteUI/igniteui-wc-examples/be4e4f1226244ce9162a9c64c8e6a982d5a288b3/browser/src/assets/holidays/santa-claus.png';
        img.src = 'https://dl.infragistics.com/x/img/holidays/santa-claus.png';

        const size = 30;
        const radius = size / 2;
        return {
            measure: function (measureInfo: DataTemplateMeasureInfo) {
                measureInfo.width = size + 2; // width;
                measureInfo.height = size + 2; // height + size;
            },
            render: function (renderInfo: DataTemplateRenderInfo) {
                const item = renderInfo.data.item as any;
                // const name = item.name.toUpperCase();

                const ctx = renderInfo.context as CanvasRenderingContext2D;
                let x = renderInfo.xPosition;
                let y = renderInfo.yPosition;
                // let halfWidth  = renderInfo.availableWidth / 2.0;
                // let halfHeight = renderInfo.availableHeight / 2.0;

                if (renderInfo.isHitTestRender) {
                    ctx.fillStyle = renderInfo.data.actualItemBrush.fill;
                    ctx.fillRect(x, y, renderInfo.availableWidth, renderInfo.availableHeight);
                    return;
                } else {
                    ctx.beginPath();

                    
                    ctx.drawImage(img, x, y, size, size);
                    
                    // let markerColor = 'rgba(215, 1, 1, 0.783)';
                    // let markerColor = 'rgba(215, 165, 1, 0.783)';
                    // ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
                    // ctx.fillStyle = markerColor;
                    // ctx.fill();
                    // ctx.lineWidth = 2;
                    // ctx.strokeStyle = markerColor;
                    // ctx.stroke();

                    ctx.closePath();
                }
            }
        }
    }
    
    public santaSeries = new IgcGeographicSymbolSeriesComponent();
    public addSantaSeries() {

        // for (let i = 0; i < this.airportLocations.length; i++) {
        //     let ind = Math.round(Math.random() * (this.colors.length - 1));
        //     let item = this.airportLocations[i];
        //     item.fill = this.colors[ind];
        //     item.outline = this.colors[ind];
        //     // item.fill = 'white';
        // }
        // this.santaSeries.transitionDuration = this.santaUpdateInterval - 30;
        this.santaSeries.dataSource = this.santaLocations;
        this.santaSeries.markerType = MarkerType.Diamond;
        this.santaSeries.latitudeMemberPath = 'y';
        this.santaSeries.longitudeMemberPath = 'x';
        this.santaSeries.markerBrush = '#f80f0f';
        this.santaSeries.markerOutline = '#f80f0f';
        // this.santaSeries.markerOutline = 'rgb(73, 73, 73)';
        this.santaSeries.thickness = 2;
        this.santaSeries.markerTemplate = this.onSantaMarker();
        // this.santaSeries.tooltipTemplate = this.createCityTooltip;
        //this.santaSeries.tooltipTemplate = this.createSymbolTooltip;
        this.geoMap.series.add(this.santaSeries);
    }
    
    private santaVisited: any = {}
    private santaFlightIndex: number = 0;
    
    // private santaUpdateInterval = 20;
    private santaUpdateInterval = 50;
    // private santaUpdateInterval = 100;

    public onTickSanta(): void 
    {

        let location = this.santaLocations[0];
        // if (location.y == this.santaEnd.y && 
        //     location.x == this.santaEnd.x) {
 
        //     this.santaVisitedCities[this.santaEnd.name] = true;
            
        //     for (let i = 0; i < this.airportLocations.length; i++) {
        //         let ap = this.airportLocations[i];

        //         if (!this.santaVisited[ap.name]) {
        //             this.santaStart = this.santaEnd;
        //             this.santaEnd = ap;
        //             this.santaLocations[0] = this.santaStart;
        //             this.santaFlight = SantaWorldUtils.getFlight(this.santaStart, this.santaEnd);
        //             this.santaFlightIndex = 0;
        //             console.log('flight change: ' + this.santaStart.name + ' -> ' + this.santaEnd.name)
        //             break;
        //         }
        //     }
        // }
 
        let flightPath = this.santaFlight.points[0];
        if (flightPath.length - 1 > this.santaFlight.progress) {
            this.santaLocations[0].y = flightPath[this.santaFlight.progress].y;
            this.santaLocations[0].x = flightPath[this.santaFlight.progress].x;
        } else {
            let origin = this.santaFlight.dest;
            let dest   = this.santaFlight.dest;
            this.santaLocations[0].y = dest.y;
            this.santaLocations[0].x = dest.x;

            // this.santaVisited[origin.name] = true;
            // this.santaVisited[dest.name] = true;
            this.santaVisited[this.santaFlight.route] = true;

            this.santaDistance += this.santaFlight.distance;
            // let visitedIndex = this.airportIndex[dest.name];
            // if (visitedIndex >= 0) {
            //     this.airportLocations[visitedIndex].isVisited = true;
            // }
            // visitedIndex = this.airportIndex[origin.name];
            // if (visitedIndex >= 0) {
            //     this.airportLocations[visitedIndex].isVisited = true;
            // }

            let connections = this.airportConnections[origin.name];
            // let connections = this.airportConnections[dest.name];
            if (connections && connections.length > 0) {

                let foundConnection = false;
                for (let i = 0; i < connections.length; i++) {
                    let flight = connections[i];
                    if (!this.santaVisited[flight.route]) {
                    // if (!this.santaVisited[flight.dest.name]) {
                        // console.log('foundConnection=' + flight.route)
                        foundConnection = true;
                        this.santaVisits++;
                        this.santaFlight = flight;
                        this.santaFlight.progress = 0;
                                
                        if (this.statsVisitedLabel)
                            this.statsVisitedLabel.textContent = ' ' + this.santaVisits.toString() + '   ' ;
 
                        if (this.statsDistanceLabel)
                            this.statsDistanceLabel.textContent = ' ' + this.santaDistance.toLocaleString('en-US') + ' KM';
                        
                        break;
                    }
                    
                }

                if (!foundConnection || this.santaVisits > 1500) {
                    this.stopAnimation(this.santaUpdateID);
                }

            } else {
                this.stopAnimation(this.santaUpdateID);
            }
        }

        this.geoMap.notifySetItem(this.santaLocations, 0, location, this.santaLocations[0]);
        this.santaFlight.progress++;
         
    }

    public santaVisits: number = 0;
    public santaDistance: number = 0;

    public interval: number = -1; 
    public santaUpdateID: number = -1;
    public refreshMilliseconds: number = 50;
    public setupInterval(): void {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
        this.stopAnimation(this.santaUpdateID);

        this.interval = window.setInterval(() => this.onTickSnow(), this.refreshMilliseconds);
        this.interval = window.setInterval(() => this.onTickAirport(), this.refreshMilliseconds * 10);
        this.santaUpdateID = window.setInterval(() => this.onTickSanta(), this.santaUpdateInterval);
    }

    public stopAnimation(animationID: number): void {
        if (animationID >= 0) {
            window.clearInterval(animationID);
            animationID = -1;
        }
    }

    public onTickAirport(): void {

        for (let i = 0; i < this.airportLocations.length; i++) {
            let skipUpdate = Math.random() > 0.3;
            if (skipUpdate) continue;

            let airport = this.airportLocations[i];
            let ind = Math.round(Math.random() * (this.colors.length - 1));
            let item = this.airportLocations[i];
            item.fill = this.colors[ind];
            item.outline = this.colors[ind];
            this.geoMap.notifySetItem(this.airportLocations, i, airport, this.airportLocations[i]);
        }
    }

    
    private createSnowFlake(): any {
        let snowFlake: any = {};
        snowFlake.x = Math.random() * 360 - 180;
        // snowFlake.y = Math.random() * 170 - 85;
        snowFlake.y = (Math.random() * 200) + 90;
        // snowFlake.y = Math.random() * 170 - 150;
        snowFlake.fallSpeed = 1 + Math.random() * 0.5,
        snowFlake.swayAmplitude = 10 + Math.random() * 20,
        snowFlake.swayPhase = Math.random() * Math.PI * 2,
        snowFlake.initialX = snowFlake.x;
        return snowFlake;
    }

    private snowFlakesFallen: number = 0;
    private snowFlakes: any[] = [];
    public addSnowSeries() {
        this.snowFlakes = [];

        for (let i = 0; i < 200; i++) {
            let snowFlake: any = this.createSnowFlake();
            this.snowFlakes.push(snowFlake)
        }

        // console.log(this.snowFlakes[0]);

        const snowSeries = new IgcGeographicSymbolSeriesComponent();
        snowSeries.dataSource = this.snowFlakes;
        snowSeries.markerType = MarkerType.Hexagram;
        snowSeries.latitudeMemberPath = 'y';
        snowSeries.longitudeMemberPath = 'x';
        snowSeries.markerBrush = '#f3f3f3';
        snowSeries.markerOutline = 'rgb(241, 238, 238)';
        snowSeries.thickness = 1;
        // snowSeries.markerTemplate = this.onAirportMarker();
        //snowSeries.tooltipTemplate = this.createSymbolTooltip;
        this.geoMap.series.add(snowSeries);
    }

    public onTickSnow(): void {

        for (let i = 0; i < this.snowFlakes.length; i++) { 
            // let oldFlakes = this.snowFlakes[i];

            let snow = this.snowFlakes[i];
            var speed = snow.fallSpeed;
            if (snow.y < -80) speed = 0.05;
            if (snow.y < -75) speed = 0.15;
            if (snow.y < -65) speed = 0.25;

            let y = snow.y - speed; 
            // let y = snow.y - snow.fallSpeed
            
            // gentle horizontal sway
            let sway = Math.sin((y / 50) + snow.swayPhase) * snow.swayAmplitude;
            let x = snow.initialX + sway;
            
            this.snowFlakes[i].x = x;
            this.snowFlakes[i].y = y;

            // console.log('sway=' + sway + ' x=' + x + ' y=' + y + ' xp=' + xp + ' xs=' + xs);

            if (this.snowFlakes[i].y < -70) {
                this.snowFlakes[i].y = 85;
                
                this.snowFlakesFallen++;
                if (this.statsSnowLabel)
                    this.statsSnowLabel.textContent = this.snowFlakesFallen.toLocaleString('en-US') + '';
 
            }

            // console.log(this.snowFlakes[0]);

            this.geoMap.notifySetItem(this.snowFlakes, i, snow, this.snowFlakes[i])
            // this.snowFlakes.push({ y: y, x: x })
        }
    }
}

new WorldFlightMap();
