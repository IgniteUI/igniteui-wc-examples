import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcPinningConfig, RowPinningPosition, IgcActionStripComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private actionStrip: IgcActionStripComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var actionStrip = this.actionStrip = document.getElementById('actionStrip') as IgcActionStripComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            hierarchicalGrid1.pinning = this.pinningConfig1;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

}

export function initialize() {
  return new Sample();
}