import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebHierarchicalGridDescriptionModule, WebCheckboxDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcHierarchicalGridComponent, IgcPaginatorComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcRowSelectorTemplateContext, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private hierarchicalGrid: IgcHierarchicalGridComponent
    private paginator: IgcPaginatorComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid = this.hierarchicalGrid = document.getElementById('hierarchicalGrid') as IgcHierarchicalGridComponent;
        var paginator = this.paginator = document.getElementById('paginator') as IgcPaginatorComponent;

        this._bind = () => {
            hierarchicalGrid.data = this.singersData;
            hierarchicalGrid.rowSelectorTemplate = this.webGridRowSelectorTemplate;
            hierarchicalGrid.headSelectorTemplate = this.webGridHeaderRowSelectorTemplate;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }

    private _componentRenderer: ComponentRenderer = null;
    public get renderer(): ComponentRenderer {
        if (this._componentRenderer == null) {
            this._componentRenderer = new ComponentRenderer();
            var context = this._componentRenderer.context;
            WebHierarchicalGridDescriptionModule.register(context);
            WebCheckboxDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridRowSelectorTemplate = (ctx: IgcRowSelectorTemplateContext) => {
        if (ctx.implicit.selected) {
            return html`<div style="justify-content: space-evenly;display: flex;width: 70px;">
        <span> ${ctx.implicit.index}</span>
    <igc-checkbox checked></igc-checkbox>
    </div>`;
        } else {
            return html`<div style="justify-content: space-evenly;display: flex;width: 70px;">
        <span> ${ctx.implicit.index}</span>
    <igc-checkbox></igc-checkbox>
    </div>`;
    };
    }

    public webGridHeaderRowSelectorTemplate = (ctx: any) => {
        return html`<div style="width: 70px;height: 60px;display: flex;">
    <img src="https://dl.infragistics.com/x/img/browsers/ig.png" class="header-image">
    </div>`;
    };

}

new Sample();
