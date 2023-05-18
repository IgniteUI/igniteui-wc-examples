import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartHighFrequency {

    private chart: IgcFinancialChartComponent;
    private dataInfoLabel: HTMLLabelElement;
    private refreshIntervalLabel: HTMLLabelElement;
    private timerButton: HTMLButtonElement;
    private shouldTick : boolean = true;
    public dataIndex: number = 0;
    public dataPoints: number = 10000;
    public dataInfo: string = StocksUtility.toShortString(this.dataPoints);
    public data: any[] = [];

    public refreshMilliseconds: number = 10;
    public interval: number = -1;

    public fps: HTMLLabelElement;
    public frameTime: Date;
    public frameCount: number = 0;
    public scalingRatio: number = NaN;

    constructor() {

        this.data = StocksUtility.getStocksItems(this.dataPoints);

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.data;
        this.onChartInit();

        this.dataInfoLabel = document.getElementById('dataInfoLabel') as HTMLLabelElement;
        this.dataInfoLabel.textContent = this.dataInfo;

        this.refreshIntervalLabel = document.getElementById('refreshInfoLabel') as HTMLLabelElement;
        this.refreshIntervalLabel.textContent = (this.refreshMilliseconds / 1000).toString() + 's';

        const dataPointsSlider = document.getElementById('dataPointsSlider') as HTMLInputElement;
        dataPointsSlider.value = this.dataPoints.toString();
        dataPointsSlider!.addEventListener('change', this.onDataPointsChanged);

        const refreshSlider = document.getElementById('refreshSlider') as HTMLInputElement;
        refreshSlider.value = this.refreshMilliseconds.toString();
        refreshSlider!.addEventListener('change', this.onRefreshFrequencyChanged);

        const genDataBtn = document.getElementById('genDataBtn') as HTMLButtonElement;
        genDataBtn!.addEventListener('click', this.onDataGenerateClick);

        this.timerButton = document.getElementById('timerButton') as HTMLButtonElement;
        this.timerButton!.addEventListener('click', this.onStopStartClick);

        const scalingRatio = document.getElementById('scalingRatio') as HTMLButtonElement;
        scalingRatio!.addEventListener('change', this.onScalingRatioChanged);

        this.fps = document.getElementById('fpsSpan') as HTMLLabelElement;
    }

    public componentWillUnmount() {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    public onScalingRatioChanged = (e: any) => {
        if (e.target.checked) {
            this.scalingRatio = 1.0;
        } else {
            this.scalingRatio = NaN;
        }
    }

    public onDataGenerateClick = (e: any) => {
        this.data = StocksUtility.getStocksItems(this.dataPoints);
        this.dataIndex = this.data.length;

        this.chart.dataSource = this.data;
    }

    public onStopStartClick = (e: any) => {

        this.shouldTick = !this.shouldTick;

        if(this.shouldTick){
            this.timerButton.textContent = "Stop Data";
        }
        else{
            this.timerButton.textContent = "Live Data";
        }
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
        const info = StocksUtility.toShortString(num);
        this.dataPoints = num;
        this.dataInfo = info;

        this.dataInfoLabel.textContent = this.dataInfo;
    }

    public ngOnDestroy(): void {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    public onChartInit(): void {
        this.frameTime = new Date();
        this.setupInterval();
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

        this.refreshIntervalLabel.textContent = (this.refreshMilliseconds / 1000).toString() + 's';
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
        if (this.shouldTick) {
            this.dataIndex++;
            const oldItem: any = this.data[0];
            const newItem: any = StocksUtility.getNewItem(this.data);

            // updating data source and notifying category chart
            this.data.push(newItem);
            this.chart.notifyInsertItem(this.data, this.data.length - 1, newItem);
            this.data.shift();
            this.chart.notifyRemoveItem(this.data, 0, oldItem);

            this.frameCount++;
            const currTime: Date = new Date();
            const elapsed: number = (currTime.getTime() - this.frameTime.getTime());
            if (elapsed > 5000) {
                const fps: number = this.frameCount / (elapsed / 1000.0);
                this.frameTime = currTime;
                this.frameCount = 0;
                this.fps.textContent = ' FPS: ' + Math.round(fps).toString();
            }
        }
    }
}

new FinancialChartHighFrequency();
