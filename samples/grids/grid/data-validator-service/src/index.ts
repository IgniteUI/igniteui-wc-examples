import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesDataItem, EmployeesData } from './EmployeesData';

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
    private rowEditableEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var rowEditableEditor = this.rowEditableEditor = document.getElementById('RowEditableEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.grid;
            grid.data = this.employeesData;
        }
        this._bind();

    }

    private _employeesData: EmployeesData = null;
    public get employeesData(): EmployeesData {
        if (this._employeesData == null)
        {
            this._employeesData = new EmployeesData();
        }
        return this._employeesData;
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
