import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridColumnResized = this.webGridColumnResized.bind(this);

        this._bind = () => {
            grid.data = this.customersData;
            grid.addEventListener("columnResized", this.webGridColumnResized);
        }
        this._bind();

    }

    private _customersData: CustomersData = null;
    public get customersData(): CustomersData {
        if (this._customersData == null)
        {
            this._customersData = new CustomersData();
        }
        return this._customersData;
    }


    public webGridColumnResized(args: CustomEvent<IgcRowSelectionEventArgs>): void {
        //var col = args.detail.column;
        //var pWidth = args.detail.prevWidth;
        //var nWidth = args.detail.newWidth;
    }

}

export function initialize() {
  return new Sample();
}