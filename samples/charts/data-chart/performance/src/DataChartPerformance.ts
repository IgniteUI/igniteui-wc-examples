

import { IgcDataChartCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryCoreModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartCategoryModule } from 'igniteui-webcomponents-charts';
import { IgcDataChartInteractivityModule } from 'igniteui-webcomponents-charts';
import { IgcLineSeriesModule } from 'igniteui-webcomponents-charts';

import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataChartSharedData } from './DataChartSharedData';

ModuleManager.register(
    IgcDataChartCoreModule,
    IgcDataChartCategoryCoreModule,
    IgcDataChartCategoryModule,
    IgcDataChartInteractivityModule,
    IgcLineSeriesModule
);


export class DataChartPerformance {


    
    
        
    public dataIndex: number = 0;
    public dataPoints: number = 100000;
    public data: any[];

    public refreshMilliseconds: number = 10;
    public interval: number = -1;
    public scalingRatio = window.devicePixelRatio;

    private chart: IgcDataChartComponent;
    public fps: HTMLSpanElement;
    public dataInfo: HTMLLabelElement;
    public frameTime: Date;
    public frameCount: number = 0;

    constructor() {
        

        this.data = DataChartSharedData.getItems(100, this.dataPoints, false);
        this.dataIndex = this.data.length;
    
        

        this.fps = document.getElementById('fps') as HTMLSpanElement;

        this.dataInfo = document.getElementById('dataInfo') as HTMLLabelElement;
        this.dataInfo.textContent = DataChartSharedData.toShortString(this.dataPoints);

        const dataPointsSlider = document.getElementById('dataPointsSlider') as HTMLInputElement;
        dataPointsSlider.value = this.dataPoints.toString();
        dataPointsSlider.addEventListener('change', this.onDataPointsChanged);

        const genData = document.getElementById('genData') as HTMLButtonElement;
        genData.addEventListener('click', this.onDataGenerateClick);

        const scaleRatio = document.getElementById('scaleRatio') as HTMLInputElement;
        scaleRatio.addEventListener('change', this.onScalingRatioChanged);

        this.chart = document.getElementById('chart') as IgcDataChartComponent;
        this.chart.dataSource = this.data;
        this.onChartInit();
    }

    public componentWillUnmount() {
        if (this.interval >= 0) {
                window.clearInterval(this.interval);
                this.interval = -1;
            }
    }

    public onChartInit(): void {
        this.frameTime = new Date();
        this.setupInterval();
    }

    public onScalingRatioChanged = (e: any) => {
        if (e.target.checked) {
            this.scalingRatio = 1.0;
        } else {
            this.scalingRatio = NaN;
        }
    }

    public onDataGenerateClick = (e: any) => {
        this.data = DataChartSharedData.getItems(100, this.dataPoints, false);
        this.dataIndex = this.data.length;

        this.chart.dataSource = this.data;
    }

    public onDataPointsChanged = (e: any) => {
        let num: number = parseInt(e.target.value, 10);

        if (isNaN(num)) {
            num = 10000;
        }
        if (num < 10000) {
            num = 10000;
        }
        if (num > 1000000) {
            num = 1000000;
        }
        const info = DataChartSharedData.toShortString(num);
        this.dataPoints = num;
        this.dataInfo.innerText = info;
    }

    public ngOnDestroy(): void {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    public onRefreshFrequencyChanged = (e: any) => {
        let num: number = parseInt(e.target.value, 10);

        if (isNaN(num)) {
            num = 10;
        }
        if (num < 10) {
            num = 10;
        }
        if (num > 500) {
            num = 500;
        }
        this.refreshMilliseconds = num;
        this.setupInterval();
    }

    public setupInterval(): void {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }

        this.interval = window.setInterval(() => this.tick(),
        this.refreshMilliseconds);
    }

    public tick(): void {
        this.dataIndex++;
        const oldItem = this.data[0];
        const newItem = DataChartSharedData.getNewItem(this.data, this.dataIndex);

        // updating data source and notifying category chart
        this.data.push(newItem);
        this.chart.notifyInsertItem(this.data, this.data.length - 1, newItem);
        this.data.shift();
        this.chart.notifyRemoveItem(this.data, 0, oldItem);

        this.frameCount++;
        const currTime = new Date();
        const elapsed = (currTime.getTime() - this.frameTime.getTime());
        if (elapsed > 5000) {
            const fps = this.frameCount / (elapsed / 1000.0);
            this.frameTime = currTime;
            this.frameCount = 0;
            this.fps.textContent = ' FPS: ' + Math.round(fps).toString();
        }
    }
}

let sample = new DataChartPerformance();