

import { IgcCategoryChartModule } from 'igniteui-webcomponents-charts';
import { IgcCategoryChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcCategoryChartModule);


export class CategoryChartAxisOptions {






    private chart: IgcCategoryChartComponent;

    constructor() {




        this.chart = document.getElementById('chart') as IgcCategoryChartComponent;
        this.chart.dataSource = this.getData();
    }

    public getData(): any[] {
        const usaMedals: any = [
            { Year: '1996', UnitedStates: 148 },
            { Year: '2000', UnitedStates: 142 },
            { Year: '2004', UnitedStates: 134 },
            { Year: '2008', UnitedStates: 131 },
            { Year: '2012', UnitedStates: 135 },
            { Year: '2016', UnitedStates: 146 },
        ];
        const chinaMedals: any = [
            { Year: '1996', China: 110 },
            { Year: '2000', China: 115 },
            { Year: '2004', China: 121 },
            { Year: '2008', China: 129 },
            { Year: '2012', China: 115 },
            { Year: '2016', China: 112 },
        ];
        const russiaMedals: any = [
            { Year: '1996', Russia: 95 },
            { Year: '2000', Russia: 91 },
            { Year: '2004', Russia: 86 },
            { Year: '2008', Russia: 65 },
            { Year: '2012', Russia: 77 },
            { Year: '2016', Russia: 88 },
        ];
        return [usaMedals, chinaMedals, russiaMedals];
    }
}

let sample = new CategoryChartAxisOptions();