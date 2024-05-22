import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private iD: IgcColumnComponent
    private contactName: IgcColumnComponent
    private contactTitle: IgcColumnComponent
    private city: IgcColumnComponent
    private companyName: IgcColumnComponent
    private fax: IgcColumnComponent
    private address: IgcColumnComponent
    private postalCode: IgcColumnComponent
    private country: IgcColumnComponent
    private phone: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var iD = this.iD = document.getElementById('ID') as IgcColumnComponent;
        var contactName = this.contactName = document.getElementById('ContactName') as IgcColumnComponent;
        var contactTitle = this.contactTitle = document.getElementById('ContactTitle') as IgcColumnComponent;
        var city = this.city = document.getElementById('City') as IgcColumnComponent;
        var companyName = this.companyName = document.getElementById('CompanyName') as IgcColumnComponent;
        var fax = this.fax = document.getElementById('Fax') as IgcColumnComponent;
        var address = this.address = document.getElementById('Address') as IgcColumnComponent;
        var postalCode = this.postalCode = document.getElementById('PostalCode') as IgcColumnComponent;
        var country = this.country = document.getElementById('Country') as IgcColumnComponent;
        var phone = this.phone = document.getElementById('Phone') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.customersData;
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

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

}

new Sample();
