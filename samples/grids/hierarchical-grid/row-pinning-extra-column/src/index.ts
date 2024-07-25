import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcHierarchicalGridComponent, IgcPinningConfig, RowPinningPosition, ColumnPinningPosition, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';

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

    private propertyEditorHierarchicalGrid: IgcPropertyEditorPanelComponent
    private rowPinningEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcHierarchicalGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.rows = RowPinningPosition.Top;
            pinningConfig1.columns = ColumnPinningPosition.End;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private rowIsland1: IgcRowIslandComponent
    private _pinningConfig2: IgcPinningConfig | null = null;
    public get pinningConfig2(): IgcPinningConfig {
        if (this._pinningConfig2 == null)
        {
            var pinningConfig2: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig2.rows = RowPinningPosition.Top;
            pinningConfig2.columns = ColumnPinningPosition.End;

            this._pinningConfig2 = pinningConfig2;
        }
        return this._pinningConfig2;
    }
    private rowIsland2: IgcRowIslandComponent
    private _pinningConfig3: IgcPinningConfig | null = null;
    public get pinningConfig3(): IgcPinningConfig {
        if (this._pinningConfig3 == null)
        {
            var pinningConfig3: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig3.rows = RowPinningPosition.Top;
            pinningConfig3.columns = ColumnPinningPosition.End;

            this._pinningConfig3 = pinningConfig3;
        }
        return this._pinningConfig3;
    }
    private rowIsland3: IgcRowIslandComponent
    private _pinningConfig4: IgcPinningConfig | null = null;
    public get pinningConfig4(): IgcPinningConfig {
        if (this._pinningConfig4 == null)
        {
            var pinningConfig4: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig4.rows = RowPinningPosition.Top;
            pinningConfig4.columns = ColumnPinningPosition.End;

            this._pinningConfig4 = pinningConfig4;
        }
        return this._pinningConfig4;
    }
    private _bind: () => void;

    constructor() {
        var propertyEditorHierarchicalGrid = this.propertyEditorHierarchicalGrid = document.getElementById('PropertyEditorHierarchicalGrid') as IgcPropertyEditorPanelComponent;
        var rowPinningEditor = this.rowPinningEditor = document.getElementById('rowPinningEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webHierarchicalGridChangePinningConfig = this.webHierarchicalGridChangePinningConfig.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        var rowIsland1 = this.rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
        var rowIsland2 = this.rowIsland2 = document.getElementById('rowIsland2') as IgcRowIslandComponent;
        var rowIsland3 = this.rowIsland3 = document.getElementById('rowIsland3') as IgcRowIslandComponent;

        this._bind = () => {
            propertyEditorHierarchicalGrid.componentRenderer = this.renderer;
            propertyEditorHierarchicalGrid.target = this.grid;
            rowPinningEditor.changed = this.webHierarchicalGridChangePinningConfig;
            grid.data = this.singersData;
            grid.pinning = this.pinningConfig1;
            rowIsland1.pinning = this.pinningConfig2;
            rowIsland2.pinning = this.pinningConfig3;
            rowIsland3.pinning = this.pinningConfig4;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebHierarchicalGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webHierarchicalGridChangePinningConfig(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var newPinningPosition = args.newValue === "Top" ? RowPinningPosition.Top : RowPinningPosition.Bottom;
        var hierarchicalGrid = document.getElementById('grid') as IgcHierarchicalGridComponent;
        hierarchicalGrid.pinning.rows = newPinningPosition;
    	var rowIsland1 = document.getElementById('rowIsland1') as IgcRowIslandComponent;
        rowIsland1.pinning.rows = newPinningPosition;
    	var rowIsland2 = document.getElementById('rowIsland2') as IgcRowIslandComponent;
    	if(rowIsland2) {
            rowIsland2.pinning.rows = newPinningPosition;
        }
        var rowIsland3 = document.getElementById('rowIsland3') as IgcRowIslandComponent;
        if(rowIsland3) {
            rowIsland3.pinning.rows = newPinningPosition;
        }
    }

}

new Sample();
