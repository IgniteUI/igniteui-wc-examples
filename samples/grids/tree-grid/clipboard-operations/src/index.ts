import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
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
    private grid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var clipboardEnabledEditor = this.clipboardEnabledEditor = document.getElementById('ClipboardEnabledEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var clipboardHeadersEditor = this.clipboardHeadersEditor = document.getElementById('ClipboardHeadersEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var clipboardFormattersEditor = this.clipboardFormattersEditor = document.getElementById('ClipboardFormattersEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var propertyEditorPropertyDescription1 = this.propertyEditorPropertyDescription1 = document.getElementById('propertyEditorPropertyDescription1') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridClearSelection = this.webGridClearSelection.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcTreeGridComponent;
        this.webGridClipboardOperationsColumnInit = this.webGridClipboardOperationsColumnInit.bind(this);

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.grid
            propertyEditorPropertyDescription1.buttonClicked = this.webGridClearSelection
            grid.data = this.nwindData
            grid.addEventListener("columnInit", this.webGridClipboardOperationsColumnInit)
        }
        this._bind();

    }

    private _nwindData: NwindData = null;
    public get nwindData(): NwindData {
        if (this._nwindData == null)
        {
            this._nwindData = new NwindData();
        }
        return this._nwindData;
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
