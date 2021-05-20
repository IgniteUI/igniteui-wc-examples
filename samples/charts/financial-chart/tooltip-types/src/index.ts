import { FinancialChartYAxisMode, IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { ToolTipType } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { StocksHistory } from './StocksHistory';

ModuleManager.register(IgcFinancialChartModule);

export class FinancialChartTooltipTypes {

    private chart: IgcFinancialChartComponent;
    public toolTipType: ToolTipType = ToolTipType.Item;

    constructor() {

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.yAxisMode = FinancialChartYAxisMode.PercentChange;
        this.chart.toolTipType = this.toolTipType;
        
        let toolTipSelect = <HTMLSelectElement>document.getElementById('toolTipSelect');
        toolTipSelect!.addEventListener('change', this.onToolTipTypeChanged);
        toolTipSelect!.value = "Item";

        StocksHistory.getMultipleStocks().then((stocks: any[]) => {
            this.chart.dataSource = stocks;
        });
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
}

new FinancialChartTooltipTypes();
