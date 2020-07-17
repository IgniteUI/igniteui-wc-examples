

import { IgcFinancialChartModule } from 'igniteui-webcomponents-charts';
import { IgcFinancialChartComponent } from 'igniteui-webcomponents-charts';
import { TrendLineType } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { StocksUtility } from './StocksUtility';

ModuleManager.register(IgcFinancialChartModule);


export class FinancialChartTrendlines {


    
    
        

    private chart: IgcFinancialChartComponent;
    public trendLineType: TrendLineType = TrendLineType.QuinticFit;

    constructor() {
        
    
        

        this.chart = document.getElementById('chart') as IgcFinancialChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.trendLineType = this.trendLineType;

        let trendLineSelect = document.getElementById('trendLineSelect');
        trendLineSelect.addEventListener('change', this.onTrendlineChanged);
    }

    public onTrendlineChanged = (e: any) => {
        const type = e.target.value;
        switch (type) {
            case 'CubicFit':
                this.trendLineType = TrendLineType.CubicFit;
            break;
            case 'LinearFit':
                this.trendLineType = TrendLineType.LinearFit;
            break;
            case 'QuinticFit':
                this.trendLineType = TrendLineType.QuinticFit;
            break;
            case 'QuarticFit':
                this.trendLineType = TrendLineType.QuarticFit;
            break;
            case 'ExponentialFit':
                this.trendLineType = TrendLineType.ExponentialFit;
            break;
            case 'PowerLawFit':
                this.trendLineType = TrendLineType.PowerLawFit;
            break;
            case 'LogarithmicFit':
                this.trendLineType = TrendLineType.LogarithmicFit;
            break;
            case 'CumulativeAverage':
                this.trendLineType = TrendLineType.CumulativeAverage;
            break;
            case 'ExponentialAverage':
                this.trendLineType = TrendLineType.ExponentialAverage;
            break;
            case 'SimpleAverage':
                this.trendLineType = TrendLineType.SimpleAverage;
            break;
            case 'ModifiedAverage':
                this.trendLineType = TrendLineType.ModifiedAverage;
            break;
            case 'WeightedAverage':
                this.trendLineType = TrendLineType.WeightedAverage;
            break;
            case 'None':
                this.trendLineType = TrendLineType.None;
            break;
        }
        this.chart.trendLineType = this.trendLineType;
    }

    getData(): any[] {
        const data = [
            StocksUtility.GetStocks(6, 10, 'Amazon (AMZN)'),
            StocksUtility.GetStocks(6, 10, 'Microsoft (MSFT)')
        ];
        return data;
    }
}

let sample = new FinancialChartTrendlines();