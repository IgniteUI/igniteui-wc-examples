import './DockManagerStyles.css'

import { DockManagerSharedData } from './DockManagerSharedData';
import { WorldUtils } from './WorldUtils';

import { html } from 'lit-html';
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerComponent } from 'igniteui-dockmanager';
import { IgcDockManagerPaneType, IgcContentPane } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';

// import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
// import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
// import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent, CategoryChartType, AxisLabelsLocation } from 'igniteui-webcomponents-charts';
import { CategoryTransitionInMode, MarkerType, ToolTipType } from 'igniteui-webcomponents-charts';
import { DataContext } from 'igniteui-webcomponents-core';

import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcArcGISOnlineMapImagery } from 'igniteui-webcomponents-maps';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcGeographicMapModule,
    IgcDataChartInteractivityModule,
    // IgcLinearGaugeModule,
    IgcCategoryChartModule
);
defineCustomElements();
//


export class DockManagerUpdatingPanes {


    
    
        

    private dockManager: IgcDockManagerComponent;
    private employeesDatabase = DockManagerSharedData.getEmployees(60);

    private employeeListContainer: HTMLDivElement;
    private employeeListPane: IgcContentPane;
    private employeesList: HTMLDivElement[] = [];

    private productivityChart: IgcCategoryChartComponent;
    private productivityChartPane: IgcContentPane;
    private productivityChartContainer: HTMLDivElement;

    private geoLocationMap: IgcGeographicMapComponent;
    private geoLocationMapPane: IgcContentPane;
    private geoLocationMapContainer: HTMLDivElement;
    private geoLocationSeries: IgcGeographicSymbolSeriesComponent;

