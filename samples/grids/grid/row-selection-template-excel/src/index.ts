import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, PropertyEditorPanelDescriptionModule, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent, IgcPaginatorComponent, IgcPaginatorResourceStrings } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcRowSelectorTemplateContext, IgcHeadSelectorTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

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
            var paginatorResourceStrings1 = new IgcPaginatorResourceStrings();
            paginatorResourceStrings1.igx_paginator_label = "Items per page";

            this._paginatorResourceStrings1 = paginatorResourceStrings1;
        }
        return this._paginatorResourceStrings1;
    }
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;

        this._bind = () => {
            grid.data = this.customersData;
            grid.rowSelectorTemplate = this.webGridRowSelectorExcelTemplate;
            grid.headSelectorTemplate = this.webGridHeaderRowSelectorExcelTemplate;
            paginator.resourceStrings = this.paginatorResourceStrings1;
        }
        this._bind();

    }

    private _customersData: CustomersData = null;
    public get customersData(): CustomersData {
        if (this._customersData == null)
        {
            this._customersData = new CustomersData();
        }
        return this._customersData;
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

    public webGridRowSelectorExcelTemplate = (ctx: IgcRowSelectorTemplateContext) => {
        return html`<span style='display: block;width:30px;'> ${ctx.implicit.index}</span>`;
    }

    public webGridHeaderRowSelectorExcelTemplate = (ctx: IgcHeadSelectorTemplateContext) => {
        if (ctx.implicit.selectedCount > 0 && ctx.implicit.selectedCount === ctx.implicit.totalCount) {
            return html`<span style='display: block;width:30px;'><i style='color: rgb(239, 184, 209);'>◢</i></span>`;
        } else {
            return html`<span style='display: block;width:30px;'><i>◢</i></span>`;
        }
    };

}

new Sample();
