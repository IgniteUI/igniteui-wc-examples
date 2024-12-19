import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebTreeGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcTreeGridComponent, IgcPaginatorComponent, IgcPaginatorResourceStrings } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import { IgcRowSelectorTemplateContext, IgcGridComponent, IgcHeadSelectorTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private paginator: IgcPaginatorComponent
    private _paginatorResourceStrings1: IgcPaginatorResourceStrings | null = null;
    public get paginatorResourceStrings1(): IgcPaginatorResourceStrings {
        if (this._paginatorResourceStrings1 == null)
        {
            var paginatorResourceStrings1: IgcPaginatorResourceStrings = {} as IgcPaginatorResourceStrings;
            paginatorResourceStrings1.igx_paginator_label = "Items per page";

            this._paginatorResourceStrings1 = paginatorResourceStrings1;
        }
        return this._paginatorResourceStrings1;
    }
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatData;
            treeGrid.rowSelectorTemplate = this.webGridRowSelectorExcelTemplate;
            treeGrid.headSelectorTemplate = this.webGridHeaderRowSelectorExcelTemplate;
            paginator.resourceStrings = this.paginatorResourceStrings1;
        }
        this._bind();

    }

    private _employeesFlatData: EmployeesFlatData = null;
    public get employeesFlatData(): EmployeesFlatData {
        if (this._employeesFlatData == null)
        {
            this._employeesFlatData = new EmployeesFlatData();
        }
        return this._employeesFlatData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebTreeGridDescriptionModule.register(context);
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
