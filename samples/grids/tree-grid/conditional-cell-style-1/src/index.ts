import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { FoodsDataItem, FoodsData } from './FoodsData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;

        this._bind = () => {
            treeGrid.data = this.foodsData;
            column1.bodyTemplate = this.webTreeGridProductNameTemplate;
            column2.bodyTemplate = this.webTreeGridUnitPriceTemplate;
        }
        this._bind();

    }

    private _foodsData: FoodsData = null;
    public get foodsData(): FoodsData {
        if (this._foodsData == null)
        {
            this._foodsData = new FoodsData();
        }
        return this._foodsData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            PropertyEditorPanelDescriptionModule.register(context);
            WebTreeGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webTreeGridProductNameTemplate = (ctx: IgcCellTemplateContext) => {
        let value = ctx.cell.value;

        if (value == "Grandmas Boysenberry Spread" || value == "Mishi Kobe Niku" || value == "Carnarvon Tigers" || value == "Ikura") {
            return html`<span style="color: royalblue">${value}</span>`;
        }
        else {
            return html`<span>${value}</span>`;
        }
    };

    public webTreeGridUnitPriceTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value <= 25) {
            return html`<span style="color: green">${ctx.cell.value}</span>`;
        }
        else {
            return html`<span style="color: red">${ctx.cell.value}</span>`;
        }
    };

}

new Sample();
