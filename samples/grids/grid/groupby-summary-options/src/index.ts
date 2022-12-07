import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';

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
    private summaryCalcModeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private summaryPositionEditor: IgcPropertyEditorPropertyDescriptionComponent
    private showOnCollapseEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: any | null = null;
    public get columnPipeArgs1(): any {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: any = {};
            columnPipeArgs1.digitsInfo = "1.2-2";
            columnPipeArgs1.currencyCode = "USD";


            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var summaryCalcModeEditor = this.summaryCalcModeEditor = document.getElementById('SummaryCalcModeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var summaryPositionEditor = this.summaryPositionEditor = document.getElementById('SummaryPositionEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var showOnCollapseEditor = this.showOnCollapseEditor = document.getElementById('ShowOnCollapseEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        // var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer
            propertyEditor.target = this.grid
            grid.data = this.invoicesData
            // column1.pipeArgs = this.columnPipeArgs1
        }
        this._bind();

    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
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