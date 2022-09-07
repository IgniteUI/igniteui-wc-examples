import { SeriesHighlightingBehavior, LegendHighlightingMode, SeriesHighlightingMode, IgcLegendModule, IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcLegendComponent, IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule, IgcLegendModule);

export class CategoryChartHighlighting {

    private chart: IgcCategoryChartComponent;
    private legend: IgcLegendComponent
    public data: any[] = [];

    constructor() {

        this.onHighlightingTargetChanged = this.onHighlightingTargetChanged.bind(this);
        this.onHighlightingModeChanged = this.onHighlightingModeChanged.bind(this);
        this.onBehaviorModeChanged = this.onBehaviorModeChanged.bind(this);
        this.onLegendHighlightingModeChanged = this.onLegendHighlightingModeChanged.bind(this);

        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;
        this.legend = document.getElementById('Legend') as IgcLegendComponent;
        this.chart.legend = this.legend
        this.chart.isItemHighlightingEnabled = false;
        this.chart.isSeriesHighlightingEnabled = true;
        this.chart.isCategoryHighlightingEnabled = false;    
        this.chart.highlightingMode = SeriesHighlightingMode.Auto;
        this.chart.highlightingBehavior = SeriesHighlightingBehavior.Auto;
        this.chart.legendHighlightingMode = LegendHighlightingMode.Auto;

        const highlightingTarget1 = document.getElementById('highlightingTarget') as HTMLSelectElement;
        highlightingTarget1!.addEventListener('change', this.onHighlightingTargetChanged);

        const highlightingMode = document.getElementById("highlightingMode") as HTMLSelectElement;
        highlightingMode!.addEventListener("change", this.onHighlightingModeChanged);

        const behaviorMode = document.getElementById("behaviorMode") as HTMLSelectElement;
        behaviorMode!.addEventListener("change", this.onBehaviorModeChanged);

        const legendHighlightingMode = document.getElementById("legendHighlightingMode") as HTMLSelectElement;
        legendHighlightingMode!.addEventListener("change", this.onLegendHighlightingModeChanged);

    }

    public onHighlightingTargetChanged = (e: any) => {
        let value = e.target.value as String;

        if(value == "Series"){
            this.chart.isItemHighlightingEnabled = false;
            this.chart.isSeriesHighlightingEnabled = true;
            this.chart.isCategoryHighlightingEnabled = false;            
        }
         else if(value == "Item") {
            this.chart.isItemHighlightingEnabled = true;
            this.chart.isSeriesHighlightingEnabled = false;
            this.chart.isCategoryHighlightingEnabled = false;                    
        }
         else if(value == "Category") {
            this.chart.isItemHighlightingEnabled = false;
            this.chart.isSeriesHighlightingEnabled = false;
            this.chart.isCategoryHighlightingEnabled = true;                    
        }
         else if(value=="None") {
            this.chart.isItemHighlightingEnabled = false;
            this.chart.isSeriesHighlightingEnabled = false;
            this.chart.isCategoryHighlightingEnabled = false;        
        }
      
    } 
    
    public onHighlightingModeChanged(e: any) {
        this.chart.highlightingMode = e.target.value as SeriesHighlightingMode;
    }
    public onBehaviorModeChanged(e: any) {
        this.chart.highlightingBehavior = e.target.value as SeriesHighlightingBehavior;
    }
    public onLegendHighlightingModeChanged(e: any) {
        this.chart.legendHighlightingMode = e.target.value as LegendHighlightingMode;
    }

    public initData() {
        const CityTemperatureData: any = [
            { Month: "JAN", NewYork: 10.6, LosAngeles: 28.3},
            { Month: "FEB", NewYork: 7.8,  LosAngeles: 31.1},
            { Month: "MAR", NewYork: 12.2, LosAngeles: 27.8},
            { Month: "APR", NewYork: 11.7, LosAngeles: 33.9},
            { Month: "MAY", NewYork: 19.4, LosAngeles: 35.0},
            { Month: "JUN", NewYork: 23.3, LosAngeles: 36.7},
            { Month: "JUL", NewYork: 27.2, LosAngeles: 33.3},
            { Month: "AUG", NewYork: 25.6, LosAngeles: 36.7},
            { Month: "SEP", NewYork: 22.8, LosAngeles: 43.9},
            { Month: "OCT", NewYork: 17.8, LosAngeles: 38.3 },
            { Month: "NOV", NewYork: 17.8, LosAngeles: 32.8},
            { Month: "DEC", NewYork: 8.3, LosAngeles: 28.9},
        ];
        this.data = [ CityTemperatureData];
    }

}

new CategoryChartHighlighting();
