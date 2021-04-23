import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDomainChartComponent } from 'igniteui-webcomponents-charts';
import { IgcChartSeriesEventArgs } from 'igniteui-webcomponents-charts';
import { ToolTipType } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcCategoryChartModule);

export class CategoryChartTooltipTypes {

    private chart: IgcCategoryChartComponent;
    public data: any[] = [];

    constructor() {

        this.onToolTipTypeChanged = this.onToolTipTypeChanged.bind(this);
        this.initData();

        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.seriesAdded = this.onSeriesAdded;
        this.chart.dataSource = this.data;

        let toolTipSelect = document.getElementById('toolTipSelect');
        toolTipSelect!.addEventListener('change', this.onToolTipTypeChanged);
    }

    public onToolTipTypeChanged = (e: any) => {
        let value = e.target.value;

        switch (value) {
            case 'Default': {
                this.chart.toolTipType = ToolTipType.Default;
                break;
            }
            case 'Item': {
                this.chart.toolTipType = ToolTipType.Item;
                break;
            }
            case 'Category': {
                this.chart.toolTipType = ToolTipType.Category;
                break;
            }
            case 'None': {
                this.chart.toolTipType = ToolTipType.None;
                break;
            }
        }
    }

    public onSeriesAdded = (s: IgcDomainChartComponent, e: IgcChartSeriesEventArgs) => {
        if (e.series.isAnnotationLayer) {
            e.series.transitionDuration = 100;
        }
    }

    public initData() {
        const usaMedals: any = [
            { Year: '1996 Atlanta', UnitedStates: 148 },
            { Year: '2000 Sydney',  UnitedStates: 142 },
            { Year: '2004 Athens',  UnitedStates: 134 },
            { Year: '2008 Beijing', UnitedStates: 131 },
            { Year: '2012 London',  UnitedStates: 135 },
            { Year: '2016 Rio',     UnitedStates: 146 },
        ];
        const chinaMedals: any = [
            { Year: '1996 Atlanta', China: 110 },
            { Year: '2000 Sydney',  China: 115 },
            { Year: '2004 Athens',  China: 121 },
            { Year: '2008 Beijing', China: 129 },
            { Year: '2012 London',  China: 115 },
            { Year: '2016 Rio',     China: 112 },
        ];
        const russiaMedals: any = [
            { Year: '1996 Atlanta', Russia: 95 },
            { Year: '2000 Sydney',  Russia: 91 },
            { Year: '2004 Athens',  Russia: 86 },
            { Year: '2008 Beijing', Russia: 65 },
            { Year: '2012 London',  Russia: 77 },
            { Year: '2016 Rio',     Russia: 88 },
        ];
        this.data = [ usaMedals, chinaMedals, russiaMedals ];
    }
}

new CategoryChartTooltipTypes();
