import { IgcBadgeModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule, PropertyEditorPanelDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcPropertyEditorPanelComponent, IgcPropertyEditorPropertyDescriptionComponent } from 'igniteui-webcomponents-layouts';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { FinancialDataAllItem, FinancialDataAll } from './FinancialDataAll';
import { IgcBadgeComponent } from 'igniteui-webcomponents';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
import { ModuleManager } from 'igniteui-webcomponents-core';
defineAllComponents();

ModuleManager.register(
    IgcBadgeModule,
    IgcPropertyEditorPanelModule
);

export class Sample {

    private propertyEditorPanel1: IgcPropertyEditorPanelComponent
    private selectionType: IgcPropertyEditorPropertyDescriptionComponent
    private hideRowSelectors: IgcPropertyEditorPropertyDescriptionComponent
    private grid1: IgcGridComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.currencyCode = "USD";
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
            columnPipeArgs2.currencyCode = "USD";
            columnPipeArgs2.digitsInfo = "1.2-2";

            this._columnPipeArgs2 = columnPipeArgs2;
        }
        return this._columnPipeArgs2;
    }
    private column3: IgcColumnComponent
    private _columnPipeArgs3: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs3(): IgcColumnPipeArgs {
        if (this._columnPipeArgs3 == null)
        {
            var columnPipeArgs3: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs3.currencyCode = "USD";
            columnPipeArgs3.digitsInfo = "1.2-2";

            this._columnPipeArgs3 = columnPipeArgs3;
        }
        return this._columnPipeArgs3;
    }
    private column4: IgcColumnComponent
    private column5: IgcColumnComponent
    private column6: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var propertyEditorPanel1 = this.propertyEditorPanel1 = document.getElementById('propertyEditorPanel1') as IgcPropertyEditorPanelComponent;
        var selectionType = this.selectionType = document.getElementById('selectionType') as IgcPropertyEditorPropertyDescriptionComponent;
        var hideRowSelectors = this.hideRowSelectors = document.getElementById('hideRowSelectors') as IgcPropertyEditorPropertyDescriptionComponent;
        var grid1 = this.grid1 = document.getElementById('grid1') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;

        this._bind = () => {
            propertyEditorPanel1.target = this.grid1
            propertyEditorPanel1.componentRenderer = this.renderer
            grid1.data = this.financialDataAll
            column1.pipeArgs = this.columnPipeArgs1
            column2.pipeArgs = this.columnPipeArgs2
            column3.pipeArgs = this.columnPipeArgs3
            column4.bodyTemplate = this.webGridCurrencyCellTemplate
            column5.bodyTemplate = this.webGridCurrencyCellTemplate
            column6.bodyTemplate = this.webGridCurrencyCellTemplate
        }
        this._bind();

    }

    private _financialDataAll: FinancialDataAll = null;
    public get financialDataAll(): FinancialDataAll {
        if (this._financialDataAll == null)
        {
            this._financialDataAll = new FinancialDataAll();
        }
        return this._financialDataAll;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebGridDescriptionModule.register(context);
            PropertyEditorPanelDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridCurrencyCellTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value > 0) {
            return html`<div>
            <igc-badge variant="success"><span>▲</span></igc-badge>
            <span style='color:green;'>${ctx.cell.value.toFixed(2)}</span>
            </div>`;
        } else {
            return html`<div>
            <igc-badge variant="danger"><span>▼</span></igc-badge>
            <span style='color:red;'>${ctx.cell.value.toFixed(2)}</span>
            </div>`;
        };
    }

}

new Sample();
