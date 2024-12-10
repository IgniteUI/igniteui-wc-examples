import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration, IgcPivotDimension, IgcPivotValue, IgcPivotAggregator } from 'igniteui-webcomponents-grids/grids';
import { PivotSalesDataItem, PivotSalesData } from './PivotSalesData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";



export class Sample {

    private grid: IgcPivotGridComponent
    private _pivotConfiguration1: IgcPivotConfiguration | null = null;
    public get pivotConfiguration1(): IgcPivotConfiguration {
        if (this._pivotConfiguration1 == null)
        {
            var pivotConfiguration1: IgcPivotConfiguration = {} as IgcPivotConfiguration;

            var pivotDimension1: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension1.memberName = "Country";
            pivotDimension1.enabled = true;

            pivotConfiguration1.columns = [pivotDimension1];
            var pivotDimension2: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension2.memberName = "Product";
            pivotDimension2.enabled = true;

            pivotConfiguration1.rows = [pivotDimension2];
            var pivotValue1: IgcPivotValue = {} as IgcPivotValue;
            pivotValue1.member = "Sales";
            pivotValue1.enabled = true;
            var pivotAggregator1: IgcPivotAggregator = {} as IgcPivotAggregator;
            pivotAggregator1.key = "MAX";
            pivotAggregator1.label = "SalesValue";
            pivotAggregator1.aggregator = this.pivotSalesDataAggregateUnitsSold;

            pivotValue1.aggregate = pivotAggregator1;

            pivotConfiguration1.values = [pivotValue1];

            this._pivotConfiguration1 = pivotConfiguration1;
        }
        return this._pivotConfiguration1;
    }

    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcPivotGridComponent;

        this._bind = () => {
            grid.data = this.pivotSalesData;
            grid.pivotConfiguration = this.pivotConfiguration1;
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

    public pivotSalesDataAggregateUnitsSold(members: any[], data: any[]): any {
        return data.reduce((accumulator, item) => accumulator + (item.UnitsSold * item.SalePrice), 0);
    }

}

new Sample();
