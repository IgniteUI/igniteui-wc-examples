

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ToolTipType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);


export class FinancialChartTooltipTypes {






    private chart: IgcFinancialChartComponent;
    public toolTipType: ToolTipType = ToolTipType.Default;

    constructor() {




        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.toolTipType = this.toolTipType;

        let toolTipSelect = document.getElementById('toolTipSelect');
        toolTipSelect!.addEventListener('change', this.onToolTipTypeChanged);
    }

    public onToolTipTypeChanged = (e: any) => {
        const type = e.target.value;
        switch (type) {
            case 'Default':
                this.toolTipType = ToolTipType.Default;
            break;
            case 'Item':
                this.toolTipType = ToolTipType.Item;
            break;
            case 'Category':
                this.toolTipType = ToolTipType.Category;
            break;
            case 'None':
                this.toolTipType = ToolTipType.None;
            break;
        }
        this.chart.toolTipType = this.toolTipType;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, 'Tesla (TSLA)'),
            StocksUtility.GetStocks(6, 10, 'Microsoft (MSFT)')
        ];
        return data;
    }
}

let sample = new FinancialChartTooltipTypes();