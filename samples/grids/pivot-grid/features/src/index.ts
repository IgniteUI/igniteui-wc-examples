import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration, IgcPivotDateDimension, IgcPivotDimension, IgcPivotDateDimensionOptions, SortingDirection, IgcPivotValue, IgcPivotAggregator } from 'igniteui-webcomponents-grids/grids';
import { PivotDataFlatItem, PivotDataFlat } from './PivotDataFlat';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcPivotGridComponent
    private _pivotConfiguration1: IgcPivotConfiguration | null = null;
    public get pivotConfiguration1(): IgcPivotConfiguration {
        if (this._pivotConfiguration1 == null)
        {
            var pivotConfiguration1: IgcPivotConfiguration = {} as IgcPivotConfiguration;

            var pivotDateDimension1 = new IgcPivotDateDimension();
            pivotDateDimension1.memberName = "Date";
            pivotDateDimension1.enabled = true;
            var pivotDimension1: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension1.memberName = "Date";
            pivotDimension1.enabled = true;

            pivotDateDimension1.baseDimension = pivotDimension1;
            var pivotDateDimensionOptions1: IgcPivotDateDimensionOptions = {} as IgcPivotDateDimensionOptions;
            pivotDateDimensionOptions1.years = true;
            pivotDateDimensionOptions1.months = false;
            pivotDateDimensionOptions1.quarters = true;
            pivotDateDimensionOptions1.fullDate = false;

            pivotDateDimension1.options = pivotDateDimensionOptions1;

            pivotConfiguration1.columns = []
            pivotConfiguration1.columns.push(pivotDateDimension1);
            var pivotDimension2: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension2.memberName = "ProductName";
            pivotDimension2.sortDirection = SortingDirection.Asc;
            pivotDimension2.enabled = true;

            pivotConfiguration1.rows = []
            pivotConfiguration1.rows.push(pivotDimension2);
            var pivotDimension3: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension3.memberName = "SellerCity";
            pivotDimension3.enabled = true;

            pivotConfiguration1.rows.push(pivotDimension3);
            var pivotDimension4: IgcPivotDimension = {} as IgcPivotDimension;
            pivotDimension4.memberName = "SellerName";
            pivotDimension4.enabled = true;

            pivotConfiguration1.filters = []
            pivotConfiguration1.filters.push(pivotDimension4);
            var pivotValue1: IgcPivotValue = {} as IgcPivotValue;
            pivotValue1.member = "AmountofSale";
            pivotValue1.displayName = "Amount of Sale";
            pivotValue1.dataType = "currency";
            pivotValue1.enabled = true;
            var pivotAggregator1: IgcPivotAggregator = {} as IgcPivotAggregator;
            pivotAggregator1.key = "SUM";
            pivotAggregator1.label = "Sum of Sale";
            pivotAggregator1.aggregator = this.pivotDataFlatAggregateSumSale;

            pivotValue1.aggregate = pivotAggregator1;
            var pivotAggregator2: IgcPivotAggregator = {} as IgcPivotAggregator;
            pivotAggregator2.key = "SUM";
            pivotAggregator2.label = "Sum of Sale";
            pivotAggregator2.aggregator = this.pivotDataFlatAggregateSumSale;

            pivotValue1.aggregateList = []
            pivotValue1.aggregateList.push(pivotAggregator2);
            var pivotAggregator3: IgcPivotAggregator = {} as IgcPivotAggregator;
            pivotAggregator3.key = "MIN";
            pivotAggregator3.label = "Minimum of Sale";
            pivotAggregator3.aggregator = this.pivotDataFlatAggregateMinSale;

            pivotValue1.aggregateList.push(pivotAggregator3);
            var pivotAggregator4: IgcPivotAggregator = {} as IgcPivotAggregator;
            pivotAggregator4.key = "MAX";
            pivotAggregator4.label = "Maximum of Sale";
            pivotAggregator4.aggregator = this.pivotDataFlatAggregateMaxSale;

            pivotValue1.aggregateList.push(pivotAggregator4);

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
            grid.data = this.pivotDataFlat
            grid.pivotConfiguration = this.pivotConfiguration1
        }
        this._bind();

    }

    private _pivotDataFlat: PivotDataFlat = null;
    public get pivotDataFlat(): PivotDataFlat {
        if (this._pivotDataFlat == null)
        {
            this._pivotDataFlat = new PivotDataFlat();
        }
        return this._pivotDataFlat;
    }


    public pivotDataFlatAggregateSumSale(members: any[], data: any[]): any {
        return data.reduce((accumulator, value) => accumulator + value.ProductUnitPrice * value.NumberOfUnits, 0);
    }

    public pivotDataFlatAggregateMinSale(members: any[], data: any[]): any {
        let min = 0;
        if (data.length === 1) {
            min = data[0].ProductUnitPrice * data[0].NumberOfUnits;
        } else if (data.length > 1) {
            const mappedData = data.map(x => x.ProductUnitPrice * x.NumberOfUnits);
            min = mappedData.reduce((a, b) => Math.min(a, b));
        }
        return min;
    }

    public pivotDataFlatAggregateMaxSale(members: any[], data: any[]): any {
        let max = 0;
        if (data.length === 1) {
            max = data[0].ProductUnitPrice * data[0].NumberOfUnits;
        } else if (data.length > 1) {
            const mappedData = data.map(x => x.ProductUnitPrice * x.NumberOfUnits);
            max = mappedData.reduce((a, b) => Math.max(a, b));
        }
        return max;
    }

}

new Sample();