    constructor() {
        
        this.createEmployeeList = this.createEmployeeList.bind(this);
        this.createLocationMapTooltip = this.createLocationMapTooltip.bind(this);
        this.createProductivityChart = this.createProductivityChart.bind(this);

        this.createLocationMap = this.createLocationMap.bind(this);
        this.onEmployeeClick = this.onEmployeeClick.bind(this);
    
        

        this.createEmployeeList();
        this.createLocationMap();
        this.createProductivityChart();

        this.employeeListContainer = document.getElementById('employeeListContainer') as HTMLDivElement;
        this.geoLocationMapContainer = document.getElementById('geoLocationMapContainer') as HTMLDivElement;
        this.productivityChartContainer = document.getElementById('productivityChartContainer') as HTMLDivElement;
        this.productivityChartContainer.style.overflow = 'hidden';
        // this.productivityChartContainer.style.paddingRight = 'hidden';
        // this.productivityChartContainer.style.background = 'blue';

        this.productivityChartPane = {
            size: 150,
            header: 'EMPLOYEE PRODUCTIVITY',
            type: IgcDockManagerPaneType.contentPane,
            contentId: 'productivityChartContainer'
        };

        this.geoLocationMapPane = {
            size: 150,
            header: 'EMPLOYEE LOCATIONS',
            type: IgcDockManagerPaneType.contentPane,
            contentId: 'geoLocationMapContainer'
        };

        this.employeeListPane = {
            header: 'EMPLOYEE LIST',
            type: IgcDockManagerPaneType.contentPane,
            contentId: 'employeeListContainer'
        };

        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        this.dockManager.layout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                panes: [
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        size: 100,
                        panes: [ this.employeeListPane ]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        size: 300,
                        panes: [
                            this.productivityChartPane,
                            this.geoLocationMapPane,
                        ]
                    }
                ]
            },
        };

        this.onEmployeeClick(this.employeesDatabase[0]);
    }

    public createProductivityChart() {
        this.productivityChart = document.getElementById('productivityChart') as IgcCategoryChartComponent;
        this.productivityChart.includedProperties = ['Value', 'Month'];
        this.productivityChart.chartType = CategoryChartType.Column;
        this.productivityChart.thickness = 1;
        this.productivityChart.yAxisLabelLocation = AxisLabelsLocation.OutsideRight;
        this.productivityChart.yAxisLabelRightMargin = 20;
        this.productivityChart.yAxisMinimumValue = 25;
        this.productivityChart.yAxisMaximumValue = 100;
        this.productivityChart.yAxisInterval = 25;
        this.productivityChart.xAxisInterval = 1;
        // this.productivityChart.brushes = ['LimeGreen'];
        // this.productivityChart.outlines = ['LimeGreen'];
        this.productivityChart.width = '100%';
        this.productivityChart.height = '100%';
        this.productivityChart.transitionDuration = 100;
        this.productivityChart.transitionInDuration = 1000;
        this.productivityChart.isSeriesHighlightingEnabled = true;
        this.productivityChart.crosshairsAnnotationEnabled  = true;
        this.productivityChart.crosshairsSnapToData  = true;
        this.productivityChart.toolTipType = ToolTipType.Item;

        this.productivityChart.transitionInMode = CategoryTransitionInMode.AccordionFromBottom;
    }

    public createEmployeeList() {

        // let detailsAgeField = this.getEmployeeField('Age:', this.detailsAge);

        let employeeListContainer = document.getElementById('employeeListContainer') as HTMLDivElement;
        employeeListContainer.style.width = 'calc(100% - 1rem)';
        employeeListContainer.style.height = 'calc(100% - 1rem)';
        // employeeListContainer.style.overflowY = 'scroll';
        employeeListContainer.style.display = 'flex';
        employeeListContainer.style.flexDirection = 'column';

        for (const employee of this.employeesDatabase) {

            let employeeName = document.createElement('div');
            employeeName.style.paddingLeft = '1rem';
            employeeName.textContent = employee.Name;
            // let employeeSurname = document.createElement('div');
            // employeeSurname.style.paddingLeft = '1rem';
            // employeeSurname.textContent = employee.LastName;
            let employeePhoto = document.createElement('img');
            employeePhoto.height = 50;
            employeePhoto.width = 50;
            employeePhoto.src = employee.Photo;

            let employeeListItem = document.createElement('div');
            employeeListItem.id = employee.ID;
            employeeListItem.style.height = '3rem';
            employeeListItem.style.display = 'flex';
            employeeListItem.style.flexDirection = 'row';
            employeeListItem.style.paddingLeft = '0.5rem';
            employeeListItem.style.paddingTop = '0.5rem';
            employeeListItem.style.paddingBottom = '0.5rem';
            employeeListItem.style.alignItems = 'center';
            employeeListItem.style.cursor = 'pointer';
            employeeListItem.appendChild(employeePhoto);
            employeeListItem.appendChild(employeeName);
            employeeListItem.addEventListener('click', (e) => this.onEmployeeClick(employee));
            // employeeListItem.appendChild(employeeSurname);

            employeeListContainer.appendChild(employeeListItem);
            this.employeesList.push(employeeListItem);
        }

    }

    public createLocationMap() {
        let allLocationSeries = new IgcGeographicSymbolSeriesComponent();
        allLocationSeries.latitudeMemberPath = 'Latitude';
        allLocationSeries.longitudeMemberPath = 'Longitude';
        allLocationSeries.dataSource = this.employeesDatabase;
        allLocationSeries.markerType = MarkerType.Circle;
        allLocationSeries.markerBrush = 'white';
        allLocationSeries.markerOutline = 'Red';
        allLocationSeries.tooltipTemplate = this.createLocationMapTooltip;

        this.geoLocationSeries = new IgcGeographicSymbolSeriesComponent();
        this.geoLocationSeries.latitudeMemberPath = 'Latitude';
        this.geoLocationSeries.longitudeMemberPath = 'Longitude';
        this.geoLocationSeries.dataSource = [];
        this.geoLocationSeries.markerType = MarkerType.Circle;
        this.geoLocationSeries.markerBrush = 'white';
        this.geoLocationSeries.markerOutline = 'LimeGreen';
        this.geoLocationSeries.tooltipTemplate = this.createLocationMapTooltip;

        const tileSource = new IgcArcGISOnlineMapImagery();
        tileSource.mapServerUri = 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer';

        this.geoLocationMap = document.getElementById('geoLocationMap') as IgcGeographicMapComponent;
        this.geoLocationMap.height = '100%';
        this.geoLocationMap.width = '100%';
        this.geoLocationMap.series.add(allLocationSeries);
        this.geoLocationMap.series.add(this.geoLocationSeries);
        this.geoLocationMap.backgroundContent = tileSource;
    }

    public createLocationMapTooltip(context: any) {
        const dataContext = context as DataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const lbl = dataItem.City;
        const scr = dataItem.CountryFlag;
        const lat = WorldUtils.toStringLat(dataItem.Latitude);
        const lon = WorldUtils.toStringLon(dataItem.Longitude);

    // <div class='tooltipFlagBoarder'> ${context.series.markerOutline}
    //     <img class='tooltipFlagImage' src='${scr}' />
    // </div>
        let tooltip = html`<div  class='tooltipHorizontal'>
            <img class='tooltipFlagImage' src='${scr}' />
            <div style='marginLeft: 5px'>
                <div class='tooltipBox'>
                    <div class='tooltipRow'>
                        <div class='tooltipLbl'>City:</div>
                        <div class='tooltipVal' style='color: black;'>${lbl}</div>
                    </div>
                    <div class='tooltipRow'>
                        <div class='tooltipLbl'>Latitude:</div>
                        <div class='tooltipVal' style='color: black;'>${lat} </div>
                    </div>
                    <div class='tooltipRow'>
                        <div class='tooltipLbl'>Longitude:</div>
                        <div class='tooltipVal' style='color: black;'>${lon}</div>
                    </div>
                </div>
            </div>
        return tooltip;
    }

    public onEmployeeClick(employee: any) {
        // console.log(employee.ID)
        for (const employeeListItem of this.employeesList) {
            if (employeeListItem.id !== employee.ID) {
                employeeListItem.style.background = 'transparent';
            } else {
                employeeListItem.style.background = '#a8d3fd';

                this.geoLocationSeries.dataSource = [employee];
                this.productivityChart.dataSource = employee.Productivity;

                let geoZoom: any = {};
                geoZoom.width = 30;
                geoZoom.height = 20;
                geoZoom.left = employee.Longitude - (geoZoom.width / 2);
                geoZoom.top = employee.Latitude - (geoZoom.height / 2);
                this.geoLocationMap.zoomToGeographic(geoZoom);
            }
        }
    }

    // public createLinearGauge(minimumValue: number, maximumValue: number, color: string): IgcLinearGaugeComponent {

    //     let gauge = new IgcLinearGaugeComponent();
    //     gauge.width = '100%';
    //     gauge.height = '100%';
    //     gauge.value = minimumValue;
    //     gauge.minimumValue = minimumValue;
    //     gauge.maximumValue = maximumValue;
    //     gauge.interval = 10;
    //     gauge.transitionDuration = 0;
    //     gauge.labelInterval = gauge.interval;
    //     gauge.labelExtent = 0.1;
    //     gauge.formatLabel = (s: any, e: any) => {
    //         e.label = e.value + ''
    //     };

    //     // setting appearance of needle
    //     gauge.isNeedleDraggingEnabled = false;
    //     gauge.needleBrush = 'transparent';
    //     gauge.needleOutline = 'transparent';

    //     // setting extent of gauge scale
    //     gauge.scaleStrokeThickness = 0;
    //     gauge.scaleBrush   = '#e0dfdf';
    //     gauge.scaleOutline = '#e0dfdf';
    //     gauge.scaleInnerExtent = 0.25;
    //     gauge.scaleOuterExtent = 0.65;
    //     gauge.scaleStartExtent = 0.05;
    //     gauge.scaleEndExtent = 0.95;

    //     // setting appearance of major ticks
    //     gauge.tickBrush = 'gray';
    //     gauge.tickStartExtent = gauge.scaleInnerExtent;
    //     gauge.tickEndExtent   = gauge.scaleInnerExtent - 0.1;
    //     gauge.tickStrokeThickness = 1;

    //     // setting appearance of minor ticks
    //     gauge.minorTickBrush = 'transparent';

    //     gauge.backingBrush = 'transparent';
    //     gauge.backingOutline = 'transparent';

    //     // setting fill range
    //     // this.detailsAgeRange = new IgcLinearGraphRangeComponent();
    //     // this.detailsAgeRange.brush   = color;
    //     // this.detailsAgeRange.outline = color;
    //     // this.detailsAgeRange.startValue = 0;
    //     // this.detailsAgeRange.endValue = gauge.value;
    //     // this.detailsAgeRange.innerStartExtent = gauge.scaleInnerExtent;
    //     // this.detailsAgeRange.innerEndExtent   = gauge.scaleInnerExtent;
    //     // this.detailsAgeRange.outerStartExtent = gauge.scaleOuterExtent;
    //     // this.detailsAgeRange.outerEndExtent   = gauge.scaleOuterExtent;

    //     // gauge.ranges.clear();
    //     // gauge.ranges.add(this.detailsAgeRange);

    //     return gauge;
    // }

}

let sample = new DockManagerUpdatingPanes();