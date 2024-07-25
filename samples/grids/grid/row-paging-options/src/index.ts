import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcPaginatorComponent, IgcPaginatorResourceStrings } from 'igniteui-webcomponents-grids/grids';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { AthletesDataItem, AthletesData } from './AthletesData';

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

    private grid: IgcGridComponent
    private paginator: IgcPaginatorComponent
    private _paginatorResourceStrings1: IgcPaginatorResourceStrings | null = null;
    public get paginatorResourceStrings1(): IgcPaginatorResourceStrings {
        if (this._paginatorResourceStrings1 == null)
        {
            var paginatorResourceStrings1: IgcPaginatorResourceStrings = {} as IgcPaginatorResourceStrings;
            paginatorResourceStrings1.igx_paginator_label = "Records per page";

            this._paginatorResourceStrings1 = paginatorResourceStrings1;
        }
        return this._paginatorResourceStrings1;
    }
    private propertyEditor: IgcPropertyEditorPanelComponent
    private displayDensityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var displayDensityEditor = this.displayDensityEditor = document.getElementById('DisplayDensityEditor') as IgcPropertyEditorPropertyDescriptionComponent;

        this._bind = () => {
            grid.data = this.athletesData;
            paginator.resourceStrings = this.paginatorResourceStrings1;
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.grid;
        }
        this._bind();

    }

    private _athletesData: AthletesData = null;
    public get athletesData(): AthletesData {
        if (this._athletesData == null)
        {
            this._athletesData = new AthletesData();
        }
        return this._athletesData;
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

}

new Sample();
