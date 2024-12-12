import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebActionStripDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcPinningConfig, RowPinningPosition, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import CustomersDataLocal from './CustomersDataLocal.json';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
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
    private company: IgcColumnComponent
    private contactName: IgcColumnComponent
    private contactTitle: IgcColumnComponent
    private address: IgcColumnComponent
    private city: IgcColumnComponent
    private postalCode: IgcColumnComponent
    private phone: IgcColumnComponent
    private fax: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        this.webGridPinRowOnRendered = this.webGridPinRowOnRendered.bind(this);
        var company = this.company = document.getElementById('Company') as IgcColumnComponent;
        var contactName = this.contactName = document.getElementById('ContactName') as IgcColumnComponent;
        var contactTitle = this.contactTitle = document.getElementById('ContactTitle') as IgcColumnComponent;
        var address = this.address = document.getElementById('Address') as IgcColumnComponent;
        var city = this.city = document.getElementById('City') as IgcColumnComponent;
        var postalCode = this.postalCode = document.getElementById('PostalCode') as IgcColumnComponent;
        var phone = this.phone = document.getElementById('Phone') as IgcColumnComponent;
        var fax = this.fax = document.getElementById('Fax') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.customersDataLocal;
            grid.addEventListener("rendered", this.webGridPinRowOnRendered);
            grid.pinning = this.pinningConfig1;
        }
        this._bind();

    }

    private _customersDataLocal: any[] = CustomersDataLocal;
    public get customersDataLocal(): any[] {
        return this._customersDataLocal;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            WebActionStripDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridPinRowOnRendered(args: any): void {
        var grid = this.grid as any;
        grid.pinRow("ALFKI");
        grid.pinRow("AROUT");
    }

}

new Sample();
