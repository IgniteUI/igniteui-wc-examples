import 'igniteui-webcomponents-grids/grids/combined';
import { ComponentRenderer, WebGridDescriptionModule } from 'igniteui-webcomponents-core';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.customersData;
            grid.rowSelectorTemplate = this.webGridRowSelectorTemplate;
            grid.headSelectorTemplate = this.webGridHeaderRowSelectorTemplate;
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
            WebGridDescriptionModule.register(context);
        }
        return this._componentRenderer;
    }

    public webGridRowSelectorTemplate = (ctx: IgcCellTemplateContext) => {
        const implicit: any = ctx["$implicit"];
        if (implicit.selected) {
            return html`<div style="justify-content: space-evenly;display: flex;width: 70px;">
        <span> ${implicit.index}</span>
    <igc-checkbox checked></igc-checkbox>
    </div>`;
        } else {
            return html`<div style="justify-content: space-evenly;display: flex;width: 70px;">
        <span> ${implicit.index}</span>
    <igc-checkbox></igc-checkbox>
    </div>`;
    };
    }

    public webGridHeaderRowSelectorTemplate = (ctx: any) => {
        return html`<div style="width: 70px;height: 60px;display: flex;">
    <img src="https://www.infragistics.com/angular-demos-lob/assets/images/card/avatars/igLogo.png" class="header-image">
    </div>`;
    };

}

new Sample();
