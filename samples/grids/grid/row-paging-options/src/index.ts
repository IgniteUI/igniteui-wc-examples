import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcPaginatorComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { AthletesDataItem, AthletesData } from './AthletesData';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent
    private paginator: IgcPaginatorComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: any | null = null;
    public get columnPipeArgs1(): any {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: any = {};
            columnPipeArgs1.digitsInfo = "1.1-5";


            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private propertyEditor: IgcPropertyEditorPanelComponent
    private displayDensityEditor: IgcPropertyEditorPropertyDescriptionComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;
        // var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var displayDensityEditor = this.displayDensityEditor = document.getElementById('DisplayDensityEditor') as IgcPropertyEditorPropertyDescriptionComponent;

        this._bind = () => {
            grid.data = this.athletesData
            // column1.pipeArgs = this.columnPipeArgs1
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.grid
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
