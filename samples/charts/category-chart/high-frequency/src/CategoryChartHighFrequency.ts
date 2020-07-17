

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { CategoryChartSharedData } from './CategoryChartSharedData';

ModuleManager.register(IgcCategoryChartModule);


export class CategoryChartHighFrequency {


    
    
        

    private chart: IgcCategoryChartComponent;
    public dataIndex: number = 0;
    public dataPoints: number = 100000;
    public data: any[];

    public refreshMilliseconds: number = 10;
    public interval: number = -1;
    public fps: HTMLSpanElement;
    public frameTime: Date;
    public frameCount: number = 0;
    public scalingRatio: number = NaN;
    private dataInfoLabel: HTMLLabelElement;
    private refreshInfoLabel: HTMLLabelElement;

    constructor() {
        

        this.onFpsRef = this.onFpsRef.bind(this);
        this.onScalingRatioChanged = this.onScalingRatioChanged.bind(this);
        this.onRefreshFrequencyChanged = this.onRefreshFrequencyChanged.bind(this);
        this.onDataGenerateClick = this.onDataGenerateClick.bind(this);
        this.onDataPointsChanged = this.onDataPointsChanged.bind(this);
        this.tick = this.tick.bind(this);
    
        

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;

        this.data = CategoryChartSharedData.generateItems(100, this.dataPoints, false);

        this.chart.dataSource = this.data;
        this.onChartInit();

        let slider1 = document.getElementById('slider') as HTMLInputElement;
        slider1.value = this.dataPoints.toString();
        slider1.addEventListener('change', this.onDataPointsChanged);

        this.refreshInfoLabel = document.getElementById('refreshInfoLabel') as HTMLLabelElement;
        this.refreshInfoLabel.textContent = (this.refreshMilliseconds / 1000).toFixed(3) + 's';

        let refreshSlider = document.getElementById('refreshSlider') as HTMLInputElement;
        refreshSlider.value = this.refreshMilliseconds.toString();
        refreshSlider.addEventListener('change', this.onRefreshFrequencyChanged);

        this.dataInfoLabel = document.getElementById('dataInfoLabel') as HTMLLabelElement;
        this.dataInfoLabel.textContent = CategoryChartSharedData.toShortString(this.dataPoints);

        let dataGenerate1 = document.getElementById('dataGenerate') as HTMLInputElement;
        dataGenerate1.addEventListener('click', this.onDataGenerateClick);

        let scalingRatio1 = document.getElementById('scalingRatio') as HTMLInputElement;
        scalingRatio1.addEventListener('change', this.onScalingRatioChanged);

        this.fps = document.getElementById('fps') as HTMLSpanElement;
    }

    public componentWillUnmount() {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    public onFpsRef(span: HTMLSpanElement) {
        this.fps = span;
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

    public onDataGenerateClick() {

        this.data = CategoryChartSharedData.generateItems(100, this.dataPoints, false);
        this.dataIndex = this.data.length;

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
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
        const info = CategoryChartSharedData.toShortString(num);
        this.dataInfoLabel.textContent = info;
        this.dataPoints = num;
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
        this.refreshInfoLabel.textContent = (this.refreshMilliseconds / 1000).toFixed(3) + 's';
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
        const newItem = CategoryChartSharedData.getNewItem(this.data, this.dataIndex);

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

let sample = new CategoryChartHighFrequency();