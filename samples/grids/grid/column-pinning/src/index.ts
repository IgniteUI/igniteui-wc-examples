import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import CustomersDataLocal from './CustomersDataLocal.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.customersDataLocal;
        }
        this._bind();

    }

    private _customersDataLocal: any[] = CustomersDataLocal;
    public get customersDataLocal(): any[] {
        return this._customersDataLocal;
    }

}

new Sample();
