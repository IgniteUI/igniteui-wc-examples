import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration, IgcPivotDimension, IgcPivotValue, IgcPivotAggregator } from 'igniteui-webcomponents-grids/grids';
import { PivotSalesDataItem, PivotSalesData } from './PivotSalesData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private grid: IgcPivotGridComponent
    private _pivotConfiguration1: IgcPivotConfiguration | null = null;
    public get pivotConfiguration1(): IgcPivotConfiguration {
        if (this._pivotConfiguration1 == null)
        {
            var pivotConfiguration1: IgcPivotConfiguration = {} as IgcPivotConfiguration;
            
            var pivotDimension1: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension1.memberName = "Product";
            pivotDimension1.enabled = true;
            
            pivotConfiguration1.rows = []
            pivotConfiguration1.rows.push(pivotDimension1);
            var pivotDimension2: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension2.memberName = "Country";
            pivotDimension2.enabled = true;
            
            pivotConfiguration1.columns = []
            pivotConfiguration1.columns.push(pivotDimension2);
            var pivotValue1: IgcPivotValue = {} as IgcPivotValue;
            pivotValue1.member = "Sales";
            pivotValue1.enabled = true;
            var pivotAggregator1: IgcPivotAggregator = {} as IgcPivotAggregator;
            pivotAggregator1.key = "MAX";
            pivotAggregator1.aggregator = this.pivotSalesDataAggregateMaxSales;
            
            pivotValue1.aggregate = pivotAggregator1;
            
            pivotConfiguration1.values = []
            pivotConfiguration1.values.push(pivotValue1);
            
            
            this._pivotConfiguration1 = pivotConfiguration1;
        }
        return this._pivotConfiguration1;
    }
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcPivotGridComponent;

        this._bind = () => {
            grid.pivotConfiguration = this.pivotConfiguration1
            grid.data = this.pivotSalesData
        }
        this._bind();

    }

    private _pivotSalesData: PivotSalesData = null;
    public get pivotSalesData(): PivotSalesData {
        if (this._pivotSalesData == null)
        {
            this._pivotSalesData = new PivotSalesData();
        }
        return this._pivotSalesData;
    }
    


    
    public pivotSalesDataAggregateMaxSales(members: any[], data: any[]): any[] {
        if (!data) {
            return [];
        }
        return data.map(x => x.Sales).reduce((a, b) => Math.max(a, b));
    }
        
}

new Sample();
