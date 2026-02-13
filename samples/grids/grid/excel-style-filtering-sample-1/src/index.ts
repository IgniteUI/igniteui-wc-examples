import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import NwindData from './NwindData.json';
import { IgcPropertyEditorPropertyDescriptionChangedEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

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
    private sizeEditor: IgcPropertyEditorPropertyDescriptionComponent
    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.digitsInfo = "1.2-2";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private column2: IgcColumnComponent
    private _columnPipeArgs2: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs2(): IgcColumnPipeArgs {
        if (this._columnPipeArgs2 == null)
        {
            var columnPipeArgs2: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs2.format = "MM/dd/YYYY";

            this._columnPipeArgs2 = columnPipeArgs2;
        }
        return this._columnPipeArgs2;
    }
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditor = this.propertyEditor = document.getElementById('PropertyEditor') as IgcPropertyEditorPanelComponent;
        var sizeEditor = this.sizeEditor = document.getElementById('SizeEditor') as IgcPropertyEditorPropertyDescriptionComponent;
        this.webGridSetGridSize = this.webGridSetGridSize.bind(this);
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            propertyEditor.componentRenderer = this.renderer;
            propertyEditor.target = this.grid;
            sizeEditor.changed = this.webGridSetGridSize;
            grid.data = this.nwindData;
            column1.pipeArgs = this.columnPipeArgs1;
            column2.pipeArgs = this.columnPipeArgs2;
            column3.bodyTemplate = this.webGridBooleanCellTemplate;
        }
        this._bind();

    }

    private _nwindData: any[] = NwindData;
    public get nwindData(): any[] {
        return this._nwindData;
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

    public webGridSetGridSize(sender: any, args: IgcPropertyEditorPropertyDescriptionChangedEventArgs): void {
        var newVal = (args.newValue as string).toLowerCase();
        var grid = document.getElementById("grid");
        grid.style.setProperty('--ig-size', `var(--ig-size-${newVal})`);
    }

        public webGridBooleanCellTemplate = (ctx: IgcCellTemplateContext) => {
            if (ctx.cell.value) {
                return html`<img src="https://dl.infragistics.com/x/img/grid/active.png" title="Continued" alt="Continued" />`
            } else {
                return html`<img src="https://dl.infragistics.com/x/img/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
            }
    }

}

export function initialize() {
  return new Sample();
}