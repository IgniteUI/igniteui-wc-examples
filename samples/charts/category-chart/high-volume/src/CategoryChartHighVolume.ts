

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { CategoryChartSharedData } from './CategoryChartSharedData';

ModuleManager.register(IgcCategoryChartModule);


export class CategoryChartHighVolume {


    
    
        

    private chart: IgcCategoryChartComponent;
    public dataPoints: number = 500000;

    public dataInfo: string = CategoryChartSharedData.toShortString(this.dataPoints);
    public data: any[];
    private dataInfoLabel: HTMLLabelElement;

    constructor() {
        

        this.onDataPointsChanged = this.onDataPointsChanged.bind(this);
        this.onDataGenerateClick = this.onDataGenerateClick.bind(this);
    
        

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = CategoryChartSharedData.generateItems(0, this.dataPoints, true);

        let slider1 = document.getElementById('dataPointsSlider') as HTMLInputElement;
        slider1.addEventListener('change', this.onDataPointsChanged);

        let DataGenerate1 = document.getElementById('DataGenerate') as HTMLButtonElement;
        DataGenerate1.addEventListener('click', this.onDataGenerateClick);
    }

    public onDataPointsChanged = (e: any) => {
        this.dataPoints = e.target.value;
        const info = CategoryChartSharedData.toShortString(this.dataPoints);
        this.dataPoints = this.dataPoints;
        this.dataInfo = info;

        this.dataInfoLabel = document.getElementById('dataInfoLabel') as HTMLLabelElement;
        this.dataInfoLabel.textContent = this.dataPoints.toString();
    }

    public onDataGenerateClick = (e: any) => {
        if (this.dataPoints === undefined) {
            this.dataPoints = 10000;
        }
        this.generateData();
    }

    public generateData() {
        this.chart.dataSource = CategoryChartSharedData.generateItems(0, this.dataPoints, true);

    }
}

let sample = new CategoryChartHighVolume();