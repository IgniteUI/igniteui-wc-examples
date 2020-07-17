
import { IgcBubbleSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcBubbleSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcAnnotationLayerComponent } from 'igniteui-webcomponents-charts';
import { IgcDataChartAnnotationModule } from 'igniteui-webcomponents-charts';
import { IgcCrosshairLayerModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartScatterCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcNumberAbbreviatorModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';
import { IgcZoomSliderModule } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisModule } from 'igniteui-webcomponents-charts';
import { IgcNumericXAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcNumericYAxisComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleComponent } from 'igniteui-webcomponents-charts';
import { IgcSizeScaleModule } from 'igniteui-webcomponents-charts';
import { IgcZoomSliderComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgRect } from 'igniteui-webcomponents-core';
import { SampleScatterStats } from './SampleScatterStats';
import { MarkerType } from 'igniteui-webcomponents-charts';
import { IgcChartCursorEventArgs } from 'igniteui-webcomponents-charts';
import { IgcRectChangedEventArgs } from 'igniteui-webcomponents-core';
import { IgcZoomSliderResolvingAxisValueEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcZoomSliderModule,
    IgcDataChartCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcDataChartAnnotationModule,
    IgcNumberAbbreviatorModule,
    IgcDataChartScatterModule,
    IgcDataChartScatterCoreModule,
    IgcCrosshairLayerModule,
    IgcSizeScaleModule,
    IgcNumericXAxisModule,
    IgcNumericYAxisModule,
    IgcBubbleSeriesModule
);


export class ZoomSliderOverview {


    
    
        

    private mainChart: IgcDataChartComponent;
    private zoomChart: IgcDataChartComponent;
    private zoomSlider: IgcZoomSliderComponent;
    private charts: IgcDataChartComponent[] = [];
    private container: HTMLDivElement;
    private isSynchronizingZoom: boolean = false;
    private lastRect: IgRect = { left: -1, top: -1, width: -1, height: -1};

    private countriesAll: any[];

    constructor() {
        

        this.onActualWindowRectChanged = this.onActualWindowRectChanged.bind(this);
        this.onZoomSliderWindowChanged = this.onZoomSliderWindowChanged.bind(this);
        this.onGridAreaRectChanged = this.onGridAreaRectChanged.bind(this);

        this.createSeries = this.createSeries.bind(this);

        this.onCursorMove = this.onCursorMove.bind(this);
        this.onResolvingAxisValue = this.onResolvingAxisValue.bind(this);

        this.countriesAll = SampleScatterStats.getCountries();
    }

    private onCursorMove(chart: IgcDataChartComponent, args: IgcChartCursorEventArgs) {
        console.log(this.container.offsetWidth);
        this.charts.map(c => {
            if (c !== chart) {
                c.actualSeries.filter((s) => s.isAnnotationLayer)
                    .map((s) => {
                        let a = s as IgcAnnotationLayerComponent;

                        a.moveCursorPoint(chart.crosshairPoint);
                    });
            }
        });
    }

    private onActualWindowRectChanged(chart: IgcDataChartComponent, args: IgcRectChangedEventArgs) {
        if (!this.isSynchronizingZoom) {
            this.syncZooms(chart);
        }
    }

    private onZoomSliderWindowChanged(slider: IgcZoomSliderComponent, args: IgcRectChangedEventArgs) {
        if (!this.isSynchronizingZoom) {
            this.syncZooms(slider);
        }
    }

    private syncZooms(sender: any) {
        window.setTimeout(() => {
            try {
                this.isSynchronizingZoom = true;

                const zoomWindow = this.zoomSlider.windowRect;
                const chartWindow = sender === this.zoomSlider ? this.mainChart.actualWindowRect : (sender as IgcDataChartComponent).actualWindowRect;

                if (sender === this.zoomSlider) {
                    this.charts.map((chart) => {
                        this.updateChartZoom(chart, {
                            top: chartWindow.top,
                            left: zoomWindow.left,
                            width: zoomWindow.width,
                            height: chartWindow.height });
                    });
                } else {
                    this.zoomSlider.windowRect = {
                        top: zoomWindow.top,
                        left: chartWindow.left,
                        width: chartWindow.width,
                        height: zoomWindow.height };
                    this.charts.map((chart) => {
                        this.updateChartZoom(chart, {
                            top: zoomWindow.top,
                            left: chartWindow.left,
                            width: chartWindow.width,
                            height: zoomWindow.height });
                    });
                }
            } finally {
                this.isSynchronizingZoom = false;
            }
        }, 0);
    }

    private onResolvingAxisValue(slider: IgcZoomSliderComponent, args: IgcZoomSliderResolvingAxisValueEventArgs) {
        const xAxis = this.zoomChart.actualAxes.filter(a => a.isNumeric)[0] as IgcNumericXAxisComponent;
        if (xAxis) {
            const range = (xAxis.actualMaximumValue - xAxis.actualMinimumValue)
            const value = xAxis.actualMinimumValue + (args.position * range);
            const str = SampleScatterStats.abbreviate(value)
            // console.log('p=' + args.position + ' r=' + range + ' v=' + value + ' str=' + str);
            args.value = null;
        }
        // const index = Math.round(args.position * (this.countriesAll.length - 1));
        // const item = this.countriesAll[index];
        // if (item) {
        //     args.value = SampleScatterStats.abbreviate(item.population);
        // }
    }

