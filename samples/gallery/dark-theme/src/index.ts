import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicProportionalSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';

import { IgcBulletGraphComponent, IgcBulletGraphModule, IgcLinearGaugeComponent, IgcLinearGaugeModule, IgcRadialGaugeComponent, IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';

import { CalloutPlacementPositions, DataToolTipLayer, IgcCalloutLayerComponent, IgcDataChartInteractivityModule, IgcDataChartStackedModule, IgcDataLegendComponent, IgcDataPieChartComponent, IgcDataPieChartModule, IgcDoughnutChartComponent, IgcDoughnutChartModule, IgcFinalValueLayerComponent, IgcItemLegendComponent, IgcItemLegendModule, IgcLineSeriesComponent, IgcPieChartComponent, IgcPieChartModule, IgcRingSeriesComponent, IgcScatterSeriesComponent, IgcStacked100AreaSeriesComponent, IgcStacked100ColumnSeriesComponent, IgcStackedFragmentSeriesComponent, IgcStackedFragmentSeriesModule, IgcStackedLineSeriesComponent, LabelsPosition, MarkerFillMode, MarkerOutlineMode, TreemapFillScaleMode } from 'igniteui-webcomponents-charts'; 
import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryYAxisComponent, IgcBarSeriesComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
 
import { IgcDataChartCategoryModule, IgcDataChartVerticalCategoryModule } from 'igniteui-webcomponents-charts';

import { IgcColumnSeriesComponent, IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts'; 
import { IgcSizeScaleComponent, MarkerType } from 'igniteui-webcomponents-charts'; 

import { IgcNumberFormatSpecifier, IgcShapeDataSource, OthersCategoryType } from 'igniteui-webcomponents-core';
import { IgcSeriesViewerComponent} from 'igniteui-webcomponents-charts'
import { IgcOpenStreetMapImagery } from 'igniteui-webcomponents-maps';

import { IgcTreemapModule } from 'igniteui-webcomponents-charts';
import { IgcTreemapComponent } from 'igniteui-webcomponents-charts';

import { DataContext } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core'; 

import { WorldConnections2 } from './WorldConnections2';
import { WorldUtils2 } from './WorldUtils2';
import { html } from 'lit-html';

// import './index.css'     
import './themes/tooltip-layout.css'     
 
import './themes/dark-theme.css'

import { WorldData } from './WorldData';
 
ModuleManager.register(
    IgcDataChartInteractivityModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcDataChartVerticalCategoryModule,
    IgcNumberAbbreviatorModule,
    
    IgcDataPieChartModule,
    IgcItemLegendModule,
    IgcPieChartModule,
    IgcDoughnutChartModule,

    IgcRadialGaugeModule,
    IgcLinearGaugeModule,
    IgcBulletGraphModule,
    
    IgcDataChartStackedModule,
    IgcStackedFragmentSeriesModule,

    IgcTreemapModule, 
    IgcGeographicMapModule
);
  
export class ThemeGallery {

    // maps
    private geoMap1: IgcGeographicMapComponent;
    private geoMap2: IgcGeographicMapComponent;
 
    // data charts
    private dataColChart: IgcDataChartComponent;
    private dataBarChart: IgcDataChartComponent;

    private dataScatterBubbleChart: IgcDataChartComponent;
    private dataScatterPointChart: IgcDataChartComponent;

    private dataCalloutChart: IgcDataChartComponent;
    private dataStackedChart: IgcDataChartComponent;

    // radial charts
    private pieChart: IgcPieChartComponent;
    private donutChart: IgcDoughnutChartComponent;
    private donutLegend: IgcItemLegendComponent;
    private dataPieChart: IgcDataPieChartComponent;

    // gauges
    private radialGauge: IgcRadialGaugeComponent;
    private linearGauge: IgcLinearGaugeComponent;
    private bulletGauge: IgcBulletGraphComponent;

    private treeMap: IgcTreemapComponent;
    constructor() {

        this.addGeoSymbolSeries = this.addGeoSymbolSeries.bind(this);
        this.addGeoConnectionSeries = this.addGeoConnectionSeries.bind(this);
        this.addGeoShapeSeries = this.addGeoShapeSeries.bind(this);

        this.addScatterPointChart = this.addScatterPointChart.bind(this);
        this.addScatterBubbleChart = this.addScatterBubbleChart.bind(this);

        this.addCountryTooltip = this.addCountryTooltip.bind(this);
        this.addCityTooltip = this.addCityTooltip.bind(this);
        this.addHiddenTooltip = this.addHiddenTooltip.bind(this);
      
        this.onDataLoaded = this.onDataLoaded.bind(this); 
        // this.onAirportMarker = this.onAirportMarker.bind(this);

        let hiddenGeoImagery = new IgcOpenStreetMapImagery();
        hiddenGeoImagery.opacity = 0.0; 

        this.geoMap1 = document.getElementById('geoMap1') as IgcGeographicMapComponent;
        this.geoMap1.backgroundContent = hiddenGeoImagery;

        this.geoMap2 = document.getElementById('geoMap2') as IgcGeographicMapComponent;
        this.geoMap2.backgroundContent = hiddenGeoImagery;
    
        this.dataScatterPointChart = document.getElementById('dataScatterPointChart') as IgcDataChartComponent;
        this.dataScatterBubbleChart = document.getElementById('dataScatterBubbleChart') as IgcDataChartComponent;
        
        this.dataCalloutChart = document.getElementById('dataCalloutChart') as IgcDataChartComponent;
        this.dataStackedChart = document.getElementById('dataStackedChart') as IgcDataChartComponent;
        var dataStackedLegend = document.getElementById('dataStackedLegend') as IgcDataLegendComponent;
        dataStackedLegend.target = this.dataStackedChart;
 
        this.dataColChart = document.getElementById('dataColChart') as IgcDataChartComponent;
        var dataColLegend = document.getElementById('dataColLegend') as IgcDataLegendComponent;
        dataColLegend.target = this.dataColChart;

        this.dataBarChart = document.getElementById('dataBarChart') as IgcDataChartComponent;
        var dataBarLegend = document.getElementById('dataBarLegend') as IgcDataLegendComponent;
        dataBarLegend.target = this.dataBarChart;

        var dataPieLegend = document.getElementById('dataPieLegend') as IgcItemLegendComponent;
        this.dataPieChart = document.getElementById('dataPieChart') as IgcDataPieChartComponent;
        this.dataPieChart.legend = dataPieLegend;

        var pieLegend = document.getElementById('pieLegend') as IgcItemLegendComponent;
        this.pieChart = document.getElementById('pieChart') as IgcPieChartComponent;
        this.pieChart.legend = pieLegend;

        this.donutLegend = document.getElementById('donutLegend') as IgcItemLegendComponent;
        this.donutChart = document.getElementById('donutChart') as IgcDoughnutChartComponent;

        this.radialGauge = document.getElementById('radialGauge') as IgcRadialGaugeComponent;
        this.radialGauge.value = 50;
        this.radialGauge.interval = 10;
        this.radialGauge.maximumValue = 80;
        this.radialGauge.titleText = "Title";
        this.radialGauge.titleDisplaysValue = true;
        this.radialGauge.subtitleText = "MPH";
        this.radialGauge.subtitleExtent = .60;
        this.radialGauge.isNeedleDraggingEnabled = true;
        this.radialGauge.isNeedleDraggingConstrained = true;
     
        this.linearGauge = document.getElementById('linearGauge') as IgcLinearGaugeComponent;
        this.linearGauge.value = 50;
        this.linearGauge.interval = 10;
        this.linearGauge.maximumValue = 80;
        this.linearGauge.isNeedleDraggingEnabled = true;  
 
        this.bulletGauge = document.getElementById('bulletGauge') as IgcBulletGraphComponent;
        this.bulletGauge.value = 50;
        this.bulletGauge.targetValue = 70;
        this.bulletGauge.interval = 10;
        this.bulletGauge.maximumValue = 80;
 
        this.treeMap = document.getElementById('treeMap') as IgcTreemapComponent;

        WorldData.loaded = this.onDataLoaded; 
        WorldData.loadData(); 
    }

    private onDataLoaded(sds: IgcShapeDataSource, e: any) {

        // adding series to geo map: 
        this.addGeoShapeSeries();  

        this.addGeoConnectionSeries(); 
        this.addGeoSymbolSeries();
 
        this.addScatterPointChart();
        this.addScatterBubbleChart();
        
        this.addCalloutChart();
        this.addStackedChart();

        this.addBarChart();
        this.addColumnChart();

        this.dataPieChart.valueMemberPath = "population";
        this.dataPieChart.labelMemberPath = "name";
        this.dataPieChart.legendLabelMemberPath = "name";
        this.dataPieChart.valueAxisAbbreviateLargeNumbers = true;
        this.dataPieChart.othersCategoryType = OthersCategoryType.Percent;
        this.dataPieChart.othersCategoryThreshold = 5;
        this.dataPieChart.radiusExtent = 0.75;
        this.dataPieChart.dataSource = WorldData.continents;

        this.pieChart.valueMemberPath = "population";
        this.pieChart.labelMemberPath = "populationPercent"; 
        this.pieChart.legendLabelMemberPath = "name";
        this.pieChart.othersCategoryType = OthersCategoryType.Percent;
        this.pieChart.othersCategoryThreshold = 5;
        this.pieChart.radiusFactor = 0.75;
        this.pieChart.dataSource = WorldData.continents;
        this.pieChart.labelsPosition = LabelsPosition.Center;
         
        let donutSeries = new IgcRingSeriesComponent();
        donutSeries.valueMemberPath = "population"; 
        donutSeries.labelMemberPath = "populationPercent"; 
        donutSeries.legendLabelMemberPath = "name";
        donutSeries.othersCategoryType = OthersCategoryType.Percent;
        donutSeries.othersCategoryThreshold = 5;
        donutSeries.radiusFactor = 0.75;
        donutSeries.dataSource = WorldData.continents;
        donutSeries.legend = this.donutLegend; 
        this.donutChart.innerExtent = 0.3;
        this.donutChart.series.add(donutSeries); 
              
        this.treeMap.rootTitle = "Continents"; 
        this.treeMap.parentIdMemberPath = "parent";
        this.treeMap.valueMemberPath = "population";
        this.treeMap.labelMemberPath = "name";
        this.treeMap.idMemberPath = "name";  
        this.treeMap.dataSource = WorldData.continentTreeNodes;
        // applying custom styling from reveal insteaf of using fill scale
        this.treeMap.nodeStyling = (s: IgcTreemapComponent, e: any) => {
            const item = e.item as any; 
            const brushCount = this.treeMap.fillBrushes.length;
            const parentFillIndex = item.parentID % brushCount;
            const rootFillIndex = item.childID % brushCount; 
            // console.log(brushCount  + " parent: " + item.parentID  + " child: " + item.childID + " styling: " + e.item.name );
            // e.style.fill = item.childID == -1 ? this.treeMap.fillBrushes[rootFillIndex] : this.treeMap.fillBrushes[parentFillIndex];
            e.style.fill = this.treeMap.fillBrushes[parentFillIndex];
        }
       
        //  this.treeMap.textColor = "white"; 
        //  this.treeMap.darkTextColor = "yellow";    
        //   this.treeMap.headerDarkTextColor = "blue"; 
        // this.treeMap.outline = "red";    
 
        // this.treeMap.fillBrushes = ["red", "green"];
    }
   
    public addCountryTooltip(dataContext: any): any {
        // console.log("addCountryTooltip");
        // const dataContext = context.dataContext as DataContext;
        // if (!dataContext) return null;

        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        // console.log(dataItem); 
 
        const pop = WorldUtils2.toStringAbbr(dataItem.population);
 
        return html`<div>
            <div class='tooltip-box'>
                <div class='tooltip-row'>
                    <div class='tooltip-txt'>Country</div>
                    <div class='tooltip-val'>${dataItem.name}</div>
                </div>
                <div class='tooltip-row'>
                    <div class='tooltip-txt'>Population</div>
                    <div class='tooltip-val'>${pop}</div>
                </div>
                <div class='tooltip-row'>
                    <div class='tooltip-txt'>Continent</div>
                    <div class='tooltip-val'>${dataItem.continent}</div>
                </div>
            </div>`; 
    }

    public addCityTooltip(dataContext: any): any {
        const series = dataContext.series as any;
        if (!series) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        return html`<div> 
            <div class='tooltip-box'>
                <div class='tooltip-row'>
                    <div class='tooltip-txt'>City</div>
                    <div class='tooltip-val'>${dataItem.name}</div>
                </div> 
                <div class='tooltip-row'>
                    <div class='tooltip-txt'>Population</div>
                    <div class='tooltip-val'>${dataItem.pop} M</div>
                </div> 
             </div>`;
    }

    public addHiddenTooltip(dataContext: any): any {
        const series = dataContext.series as any;
        if (!series) return null;
        
        series.hideToolTips();
        return null;

    }

    private addScatterPointChart() {
        var xAxis = new IgcNumericXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();
        xAxis.isLogarithmic = true;
        yAxis.isLogarithmic = true;
        xAxis.abbreviateLargeNumbers = true;
        yAxis.abbreviateLargeNumbers = true;
        xAxis.minimumValue = 1000; 
        yAxis.minimumValue = 100;
        // yAxis.companionAxisEnabled = true;
        // yAxis.companionAxisMaximumValue = 100000000;
        // yAxis.companionAxisMinimumValue = 1000;
        // yAxis.companionAxisLabelLocation = "OutsideRight";

        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 5;
        sizeScale.maximumValue = 40;

        for (const continent of WorldData.continents) {
            const scatterSeries = new IgcScatterSeriesComponent(); 
            scatterSeries.dataSource = continent.countries;
            scatterSeries.markerType = MarkerType.Circle;
            scatterSeries.xAxis = xAxis;
            scatterSeries.yAxis = yAxis;
            scatterSeries.title = continent.name;
            scatterSeries.xMemberPath = 'population';
            scatterSeries.yMemberPath = 'gdpPerPerson'; 
            scatterSeries.tooltipTemplate = this.addCountryTooltip;
            this.dataScatterPointChart.series.add(scatterSeries);
        }
        
        this.dataScatterPointChart.axes.add(xAxis);
        this.dataScatterPointChart.axes.add(yAxis);
        this.dataScatterPointChart.chartTitle = "Scatter Point Chart - Population by Continent";
        this.dataScatterPointChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataScatterPointChart.isHorizontalZoomEnabled = true;
        this.dataScatterPointChart.isVerticalZoomEnabled = true;
        // this.chart.plotAreaMarginBottom = 10; 
    }

    private addScatterBubbleChart() {
        var xAxis = new IgcNumericXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();
        xAxis.isLogarithmic = true;
        yAxis.isLogarithmic = true;
        xAxis.abbreviateLargeNumbers = true;
        yAxis.abbreviateLargeNumbers = true;
        xAxis.minimumValue = 1000; 
        yAxis.minimumValue = 100;
        // yAxis.companionAxisEnabled = true;
        // yAxis.companionAxisMaximumValue = 100000000;
        // yAxis.companionAxisMinimumValue = 1000;
        // yAxis.companionAxisLabelLocation = "OutsideRight";

        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 5;
        sizeScale.maximumValue = 40;

        const bubbleSeries = new IgcBubbleSeriesComponent(); 
        bubbleSeries.dataSource = WorldData.countries;
        bubbleSeries.markerType = MarkerType.Circle;
        bubbleSeries.xAxis = xAxis;
        bubbleSeries.yAxis = yAxis;
        bubbleSeries.xMemberPath = 'population';
        bubbleSeries.yMemberPath = 'gdpPerPerson'; 
        bubbleSeries.radiusMemberPath = 'gdpTotal';
        bubbleSeries.radiusScale = sizeScale; 
        bubbleSeries.tooltipTemplate = this.addCountryTooltip;
        
        this.dataScatterBubbleChart.axes.add(xAxis);
        this.dataScatterBubbleChart.axes.add(yAxis);
        this.dataScatterBubbleChart.series.add(bubbleSeries);
        this.dataScatterBubbleChart.chartTitle = "Scatter Bubble Chart - Population vs GDP per Person";
        this.dataScatterBubbleChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataScatterBubbleChart.isHorizontalZoomEnabled = true;
        this.dataScatterBubbleChart.isVerticalZoomEnabled = true;
    }

    private addBarChart() {
        var yAxis = new IgcCategoryYAxisComponent();
        var xAxis = new IgcNumericXAxisComponent();

        yAxis.interval = 1;
        yAxis.label = "year";
        yAxis.dataSource = WorldData.olympicResult; 
         
        var countries = [ 
            { "value": "medalsUSA", "name": "USA" }, 
            { "value": "medalsCHN", "name": "CHN" }, 
            { "value": "medalsRUS", "name": "RUS" }, 
            { "value": "medalsSPA", "name": "SPA" }, 
            { "value": "medalsFRA", "name": "FRA" }, 
            { "value": "medalsGER", "name": "GER" }
        ];     

        for (const country of countries) {
            const series1 = new IgcBarSeriesComponent(); 
            series1.dataSource = WorldData.olympicResult; 
            series1.xAxis = xAxis;  
            series1.yAxis = yAxis; 
            series1.valueMemberPath = country.value; 
            series1.title = country.name;
            this.dataBarChart.series.add(series1);
        }
 
        this.dataBarChart.axes.add(xAxis);
        this.dataBarChart.axes.add(yAxis);
        this.dataBarChart.chartTitle = "Bar Chart - Olympic Medals by Country";
        this.dataBarChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataBarChart.isHorizontalZoomEnabled = true;
        this.dataBarChart.isVerticalZoomEnabled = true;
                 
        let tooltip = new IgcDataToolTipLayerComponent();
        this.dataBarChart.series.add(tooltip);
    }

    private addColumnChart() {
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();

        xAxis.label = "year";
        xAxis.dataSource = WorldData.olympicResult;
         
        this.dataColChart.chartTitle = "Column Chart - Olympic Medals by Country";
        this.dataColChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataColChart.isHorizontalZoomEnabled = true;
        this.dataColChart.isVerticalZoomEnabled = true;
        this.dataColChart.axes.add(xAxis);
        this.dataColChart.axes.add(yAxis);

        var countries = [ 
            { "value": "medalsUSA", "name": "USA" }, 
            { "value": "medalsCHN", "name": "CHN" }, 
            { "value": "medalsRUS", "name": "RUS" }, 
            { "value": "medalsSPA", "name": "SPA" }, 
            { "value": "medalsFRA", "name": "FRA" }, 
            { "value": "medalsGER", "name": "GER" }
        ];    

        for (const country of countries) {
            const series1 = new IgcColumnSeriesComponent(); 
            series1.dataSource = WorldData.olympicResult; 
            series1.xAxis = xAxis; 
            series1.yAxis = yAxis; 
            series1.valueMemberPath = country.value; 
            series1.title = country.name;
            this.dataColChart.series.add(series1);
        }

        let tooltip = new IgcDataToolTipLayerComponent();
        this.dataColChart.series.add(tooltip);
    }

     private addStackedChart() {
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();

        xAxis.label = "year";
        xAxis.dataSource = WorldData.olympicResult;
         
        this.dataStackedChart.chartTitle = "Stacked 100% Column Chart - Olympic Medals";
        this.dataStackedChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataStackedChart.isHorizontalZoomEnabled = true;
        this.dataStackedChart.isVerticalZoomEnabled = true;
        this.dataStackedChart.axes.add(xAxis);
        this.dataStackedChart.axes.add(yAxis);

        var countries = [ 
            { "value": "medalsUSA", "name": "USA" }, 
            { "value": "medalsCHN", "name": "CHN" }, 
            { "value": "medalsRUS", "name": "RUS" }, 
            { "value": "medalsSPA", "name": "SPA" },
        ];    

        const series1 = new IgcStacked100ColumnSeriesComponent(); 
        series1.dataSource = WorldData.olympicResult; 
        series1.xAxis = xAxis; 
        series1.yAxis = yAxis;
        // series1.markerType = MarkerType.Circle;
        this.dataStackedChart.series.add(series1);

        for (const country of countries) {
            var fragement1 = new IgcStackedFragmentSeriesComponent();
            fragement1.valueMemberPath = country.value;
            fragement1.title = country.name;
            series1.series.add(fragement1);
        }

        let tooltip = new IgcDataToolTipLayerComponent();
        this.dataStackedChart.series.add(tooltip);

    }

    private addCalloutChart() {
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();

        xAxis.label = "year";
        xAxis.dataSource = WorldData.olympicResult;
         
        this.dataCalloutChart.chartTitle = "Data Chart with Callout - Olympic Medals";
        this.dataCalloutChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataCalloutChart.isHorizontalZoomEnabled = true;
        this.dataCalloutChart.isVerticalZoomEnabled = true;
        this.dataCalloutChart.axes.add(xAxis);
        this.dataCalloutChart.axes.add(yAxis);

        var countries = [ 
            { "value": "medalsUSA", "name": "USA" }, 
            { "value": "medalsCHN", "name": "CHN" }, 
            { "value": "medalsRUS", "name": "RUS" }, 
            { "value": "medalsSPA", "name": "SPA" },
        ];    

        for (const country of countries) {
            const series1 = new IgcLineSeriesComponent(); 
            series1.dataSource = WorldData.olympicResult; 
            series1.xAxis = xAxis; 
            series1.yAxis = yAxis; 
            series1.valueMemberPath = country.value; 
            series1.title = country.name;
            this.dataCalloutChart.series.add(series1);
        }

        const calloutLayer = new IgcCalloutLayerComponent(); 
        calloutLayer.isAutoCalloutBehaviorEnabled = true;
        calloutLayer.allowedPositions.clear();
        calloutLayer.allowedPositions.add(CalloutPlacementPositions.Top);
        calloutLayer.calloutLeaderBrush = "transparent";

        this.dataCalloutChart.series.add(calloutLayer); 

        let tooltip = new IgcDataToolTipLayerComponent();
        this.dataCalloutChart.series.add(tooltip);

        this.dataCalloutChart.plotAreaMarginTop = 20;
        this.dataCalloutChart.plotAreaMarginLeft = 20;
        this.dataCalloutChart.plotAreaMarginRight = 20;
        this.dataCalloutChart.plotAreaMarginBottom = 0;
    }

    private addCalloutChart2() {
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();
 
        // yAxis.title = "Population";
        yAxis.interval = 1000000000;
        yAxis.abbreviateLargeNumbers = true;
        xAxis.interval = 1;
        xAxis.label = "name";
        xAxis.dataSource = WorldData.continents;
 
        const categorySeries = new IgcLineSeriesComponent(); 
        categorySeries.dataSource = WorldData.continents;
        categorySeries.xAxis = xAxis; 
        categorySeries.yAxis = yAxis; 
        categorySeries.valueMemberPath = 'population'; 
        categorySeries.title = "Population";
        categorySeries.markerBrush = "black";

        this.dataCalloutChart.axes.add(xAxis);
        this.dataCalloutChart.axes.add(yAxis);
        this.dataCalloutChart.series.add(categorySeries);
        this.dataCalloutChart.chartTitle = "Line Chart with Callouts - Population by Continent";
        this.dataCalloutChart.titleTextStyle = "10px Verdana, sans-serif";
        this.dataCalloutChart.isHorizontalZoomEnabled = true;
        this.dataCalloutChart.isVerticalZoomEnabled = true;

        var numberFormater = new IgcNumberFormatSpecifier();
        numberFormater.style = "currency";
        // numberFormater.currency = "USD";  
        // numberFormater.currencyDisplay = "symbol";
        numberFormater.minimumFractionDigits = 0; 
        numberFormater.useGrouping = true;
        numberFormater.currencyCode = "USD";
        var numSpecifier: IgcNumberFormatSpecifier[] = [numberFormater];
            
        const calloutLayer = new IgcCalloutLayerComponent(); 
        // calloutLayer.isAutoCalloutBehaviorEnabled = true;
        calloutLayer.labelMemberPath = "populationAbbr"; 
        calloutLayer.xMemberPath = 'index';
        calloutLayer.yMemberPath = 'population';
        calloutLayer.dataSource = WorldData.continents;
        calloutLayer.brush = categorySeries.actualBrush;
        this.dataCalloutChart.series.add(calloutLayer);

        this.dataCalloutChart.plotAreaMarginLeft = 10;
        this.dataCalloutChart.plotAreaMarginRight = 10;
 
        var final = new IgcFinalValueLayerComponent(); 
        final.axisAnnotationBackground = categorySeries.actualBrush;
        this.dataCalloutChart.series.add(final);
    }
 
    private addGeoShapeSeries() {

        this.geoMap2.title = "Countries by Region";
        this.geoMap2.titleTextStyle = "10px Verdana, sans-serif";

        var dataItems = WorldData.continents;
        for (let i = 0; i < dataItems.length; i++) {
            const region = dataItems[i]; 
         
            const shapeSeries = new IgcGeographicShapeSeriesComponent();
            shapeSeries.name = 'series' + i;
            // shapeSeries.dataSource = [shape];
            shapeSeries.dataSource = region.countries;
            shapeSeries.shapeMemberPath = 'points';
            shapeSeries.tooltipTemplate = this.addCountryTooltip;
            shapeSeries.title = region.name;
            shapeSeries.showDefaultTooltip = true;

            this.geoMap2.series.add(shapeSeries);
        }

        this.geoMap2.windowRect = { left: 0.2, top: 0.0, width: 0.6, height: 0.8};
}

    private getCssVariable(cssVariableName: string) {
        const rootElement = document.documentElement;
        return getComputedStyle(rootElement).getPropertyValue(cssVariableName);
    }

    private addGeoConnectionSeries() {
          
        this.geoMap1.windowRect = { left: 0.2, top: 0.0, width: 0.6, height: 0.8};

        const shapeSeries = new IgcGeographicShapeSeriesComponent(); 
        shapeSeries.dataSource = WorldData.countries;
        shapeSeries.shapeMemberPath = 'points';
        shapeSeries.tooltipTemplate = this.addCountryTooltip;
        shapeSeries.brush =   this.getCssVariable('--mainBackground');
        shapeSeries.outline = this.getCssVariable('--mainForeground');

        // shapeSeries.brush = "transparent";
        // shapeSeries.outline = this.geoMap1.brushes[3];
        shapeSeries.showDefaultTooltip = true;
        this.geoMap1.series.add(shapeSeries);

        let connectionData = WorldConnections2.getFlights();
        let connectionSeries = new IgcGeographicPolylineSeriesComponent();
        connectionSeries.dataSource = connectionData;
        connectionSeries.shapeMemberPath = 'points';  
        connectionSeries.showDefaultTooltip = false;
        connectionSeries.outline = this.geoMap1.brushes[3];
        // connectionSeries.tooltipTemplate = this.addHiddenTooltip;
        this.geoMap1.series.add(connectionSeries);
    }
  
    public addGeoSymbolSeries() {
        let symbolLocations = WorldConnections2.getAirportLocations();

        const sizeScale = new IgcSizeScaleComponent();
        sizeScale.minimumValue = 5;
        sizeScale.maximumValue = 40;
           
        // const symbolSeries = new IgcGeographicProportionalSymbolSeriesComponent();
        // symbolSeries.radiusMemberPath = 'pop'; 
        // symbolSeries.radiusScale = sizeScale;   
        const symbolSeries = new IgcGeographicSymbolSeriesComponent();
        symbolSeries.dataSource = symbolLocations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.latitudeMemberPath = 'y';
        symbolSeries.longitudeMemberPath = 'x';
        symbolSeries.markerOutlineMode = MarkerOutlineMode.Normal;
        symbolSeries.markerFillMode = MarkerFillMode.Normal;
        symbolSeries.markerBrush = this.geoMap1.brushes[1];
        
        symbolSeries.title = "airports"; 
        symbolSeries.tooltipTemplate = this.addCityTooltip;
        this.geoMap1.series.add(symbolSeries);
    }
    

}

new ThemeGallery();
