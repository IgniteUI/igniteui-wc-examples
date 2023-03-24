import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDetailsItem, EmployeesFlatDetails } from './EmployeesFlatDetails';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';

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
    private clipboardEnabledEditor: IgcPropertyEditorPropertyDescriptionComponent
    private clipboardHeadersEditor: IgcPropertyEditorPropertyDescriptionComponent
    private clipboardFormattersEditor: IgcPropertyEditorPropertyDescriptionComponent
    private propertyEditorPropertyDescription1: IgcPropertyEditorPropertyDescriptionComponent
    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var clipboardEnabledEditor = this.clipboardEnabledEditor = document.getElementById('ClipboardEnabledEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var clipboardHeadersEditor = this.clipboardHeadersEditor = document.getElementById('ClipboardHeadersEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var clipboardFormattersEditor = this.clipboardFormattersEditor = document.getElementById('ClipboardFormattersEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridClearSelection = this.webGridClearSelection.bind(this);
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webGridClipboardOperationsColumnInit = this.webGridClipboardOperationsColumnInit.bind(this);

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.treeGrid
            propertyEditorPropertyDescription1.buttonClicked = this.webGridClearSelection
            treeGrid.data = this.employeesFlatDetails
            treeGrid.addEventListener("columnInit", this.webGridClipboardOperationsColumnInit)
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
            PropertyEditorPanelDescriptionModule.register(context);
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    
    public webGridClearSelection(args: any): void {
        console.log("TODO" + args);
    	//TODO
    }
        
    
    public webGridClipboardOperationsColumnInit(args: any): void {
        let column = args.detail;
        column.formatter = (e: any) => { return "** " + e + " **" };
        column.header = "🎉" + column.field;
    }
        
}

new Sample();
