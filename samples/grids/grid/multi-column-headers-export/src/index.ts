import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule, WebGridToolbarDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcGridToolbarExporterComponent, IgcColumnComponent, IgcColumnGroupComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private exportHeaders: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private gridToolbarExporter1: IgcGridToolbarExporterComponent
    private iD: IgcColumnComponent
    private generalInformation: IgcColumnGroupComponent
    private companyName: IgcColumnComponent
    private personalDetails: IgcColumnGroupComponent
    private contactName: IgcColumnComponent
    private contactTitle: IgcColumnComponent
    private addressInformation: IgcColumnGroupComponent
    private location: IgcColumnGroupComponent
    private country: IgcColumnComponent
    private region: IgcColumnComponent
    private city: IgcColumnComponent
    private address: IgcColumnComponent
    private contactInformation: IgcColumnGroupComponent
    private phone: IgcColumnComponent
    private fax: IgcColumnComponent
    private postalCode: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var exportHeaders = this.exportHeaders = document.getElementById('exportHeaders') as IgcPropertyEditorPropertyDescriptionComponent;
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var gridToolbarExporter1 = this.gridToolbarExporter1 = document.getElementById('gridToolbarExporter1') as IgcGridToolbarExporterComponent;
        this.webGridExportEventMultiColumnHeaders = this.webGridExportEventMultiColumnHeaders.bind(this);
        var iD = this.iD = document.getElementById('ID') as IgcColumnComponent;
        var generalInformation = this.generalInformation = document.getElementById('GeneralInformation') as IgcColumnGroupComponent;
        var companyName = this.companyName = document.getElementById('CompanyName') as IgcColumnComponent;
        var personalDetails = this.personalDetails = document.getElementById('PersonalDetails') as IgcColumnGroupComponent;
        var contactName = this.contactName = document.getElementById('ContactName') as IgcColumnComponent;
        var contactTitle = this.contactTitle = document.getElementById('ContactTitle') as IgcColumnComponent;
        var addressInformation = this.addressInformation = document.getElementById('AddressInformation') as IgcColumnGroupComponent;
        var location = this.location = document.getElementById('Location') as IgcColumnGroupComponent;
        var country = this.country = document.getElementById('Country') as IgcColumnComponent;
        var region = this.region = document.getElementById('Region') as IgcColumnComponent;
        var city = this.city = document.getElementById('City') as IgcColumnComponent;
        var address = this.address = document.getElementById('Address') as IgcColumnComponent;
        var contactInformation = this.contactInformation = document.getElementById('ContactInformation') as IgcColumnGroupComponent;
        var phone = this.phone = document.getElementById('Phone') as IgcColumnComponent;
        var fax = this.fax = document.getElementById('Fax') as IgcColumnComponent;
        var postalCode = this.postalCode = document.getElementById('PostalCode') as IgcColumnComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.grid
            grid.data = this.customersData
            gridToolbarExporter1.addEventListener("exportStarted", this.webGridExportEventMultiColumnHeaders)
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
            PropertyEditorPanelDescriptionModule.register(context);
            WebGridDescriptionModule.register(context);
            WebGridToolbarDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    
    public webGridExportEventMultiColumnHeaders(args: any): void {
        args.options.ignoreMultiColumnHeaders = false;
    }
        
}

new Sample();
