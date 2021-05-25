import { IgcCategoryChartModule, IgcLegendComponent, IgcLegendModule, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);
ModuleManager.register(IgcLegendModule);

export class CategoryChartAxisRange {

    private chart: IgcCategoryChartComponent;
    private minLabel : HTMLLabelElement;
    private maxLabel : HTMLLabelElement;

    private data: any[] = [];

    constructor() {

        this.onMinSliderValueChanged = this.onMinSliderValueChanged.bind(this);
        this.onMaxSliderValueChanged = this.onMaxSliderValueChanged.bind(this);

        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        this.chart.legend = document.getElementById("legend") as IgcLegendComponent;

        const minSlider = document.getElementById("minValueSlider") as HTMLInputElement;
        minSlider.addEventListener("input", this.onMinSliderValueChanged);

        const maxSlider = document.getElementById("maxValueSlider") as HTMLInputElement;
        maxSlider.addEventListener("input", this.onMaxSliderValueChanged);

        this.minLabel = document.getElementById("minLabel") as HTMLLabelElement;
        this.maxLabel = document.getElementById("maxLabel") as HTMLLabelElement;
    }

    public initData() {
        this.data = [
            { Year: "2009", Europe: 31, China: 21, USA: 19 },
            { Year: "2010", Europe: 43, China: 26, USA: 24 },
            { Year: "2011", Europe: 66, China: 29, USA: 28 },
            { Year: "2012", Europe: 69, China: 32, USA: 26 },
            { Year: "2013", Europe: 58, China: 47, USA: 38 },
            { Year: "2014", Europe: 40, China: 46, USA: 31 },
            { Year: "2015", Europe: 78, China: 50, USA: 19 },
            { Year: "2016", Europe: 13, China: 90, USA: 52 },
            { Year: "2017", Europe: 78, China: 132, USA: 50 },
            { Year: "2018", Europe: 40, China: 134, USA: 34 },
            { Year: "2019", Europe: 80, China: 96, USA: 38 },
        ];
    }

    public onMinSliderValueChanged(e: any) {        
        const value = e.target.value;        
        this.chart.yAxisMinimumValue = value;
        this.minLabel.textContent = value;        
    }

    public onMaxSliderValueChanged(e: any) {
        const value = e.target.value;        
        this.chart.yAxisMaximumValue = value;
        this.maxLabel.textContent = value;  
    }
}

new CategoryChartAxisRange();
