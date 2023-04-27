import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent, IgcRowType } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css"

export class Sample {

    private grid: IgcGridComponent;
    private _bind: () => void;
    public rowClasses = {
        activeRow: (row: IgcRowType) => row.index === 0
    };

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this._bind = () => {
            grid.data = this.nwindData;
            grid.rowClasses = this.rowClasses;
        }
        this._bind();

    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
    }

}

new Sample();
