import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
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
    private cellSelectionEditorHierarchicalGrid: IgcPropertyEditorPropertyDescriptionComponent
    private cellSelectionEditorRowIsland: IgcPropertyEditorPropertyDescriptionComponent
    private hierarchicalGrid: IgcHierarchicalGridComponent
    private rowIsland: IgcRowIslandComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorHierarchicalGrid = this.propertyEditorHierarchicalGrid = document.getElementById('PropertyEditorHierarchicalGrid') as IgcPropertyEditorPanelComponent;
        var cellSelectionEditorHierarchicalGrid = this.cellSelectionEditorHierarchicalGrid = document.getElementById('CellSelectionEditorHierarchicalGrid') as IgcPropertyEditorPropertyDescriptionComponent;
        var cellSelectionEditorRowIsland = this.cellSelectionEditorRowIsland = document.getElementById('CellSelectionEditorRowIsland') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webRowIslandCellSelectionChange = this.webRowIslandCellSelectionChange.bind(this);
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        var rowIsland = this.rowIsland = document.getElementById('rowIsland') as IgcRowIslandComponent;

        this._bind = () => {
            propertyEditorHierarchicalGrid.componentRenderer = this.renderer;
            propertyEditorHierarchicalGrid.target = this.hierarchicalGrid;
            cellSelectionEditorRowIsland.changed = this.webRowIslandCellSelectionChange;
            hierarchicalGrid.data = this.singersData;
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

    public webRowIslandCellSelectionChange(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var rowIsland = this.rowIsland;
        if (rowIsland)
            rowIsland.cellSelection = args.newValue.toLocaleLowerCase();
    }

}

new Sample();
