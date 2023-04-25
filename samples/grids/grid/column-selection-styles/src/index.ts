import 'igniteui-webcomponents-grids/grids/combined';
import { IgcColumnComponent, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import "./index.css";
defineAllComponents();

export class Sample {
    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this._bind = () => {
            grid.data = this.customersData;
            grid.addEventListener("rendered", () => {
                grid.selectColumns(['CompanyName', 'PostalCode']);
            });
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
}

new Sample();
