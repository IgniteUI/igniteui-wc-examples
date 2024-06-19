import 'igniteui-webcomponents-grids/grids/combined';
import { IgcPivotGridComponent, IgcPivotConfiguration } from 'igniteui-webcomponents-grids/grids';
import { PivotDataFlatItem, PivotDataFlat } from './PivotDataFlat';

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
            pivotConfiguration1.rows = [Infragistics.Controls.Description.CodeGenerationItemBuilder, Infragistics.Controls.Description.CodeGenerationItemBuilder];
            pivotConfiguration1.filters = [Infragistics.Controls.Description.CodeGenerationItemBuilder];
            pivotConfiguration1.values = [Infragistics.Controls.Description.CodeGenerationItemBuilder];

            this._pivotConfiguration1 = pivotConfiguration1;
        }
        return this._pivotConfiguration1;
    }
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcPivotGridComponent;

        this._bind = () => {
            grid.data = this.pivotDataFlat;
            grid.pivotConfiguration = this.pivotConfiguration1;
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

}

new Sample();
