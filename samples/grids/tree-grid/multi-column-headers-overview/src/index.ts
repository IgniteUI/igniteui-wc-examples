import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, WebColumnGroupDescriptionModule, PropertyEditorPanelDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditor: IgcPropertyEditorPanelComponent
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription2: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridPinFirstGroupToggle = this.webTreeGridPinFirstGroupToggle.bind(this);
        var propertyEditorPropertyDescription2 = this.propertyEditorPropertyDescription2 = document.getElementById('propertyEditorPropertyDescription2') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webTreeGridHideFirstGroupToggle = this.webTreeGridHideFirstGroupToggle.bind(this);
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.treeGrid;
            propertyEditorPropertyDescription1.buttonClicked = this.webTreeGridPinFirstGroupToggle;
            propertyEditorPropertyDescription2.buttonClicked = this.webTreeGridHideFirstGroupToggle;
            treeGrid.data = this.employeesFlatDetails;
        }
        this._bind();

    }

    private _employeesFlatDetails: EmployeesFlatDetails = null;
    public get employeesFlatDetails(): EmployeesFlatDetails {
        if (this._employeesFlatDetails == null)
        {
            this._employeesFlatDetails = new EmployeesFlatDetails();
        }
        return this._employeesFlatDetails;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            WebColumnGroupDescriptionModule.register(context);
            PropertyEditorPanelDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridPinFirstGroupToggle(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        const grid: IgcTreeGridComponent = this.treeGrid;
        const firstColumnGroup = grid.getColumnByName("HireDate").parent;
        firstColumnGroup.pinned = !firstColumnGroup.pinned;
        grid.markForCheck();
    }

    public webTreeGridHideFirstGroupToggle(sender: any, args: IgcPropertyEditorPropertyDescriptionButtonClickEventArgs): void {
        const grid: IgcTreeGridComponent = this.treeGrid;
        const firstColumnGroup = grid.getColumnByName("HireDate").parent;
        firstColumnGroup.hidden = !firstColumnGroup.hidden;
        grid.markForCheck();
    }

}

export function initialize() {
  return new Sample();
}