import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcRowSelectionEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcGridComponent
    private iD: IgcColumnComponent
    private companyName: IgcColumnComponent
    private contactName: IgcColumnComponent
    private contactTitle: IgcColumnComponent
    private address: IgcColumnComponent
    private city: IgcColumnComponent
    private region: IgcColumnComponent
    private postalCode: IgcColumnComponent
    private country: IgcColumnComponent
    private phone: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridColumnResized = this.webGridColumnResized.bind(this);
        var iD = this.iD = document.getElementById('ID') as IgcColumnComponent;
        var companyName = this.companyName = document.getElementById('CompanyName') as IgcColumnComponent;
        var contactName = this.contactName = document.getElementById('ContactName') as IgcColumnComponent;
        var contactTitle = this.contactTitle = document.getElementById('ContactTitle') as IgcColumnComponent;
        var address = this.address = document.getElementById('Address') as IgcColumnComponent;
        var city = this.city = document.getElementById('City') as IgcColumnComponent;
        var region = this.region = document.getElementById('Region') as IgcColumnComponent;
        var postalCode = this.postalCode = document.getElementById('PostalCode') as IgcColumnComponent;
        var country = this.country = document.getElementById('Country') as IgcColumnComponent;
        var phone = this.phone = document.getElementById('Phone') as IgcColumnComponent;

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

new Sample();
