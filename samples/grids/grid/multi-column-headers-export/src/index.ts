import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebGridToolbarDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcGridToolbarExporterComponent, IgcColumnGroupComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcExporterEventArgs } from 'igniteui-webcomponents-grids/grids';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private gridToolbarExporter1: IgcGridToolbarExporterComponent
    private generalInformation: IgcColumnGroupComponent
    private personalDetails: IgcColumnGroupComponent
    private addressInformation: IgcColumnGroupComponent
    private location: IgcColumnGroupComponent
    private contactInformation: IgcColumnGroupComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var gridToolbarExporter1 = this.gridToolbarExporter1 = document.getElementById('gridToolbarExporter1') as IgcGridToolbarExporterComponent;
        this.webGridExportEventMultiColumnHeaders = this.webGridExportEventMultiColumnHeaders.bind(this);
        var generalInformation = this.generalInformation = document.getElementById('GeneralInformation') as IgcColumnGroupComponent;
        var personalDetails = this.personalDetails = document.getElementById('PersonalDetails') as IgcColumnGroupComponent;
        var addressInformation = this.addressInformation = document.getElementById('AddressInformation') as IgcColumnGroupComponent;
        var location = this.location = document.getElementById('Location') as IgcColumnGroupComponent;
        var contactInformation = this.contactInformation = document.getElementById('ContactInformation') as IgcColumnGroupComponent;

        this._bind = () => {
            grid.data = this.customersData;
            gridToolbarExporter1.addEventListener("exportStarted", this.webGridExportEventMultiColumnHeaders);
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
            WebGridToolbarDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridExportEventMultiColumnHeaders(args: CustomEvent<IgcExporterEventArgs>): void {
        if (args.detail.options) {
            args.detail.options.ignoreMultiColumnHeaders = false;
        }
    }

}

export function initialize() {
  return new Sample();
}