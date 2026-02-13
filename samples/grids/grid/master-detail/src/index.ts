import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcGridMasterDetailContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.customersData;
            grid.detailTemplate = this.webGridMasterDetailTemplate;
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


    public webGridMasterDetailTemplate = (ctx: IgcGridMasterDetailContext) => {
        var data = ctx.implicit;
        return html` <div class="contact-container">
        <span><strong>Name:</strong> ${data.ContactName}</span>
        <br />
        <span><strong>Title:</strong> ${data.ContactTitle}</span>
        <br />
        <span><strong>Company:</strong> ${data.Company}</span>
        <br />
    </div>`;
    }

}

export function initialize() {
  return new Sample();
}