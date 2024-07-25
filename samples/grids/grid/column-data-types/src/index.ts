import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataExtendedDates } from './InvoicesDataExtendedDates';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.invoicesDataExtendedDates;
        }
        this._bind();

    }

    private _invoicesDataExtendedDates: InvoicesDataExtendedDates = null;
    public get invoicesDataExtendedDates(): InvoicesDataExtendedDates {
        if (this._invoicesDataExtendedDates == null)
        {
            this._invoicesDataExtendedDates = new InvoicesDataExtendedDates();
        }
        return this._invoicesDataExtendedDates;
    }

}

new Sample();
