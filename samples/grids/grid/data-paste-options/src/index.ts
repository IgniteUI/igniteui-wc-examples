import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription2: IgcPropertyEditorPropertyDescriptionComponent
    private grid1: IgcGridComponent
    private contactName: IgcColumnComponent
    private contactTitle: IgcColumnComponent
    private phone: IgcColumnComponent
    private country: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridPasteOptions = this.webGridPasteOptions.bind(this);
        var propertyEditorPropertyDescription2 = this.propertyEditorPropertyDescription2 = document.getElementById('propertyEditorPropertyDescription2') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridExcelDownload = this.webGridExcelDownload.bind(this);
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        // var contactName = this.contactName = document.getElementById('ContactName') as IgcColumnComponent;
        // var contactTitle = this.contactTitle = document.getElementById('ContactTitle') as IgcColumnComponent;
        // var phone = this.phone = document.getElementById('Phone') as IgcColumnComponent;
        // var country = this.country = document.getElementById('Country') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorPanel1.componentRenderer = this.renderer
            propertyEditorPanel1.target = this.grid1
            propertyEditorPropertyDescription1.buttonClicked = this.webGridPasteOptions
            propertyEditorPropertyDescription2.buttonClicked = this.webGridExcelDownload
            grid1.data = this.customersData
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
        }
        return this._componentRenderer;
    }


    public webGridPasteOptions(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        //TODO

        //var grid = this.grid1;
        // grid.transactions.commit(grid.data);
        //dialog.close();

        console.log("test");
    }


    public webGridExcelDownload(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        //TODO

        //var grid = this.grid1;
        // grid.transactions.commit(grid.data);
        //dialog.close();

        console.log("test");
    }

}

new Sample();
