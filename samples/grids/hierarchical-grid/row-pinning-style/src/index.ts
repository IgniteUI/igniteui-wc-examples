import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcPinningConfig, RowPinningPosition, ColumnPinningPosition, IgcActionStripComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcHierarchicalGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;
            pinningConfig1.columns = ColumnPinningPosition.End;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private actionStrip1: IgcActionStripComponent
    private rowIsland1: IgcRowIslandComponent
    private _pinningConfig2: IgcPinningConfig | null = null;
    public get pinningConfig2(): IgcPinningConfig {
        if (this._pinningConfig2 == null)
        {
            var pinningConfig2: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig2.rows = RowPinningPosition.Top;
            pinningConfig2.columns = ColumnPinningPosition.End;

            this._pinningConfig2 = pinningConfig2;
        }
        return this._pinningConfig2;
    }
    private actionStrip2: IgcActionStripComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        this.webHierarchicalGridPinRowOnRendered = this.webHierarchicalGridPinRowOnRendered.bind(this);
        var actionStrip1 = this.actionStrip1 = document.getElementById('actionStrip1') as IgcActionStripComponent;
        var rowIsland1 = this.rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
        var actionStrip2 = this.actionStrip2 = document.getElementById('actionStrip2') as IgcActionStripComponent;

        this._bind = () => {
            grid.data = this.singersData;
            grid.addEventListener("rendered", this.webHierarchicalGridPinRowOnRendered);
            grid.pinning = this.pinningConfig1;
            rowIsland1.pinning = this.pinningConfig2;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webHierarchicalGridPinRowOnRendered(): void {
    	var hierarchicalGrid = this.grid;
    	hierarchicalGrid.pinRow(hierarchicalGrid.data[0].Photo);
    	hierarchicalGrid.pinRow(hierarchicalGrid.data[1].Photo);
    }

}

new Sample();
