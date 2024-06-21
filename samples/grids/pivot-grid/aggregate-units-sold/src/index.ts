import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration } from 'igniteui-webcomponents-grids/grids';
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
            pivotConfiguration1.columns = [Infragistics.Controls.Description.CodeGenerationItemBuilder];
            pivotConfiguration1.rows = [Infragistics.Controls.Description.CodeGenerationItemBuilder];
            pivotConfiguration1.values = [Infragistics.Controls.Description.CodeGenerationItemBuilder];

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

}

new Sample();
