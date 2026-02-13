import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebHierarchicalGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';

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

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private selectionType: IgcPropertyEditorPropertyDescriptionComponent
    private hideRowSelectors: IgcPropertyEditorPropertyDescriptionComponent
    private hierarchicalGrid: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var selectionType = this.selectionType = document.getElementById('selectionType') as IgcPropertyEditorPropertyDescriptionComponent;
        var hideRowSelectors = this.hideRowSelectors = document.getElementById('hideRowSelectors') as IgcPropertyEditorPropertyDescriptionComponent;
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;

        this._bind = () => {
            propertyEditorPanel1.target = this.hierarchicalGrid;
            propertyEditorPanel1.componentRenderer = this.renderer;
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

}

export function initialize() {
  return new Sample();
}