    private onGridAreaRectChanged(chart: IgcDataChartComponent, args: IgcRectChangedEventArgs) {
        let newRect = args.newRect;

        if (!this.container) {
            return;
        }

        if (newRect.left !== this.lastRect.left ||
            newRect.top !== this.lastRect.top ||
            newRect.width !== this.lastRect.width ||
            newRect.height !== this.lastRect.height) {
            let rightMargin = (isNaN(this.mainChart.rightMargin) ? this.mainChart.autoMarginWidth : this.mainChart.rightMargin);
            let width = newRect.left + newRect.width + rightMargin;

            this.lastRect = newRect;
            let right = newRect.left + newRect.width;
            let insetLeft = newRect.left;
            let insetRight = width - right;
            this.zoomSlider.startInset = insetLeft - this.zoomSlider.trackStartInset;
            this.zoomSlider.endInset = insetRight - this.zoomSlider.trackEndInset;

            if (this.zoomSlider.endInset < 0) {
                let inset = this.zoomSlider.endInset;
                this.zoomSlider.endInset = 0;
                this.charts.map(c => c.rightMargin += (inset * -1.0));
            }
            if (this.zoomSlider.startInset < 0) {
                let inset = this.zoomSlider.startInset;
                this.zoomSlider.startInset = 0;
                this.charts.map(c => c.leftMargin += (inset * -1.0));
            }

            this.zoomChart.leftMargin = insetLeft;
            this.zoomChart.rightMargin = insetRight;
            this.zoomChart.bottomMargin = this.zoomSlider.barExtent;
        }
    }

    private updateChartZoom(chart: IgcDataChartComponent, zoom: IgRect) {
        const data = this.countriesAll;

        const yAxis = chart.actualAxes.filter(a => a.isNumeric)[0] as IgcNumericYAxisComponent;
        let indexStart = Math.floor((data.length - 1) * zoom.left);
        let indexEnd = Math.ceil((data.length - 1) * (zoom.left + zoom.width));
        // console.log('updateChartZoom');
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        if (indexStart < 0) {
            indexStart = 0;
        }

        indexEnd = Math.min(indexEnd, data.length - 1);
        for (let i = indexStart; i <= indexEnd; i++) {
            min = Math.min(min, data[i].GdpTotal);
            max = Math.max(max, data[i].GdpTotal);
        }

        let yMin = (min - yAxis.actualMinimumValue) / (yAxis.actualMaximumValue - yAxis.actualMinimumValue);
        let yMax = (max - yAxis.actualMinimumValue) / (yAxis.actualMaximumValue - yAxis.actualMinimumValue);

        let newZoom = {
            left: zoom.left,
            width: zoom.width,
            top: (1.0 - yMax),
            // top: 0.0,
            // height: 1.0
            height: (yMax - yMin)
        }
        chart.windowRect = newZoom;
    }

    private createSeries(chart: IgcDataChartComponent) {
        let sizeScale1 = new IgcSizeScaleComponent();
        sizeScale1.minimumValue = 15;
        sizeScale1.maximumValue = 40;
        let sizeScale2 = new IgcSizeScaleComponent();
        sizeScale2.minimumValue = 5;
        sizeScale2.maximumValue = 15;

        let xAxis: IgcNumericXAxisComponent;
        let yAxis: IgcNumericYAxisComponent;

        if (chart.id === 'mainChart') {
            xAxis = document.getElementById('mainXAxis') as IgcNumericXAxisComponent;
            yAxis = document.getElementById('mainYAxis') as IgcNumericYAxisComponent;
        }
        else {
            xAxis = document.getElementById('zoomXAxis') as IgcNumericXAxisComponent;
            yAxis = document.getElementById('zoomYAxis') as IgcNumericYAxisComponent;
        }

        let series1 = new IgcBubbleSeriesComponent();
        series1.name = 'series1' + chart.id;
        series1.title = 'High Income Country';
        series1.dataSource = SampleScatterStats.getCountriesWithHighIncome();
        series1.showDefaultTooltip = false;
        series1.xMemberPath = 'Population';
        series1.yMemberPath = 'GdpTotal';
        series1.radiusMemberPath = 'GdpPerCapita';
        series1.radiusScale = sizeScale1;
        series1.markerType = MarkerType.Circle;
        series1.xAxisName = xAxis.name;
        series1.yAxisName = yAxis.name;
        // series1.tooltipTemplate = this.seriesTooltip;

        const series2 = new IgcBubbleSeriesComponent();
        series2.name = 'series2' + chart.id;
        series2.title = 'Low Income Country';
        series2.dataSource = SampleScatterStats.getCountriesWithLowIncome();
        series2.showDefaultTooltip = false;
        series2.xMemberPath = 'Population';
        series2.yMemberPath = 'GdpTotal';
        series2.radiusMemberPath = 'GdpPerCapita';
        series2.radiusScale = sizeScale2;
        series2.markerType = MarkerType.Circle;
        series2.xAxisName = xAxis.name;
        series2.yAxisName = yAxis.name;
        // series2.tooltipTemplate = this.seriesTooltip;

        chart.series.add(series1);
        chart.series.add(series2);
    
        

        this.zoomSlider = document.getElementById('zoomSlider') as IgcZoomSliderComponent;
        this.mainChart = document.getElementById('mainChart') as IgcDataChartComponent;
        this.zoomChart = document.getElementById('zoomChart') as IgcDataChartComponent;

        this.createSeries(this.mainChart);
        this.charts.push(this.mainChart);
        this.createSeries(this.zoomChart);

        this.mainChart.actualWindowRectChanged = this.onActualWindowRectChanged;
        this.mainChart.gridAreaRectChanged = this.onGridAreaRectChanged;
        this.mainChart.seriesCursorMouseMove = this.onCursorMove;

        this.zoomSlider.windowRectChanged = this.onZoomSliderWindowChanged;
        this.zoomSlider.resolvingAxisValue = this.onResolvingAxisValue;
    }
}

let sample = new ZoomSliderOverview();