import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatDataItem, EmployeesFlatData } from './EmployeesFlatData';
import { IgcRowSelectorTemplateContext, IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatData;
            treeGrid.rowSelectorTemplate = this.webGridRowSelectorTemplate;
            treeGrid.headSelectorTemplate = this.webGridHeaderRowSelectorTemplate;
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


    public webGridRowSelectorTemplate = (ctx: IgcRowSelectorTemplateContext) => {
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
