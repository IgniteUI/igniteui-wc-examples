import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { NwindDataItem, NwindDataItem_LocationsItem, NwindData } from './NwindData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent
    private productName: IgcColumnComponent
    private quantityPerUnit: IgcColumnComponent
    private unitPrice: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1 = new IgcColumnPipeArgs();
            columnPipeArgs1.digitsInfo = "1.2-2";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
    private orderDate: IgcColumnComponent
    private _columnPipeArgs2: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs2(): IgcColumnPipeArgs {
        if (this._columnPipeArgs2 == null)
        {
            var columnPipeArgs2 = new IgcColumnPipeArgs();
            columnPipeArgs2.format = "MM/dd/YYYY";

            this._columnPipeArgs2 = columnPipeArgs2;
        }
        return this._columnPipeArgs2;
    }
    private discontinued: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var productName = this.productName = document.getElementById('ProductName') as IgcColumnComponent;
        var quantityPerUnit = this.quantityPerUnit = document.getElementById('QuantityPerUnit') as IgcColumnComponent;
        var unitPrice = this.unitPrice = document.getElementById('UnitPrice') as IgcColumnComponent;
        var orderDate = this.orderDate = document.getElementById('OrderDate') as IgcColumnComponent;
        var discontinued = this.discontinued = document.getElementById('Discontinued') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.nwindData;
            grid.excelStyleHeaderIconTemplate = this.webGridFilterAltIconTemplate;
            unitPrice.pipeArgs = this.columnPipeArgs1;
            orderDate.pipeArgs = this.columnPipeArgs2;
            discontinued.bodyTemplate = this.webGridBooleanCellTemplate;
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
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridFilterAltIconTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<img height="15px" width="15px" src="http://static.infragistics.com/xplatform/images/grid/propeller-logo.svg" title="Continued" alt="Continued" />`
    }

        public webGridBooleanCellTemplate = (ctx: IgcCellTemplateContext) => {
            if (ctx.cell.value) {
                return html`<img src="https://www.infragistics.com/angular-demos-lob/assets/images/grid/active.png" title="Continued" alt="Continued" />`
            } else {
                return html`<img src="https://www.infragistics.com/angular-demos-lob/assets/images/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
            }
    }

}

new Sample();
