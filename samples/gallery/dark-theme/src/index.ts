import { IgcGeographicMapModule } from 'igniteui-webcomponents-maps';
import { IgcGeographicMapComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicProportionalSymbolSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicPolylineSeriesComponent } from 'igniteui-webcomponents-maps';
import { IgcGeographicShapeSeriesComponent } from 'igniteui-webcomponents-maps';

import { IgcBulletGraphComponent, IgcBulletGraphModule, IgcLinearGaugeComponent, IgcLinearGaugeModule, IgcRadialGaugeComponent, IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';

import { CellContentHorizontalAlignment, IgcColumnWidth, IgcDataGridComponent, IgcNumericColumnComponent, SortIndicatorStyle } from 'igniteui-webcomponents-data-grids';
import { IgcDataGridModule } from 'igniteui-webcomponents-data-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-data-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-data-grids';
import { IgcColumnSummaryDescription } from 'igniteui-webcomponents-data-grids';
import { DataSourceSummaryOperand, SummaryCalculator, DefaultSummaryResult, IDataSource, ISummaryResult } from 'igniteui-webcomponents-core';


import { CalloutPlacementPositions, DataToolTipLayer, IgcCalloutLayerComponent, IgcDataChartInteractivityModule, IgcDataChartStackedModule, IgcDataLegendComponent, IgcDataPieChartComponent, IgcDataPieChartModule, IgcDoughnutChartComponent, IgcDoughnutChartModule, IgcFinalValueLayerComponent, IgcFunnelChartComponent, IgcFunnelChartModule, IgcItemLegendComponent, IgcItemLegendModule, IgcLineSeriesComponent, IgcPieChartComponent, IgcPieChartModule, IgcRingSeriesComponent, IgcScatterSeriesComponent, IgcStacked100AreaSeriesComponent, IgcStacked100ColumnSeriesComponent, IgcStackedFragmentSeriesComponent, IgcStackedFragmentSeriesModule, IgcStackedLineSeriesComponent, LabelsPosition, MarkerFillMode, MarkerOutlineMode, TreemapFillScaleMode, TreemapHeaderDisplayMode } from 'igniteui-webcomponents-charts'; 
import { IgcNumberAbbreviatorModule, IgcDataChartCoreModule, IgcDataChartScatterModule, IgcDataChartScatterCoreModule, IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent, IgcCategoryYAxisComponent, IgcBarSeriesComponent, IgcNumericXAxisComponent, IgcNumericYAxisComponent, IgcBubbleSeriesComponent, IgcDataToolTipLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule, IgcDataChartVerticalCategoryModule } from 'igniteui-webcomponents-charts';

import { IgcColumnSeriesComponent, IgcCategoryXAxisComponent } from 'igniteui-webcomponents-charts'; 
import { IgcSizeScaleComponent, MarkerType } from 'igniteui-webcomponents-charts'; 

import { HighlightedValueDisplayMode, IgcNumberFormatSpecifier, IgcShapeDataSource, OthersCategoryType, Visibility } from 'igniteui-webcomponents-core';
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
    IgcDataGridModule,
    IgcGridColumnOptionsModule,

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
    IgcFunnelChartModule,
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

        var radialGauge = document.getElementById('radialGauge') as IgcRadialGaugeComponent;
        radialGauge.value = 50;
        radialGauge.interval = 10;
        radialGauge.maximumValue = 80;
        radialGauge.titleText = "Title";
        radialGauge.titleDisplaysValue = true;
        radialGauge.subtitleText = "MPH";
        radialGauge.subtitleExtent = .60;
        radialGauge.isNeedleDraggingEnabled = true;
        radialGauge.isNeedleDraggingConstrained = true;

        var linearGauge = document.getElementById('linearGauge') as IgcLinearGaugeComponent;
        linearGauge.value = 50;
        linearGauge.interval = 10;
        linearGauge.maximumValue = 80;
        linearGauge.isNeedleDraggingEnabled = true;
 
        var bulletGauge = document.getElementById('bulletGauge') as IgcBulletGraphComponent;
        bulletGauge.value = 50;
        bulletGauge.targetValue = 70;
        bulletGauge.interval = 10;
        bulletGauge.maximumValue = 80;

        WorldData.loaded = this.onDataLoaded; 
        WorldData.loadData(); 
    }

    private onDataLoaded(sds: IgcShapeDataSource, e: any) {

        this.addTreemap1();
        this.addTreemap2();

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

        var dataGrid = document.getElementById('dataGrid') as IgcDataGridComponent;
        dataGrid.dataSource = WorldData.countries;
//         dataGrid.cellTextColor = "red";
//         dataGrid.headerTextColor = "red";
//         dataGrid.rowHoverBackground = "rgba(247, 211, 9, 0.313)";
//         dataGrid.rowHoverTextColor = "red";
//         dataGrid.sectionHeaderTextColor = "red";
//         dataGrid.summaryRootValueTextColor = "red";
// dataGrid.cellBackground = "gray";
// dataGrid.headerBackground = "yellow";
// dataGrid.cellSelectedBackground = "rgba(255, 255, 255, 0.2)";
// dataGrid.headerSeparatorBackground = "red"; 
dataGrid.headerSortIndicatorStyle = SortIndicatorStyle.FadingSimpleUpDownArrows;


        var dataPieLegend = document.getElementById('dataPieLegend') as IgcItemLegendComponent;
        var dataPieChart = document.getElementById('dataPieChart') as IgcDataPieChartComponent;
        dataPieChart.legend = dataPieLegend;
        dataPieChart.valueMemberPath = "population";
        dataPieChart.labelMemberPath = "name";    
        dataPieChart.legendLabelMemberPath = "name";
        dataPieChart.valueAxisAbbreviateLargeNumbers = true;
        dataPieChart.othersCategoryType = OthersCategoryType.Percent;
        dataPieChart.othersCategoryThreshold = 10;
        dataPieChart.radiusExtent = 0.75; 
        dataPieChart.transitionInDuration = 0;
        dataPieChart.dataSource = WorldData.continents;

        var funnelLegend = document.getElementById('funnelLegend') as IgcItemLegendComponent;
        var funnelChart = document.getElementById('funnelChart') as IgcFunnelChartComponent;
        funnelChart.legend = funnelLegend;
        funnelChart.valueMemberPath = "population"; 
        funnelChart.innerLabelMemberPath = "populationPercent"; 
        funnelChart.innerLabelVisibility = Visibility.Visible; 
        funnelChart.outerLabelMemberPath = "name"; 
        // funnelChart.outerLabelVisibility = Visibility.Visible;      
        funnelChart.useOuterLabelsForLegend = true;
        funnelChart.dataSource = WorldData.continents;

        var pieLegend = document.getElementById('pieLegend') as IgcItemLegendComponent;
        var pieChart = document.getElementById('pieChart') as IgcPieChartComponent;
        pieChart.legend = pieLegend;
        pieChart.valueMemberPath = "population";
        pieChart.labelMemberPath = "populationPercent"; 
        pieChart.legendLabelMemberPath = "name";
        pieChart.labelsPosition = LabelsPosition.InsideEnd;
        pieChart.othersCategoryType = OthersCategoryType.Percent;   
        pieChart.othersCategoryThreshold = 10;
        pieChart.radiusFactor = 0.75;
        pieChart.labelExtent = 0.5;
        pieChart.dataSource = WorldData.continents;
         
        let donutLegend = document.getElementById('donutLegend') as IgcItemLegendComponent;
        let donutSeries = new IgcRingSeriesComponent();
        donutSeries.valueMemberPath = "population"; 
        donutSeries.labelMemberPath = "populationPercent"; 
        donutSeries.legendLabelMemberPath = "name";
        donutSeries.labelsPosition = LabelsPosition.InsideEnd; 
        donutSeries.othersCategoryType = OthersCategoryType.Percent; 
        donutSeries.othersCategoryThreshold = 10;
        // donutSeries.othersCategoryFill = "blue"; 
        // donutSeries.othersCategoryStroke = "red";
        donutSeries.radiusFactor = 0.75;
        donutSeries.dataSource = WorldData.continents;
        donutSeries.legend = donutLegend; 

        var donutChart = document.getElementById('donutChart') as IgcDoughnutChartComponent;
        donutChart.innerExtent = 0.3;
        donutChart.series.add(donutSeries); 
              
    }
   
    public addTreemap1(): any {
        var treeMap1 = document.getElementById('treeMap1') as IgcTreemapComponent;
        treeMap1.rootTitle = "Continents"; 
        treeMap1.parentIdMemberPath = "parent";
        treeMap1.valueMemberPath = "population";
        treeMap1.labelMemberPath = "name"; 
        treeMap1.idMemberPath = "name";   
        treeMap1.headerDisplayMode = TreemapHeaderDisplayMode.Overlay;
        // treeMap1.fillScaleMode = TreemapFillScaleMode.GlobalSum;
        // treeMap1.fillScaleMinimumValue = 0;
        // treeMap1.fillScaleMaximumValue = 1500000000;
        treeMap1.parentNodeRightPadding = 0;
        treeMap1.parentNodeLeftPadding = 0;
        treeMap1.parentNodeTopPadding = 0;
        treeMap1.parentNodeBottomPadding = 0;

        treeMap1.dataSource = WorldData.continentTreeNodes;
        // applying custom styling from reveal insteaf of using fill scale
        treeMap1.nodeStyling = (s: IgcTreemapComponent, e: any) => {
            const item = e.item as any; 
            const brushCount = treeMap1.fillBrushes.length;
            const parentFillIndex = item.parentID % brushCount;
            const rootFillIndex = item.childID % brushCount; 
            // console.log(brushCount  + " parent: " + item.parentID  + " child: " + item.childID + " styling: " + e.item.name );
            // e.style.fill = item.childID == -1 ? treeMap1.fillBrushes[rootFillIndex] : treeMap1.fillBrushes[parentFillIndex];
            e.style.fill = treeMap1.fillBrushes[parentFillIndex];
        }
    }
   
    public addTreemap2(): any {
        var treeMap2 = document.getElementById('treeMap2') as IgcTreemapComponent;
        treeMap2.rootTitle = "Continents"; 
        treeMap2.parentIdMemberPath = "parent";
        treeMap2.valueMemberPath = "population";
        treeMap2.labelMemberPath = "name"; 
        treeMap2.idMemberPath = "name";   
        treeMap2.headerDisplayMode = TreemapHeaderDisplayMode.Overlay;
        treeMap2.parentNodeRightPadding = 0;
        treeMap2.parentNodeLeftPadding = 0;
        treeMap2.parentNodeTopPadding = 0;
        treeMap2.parentNodeBottomPadding = 0;
        treeMap2.fillScaleMinimumValue = 0; 
        treeMap2.fillScaleMaximumValue = 1500000000;
        treeMap2.fillScaleMode = TreemapFillScaleMode.GlobalSum;
        treeMap2.fillBrushes = [this.getCssVariable('--color2'), this.getCssVariable('--color3')];
        treeMap2.dataSource = WorldData.countries;      
         
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

        var dataScatterPointChart = document.getElementById('dataScatterPointChart') as IgcDataChartComponent;
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
            dataScatterPointChart.series.add(scatterSeries);
        }
        
        dataScatterPointChart.axes.add(xAxis);
        dataScatterPointChart.axes.add(yAxis);
        dataScatterPointChart.chartTitle = "Population by Continent";
        dataScatterPointChart.titleTextStyle = "15px Verdana, sans-serif";
        dataScatterPointChart.isHorizontalZoomEnabled = true;
        dataScatterPointChart.isVerticalZoomEnabled = true;
        // chart.plotAreaMarginBottom = 10; 
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
          
        var dataScatterBubbleChart = document.getElementById('dataScatterBubbleChart') as IgcDataChartComponent;
        dataScatterBubbleChart.axes.add(xAxis);
        dataScatterBubbleChart.axes.add(yAxis);
        dataScatterBubbleChart.series.add(bubbleSeries);
        dataScatterBubbleChart.chartTitle = "Population vs GDP per Person";
        dataScatterBubbleChart.titleTextStyle = "15px Verdana, sans-serif";
        dataScatterBubbleChart.isHorizontalZoomEnabled = true;
        dataScatterBubbleChart.isVerticalZoomEnabled = true;
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

        var dataBarChart = document.getElementById('dataBarChart') as IgcDataChartComponent;

        for (const country of countries) {
            const series1 = new IgcBarSeriesComponent(); 
            series1.dataSource = WorldData.olympicResult; 
            series1.xAxis = xAxis;  
            series1.yAxis = yAxis; 
            series1.valueMemberPath = country.value; 
            series1.title = country.name;
            dataBarChart.series.add(series1);
        }
 
        dataBarChart.axes.add(xAxis);
        dataBarChart.axes.add(yAxis);
        dataBarChart.chartTitle = "Olympic Medals by Country";
        dataBarChart.titleTextStyle = "15px Verdana, sans-serif";
        dataBarChart.isHorizontalZoomEnabled = true;
        dataBarChart.isVerticalZoomEnabled = true;
                 
        let tooltip = new IgcDataToolTipLayerComponent();
        dataBarChart.series.add(tooltip);

        var dataBarLegend = document.getElementById('dataBarLegend') as IgcDataLegendComponent;
        dataBarLegend.target = dataBarChart;
    }

    private addColumnChart() { 
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();

        xAxis.label = "year";
        xAxis.dataSource = WorldData.olympicResult;
         
        var dataColChart = document.getElementById('dataColChart') as IgcDataChartComponent;
        dataColChart.chartTitle = "Olympic Medals by Country";
        dataColChart.titleTextStyle = "15px Verdana, sans-serif";
        dataColChart.isHorizontalZoomEnabled = true;
        dataColChart.isVerticalZoomEnabled = true;
        dataColChart.axes.add(xAxis);
        dataColChart.axes.add(yAxis);

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
            dataColChart.series.add(series1);
        }

        let tooltip = new IgcDataToolTipLayerComponent();
        dataColChart.series.add(tooltip);

        var dataColLegend = document.getElementById('dataColLegend') as IgcDataLegendComponent;
        dataColLegend.target = dataColChart;
    }

     private addStackedChart() {
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();

        xAxis.label = "year";
        xAxis.dataSource = WorldData.olympicResult;
         
        var dataStackedChart = document.getElementById('dataStackedChart') as IgcDataChartComponent;
        dataStackedChart.chartTitle = "Olympic Medals";
        dataStackedChart.titleTextStyle = "15px Verdana, sans-serif";
        dataStackedChart.isHorizontalZoomEnabled = true;
        dataStackedChart.isVerticalZoomEnabled = true;
        dataStackedChart.axes.add(xAxis);
        dataStackedChart.axes.add(yAxis);

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
        dataStackedChart.series.add(series1);

        for (const country of countries) {
            var fragement1 = new IgcStackedFragmentSeriesComponent();
            fragement1.valueMemberPath = country.value;
            fragement1.title = country.name;
            series1.series.add(fragement1);
        }

        let tooltip = new IgcDataToolTipLayerComponent();
        dataStackedChart.series.add(tooltip);

        var dataStackedLegend = document.getElementById('dataStackedLegend') as IgcDataLegendComponent;
        dataStackedLegend.target = dataStackedChart;
    }

    private addCalloutChart() {
        var xAxis = new IgcCategoryXAxisComponent();
        var yAxis = new IgcNumericYAxisComponent();

        xAxis.label = "year";
        xAxis.dataSource = WorldData.olympicResult;
         
        var dataCalloutChart = document.getElementById('dataCalloutChart') as IgcDataChartComponent;
        dataCalloutChart.chartTitle = "Olympic Medals";
        dataCalloutChart.titleTextStyle = "15px Verdana, sans-serif";
        dataCalloutChart.isHorizontalZoomEnabled = true; 
        dataCalloutChart.isVerticalZoomEnabled = true;
        dataCalloutChart.axes.add(xAxis);
        dataCalloutChart.axes.add(yAxis);
 
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
            dataCalloutChart.series.add(series1);
        }

        const calloutLayer = new IgcCalloutLayerComponent(); 
        calloutLayer.isAutoCalloutBehaviorEnabled = true;
        calloutLayer.allowedPositions.clear();
        calloutLayer.allowedPositions.add(CalloutPlacementPositions.Top);
        calloutLayer.calloutLeaderBrush = "transparent";

        dataCalloutChart.series.add(calloutLayer); 

        let tooltip = new IgcDataToolTipLayerComponent();
        dataCalloutChart.series.add(tooltip);

        dataCalloutChart.plotAreaMarginTop = 20;
        dataCalloutChart.plotAreaMarginLeft = 20;
        dataCalloutChart.plotAreaMarginRight = 20;
        dataCalloutChart.plotAreaMarginBottom = 0;
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
