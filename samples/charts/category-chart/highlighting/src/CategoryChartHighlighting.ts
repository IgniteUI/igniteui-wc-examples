
import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);


export class CategoryChartHighlighting {






    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.onSeriesHighlightingChanged = this.onSeriesHighlightingChanged.bind(this);
        this.onItemHighlightingChanged = this.onItemHighlightingChanged.bind(this);
        this.onCategoryHighlightingChanged = this.onCategoryHighlightingChanged.bind(this);
        this.initData();



        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.data;

        let SeriesHighlighting1 = document.getElementById('SeriesHighlighting');
        SeriesHighlighting1!.addEventListener('change', this.onSeriesHighlightingChanged);

        let ItemHighlighting1 = document.getElementById('ItemHighlighting');
        ItemHighlighting1!.addEventListener('change', this.onItemHighlightingChanged);

        let CategoryHighlighting1 = document.getElementById('CategoryHighlighting');
        CategoryHighlighting1!.addEventListener('change', this.onCategoryHighlightingChanged);
    }

    public onSeriesHighlightingChanged = (e: any) => {
        let value = e.target.checked;
        this.chart.isSeriesHighlightingEnabled = value;
    }
    public onItemHighlightingChanged = (e: any) => {
        let value = e.target.checked;
        this.chart.isItemHighlightingEnabled = value;
    }
    public onCategoryHighlightingChanged = (e: any) => {
        let value = e.target.checked;
        this.chart.isCategoryHighlightingEnabled = value;
    }

    public initData() {
        const usaMedals: any = [
            { Year: '1996 Atlanta', UnitedStates: 148 },
            { Year: '2000 Sydney', UnitedStates: 142 },
            { Year: '2004 Athens', UnitedStates: 134 },
            { Year: '2008 Beijing', UnitedStates: 131 },
            { Year: '2012 London', UnitedStates: 135 },
            { Year: '2016 Rio', UnitedStates: 146 },
        ];
        const chinaMedals: any = [
            { Year: '1996 Atlanta', China: 110 },
            { Year: '2000 Sydney', China: 115 },
            { Year: '2004 Athens', China: 121 },
            { Year: '2008 Beijing', China: 129 },
            { Year: '2012 London', China: 115 },
            { Year: '2016 Rio', China: 112 },
        ];
        const russiaMedals: any = [
            { Year: '1996 Atlanta', Russia: 95 },
            { Year: '2000 Sydney', Russia: 91 },
            { Year: '2004 Athens', Russia: 86 },
            { Year: '2008 Beijing', Russia: 65 },
            { Year: '2012 London', Russia: 77 },
            { Year: '2016 Rio', Russia: 88 },
        ];
        this.data = [usaMedals, chinaMedals, russiaMedals];
    }
}

let sample = new CategoryChartHighlighting();