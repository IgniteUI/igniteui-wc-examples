import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcPinningConfig, ColumnPinningPosition } from 'igniteui-webcomponents-grids/grids';
import HierarchicalCustomersData from './HierarchicalCustomersData.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcHierarchicalGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.columns = ColumnPinningPosition.End;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;

        this._bind = () => {
            grid.data = this.hierarchicalCustomersData;
            grid.pinning = this.pinningConfig1;
        }
        this._bind();

    }

    private _hierarchicalCustomersData: any[] = HierarchicalCustomersData;
    public get hierarchicalCustomersData(): any[] {
        return this._hierarchicalCustomersData;
    }

}

export function initialize() {
  return new Sample();
}