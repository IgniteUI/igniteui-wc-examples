import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcColumnComponent, IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcAvatarComponent, IgcButtonGroupComponent, IgcToggleButtonComponent } from 'igniteui-webcomponents';
import { EmployeesFlatAvatars } from './EmployeesFlatAvatars';
import { html } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/material.css";
import "./index.css";

defineComponents(IgcAvatarComponent, IgcButtonGroupComponent, IgcToggleButtonComponent);

export class Sample {

    private treeGrid: IgcTreeGridComponent;
    private nameColumn: IgcColumnComponent;
    private themeSwitcher: IgcButtonGroupComponent;
    private activeTheme = 'theme-studio';
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var nameColumn = this.nameColumn = document.getElementById('nameColumn') as IgcColumnComponent;
        var themeSwitcher = this.themeSwitcher = document.getElementById('themeSwitcher') as IgcButtonGroupComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatAvatars;
            nameColumn.bodyTemplate = this.nameCellTemplate;
            themeSwitcher.addEventListener('igcSelect', (e: CustomEvent<string>) => this.selectTheme(e.detail));
        }
        this._bind();
    }

    private _employeesFlatAvatars: EmployeesFlatAvatars = null;
    public get employeesFlatAvatars(): EmployeesFlatAvatars {
        if (this._employeesFlatAvatars == null)
        {
            this._employeesFlatAvatars = new EmployeesFlatAvatars();
        }
        return this._employeesFlatAvatars;
    }

    public selectTheme(theme: string): void {
        this.treeGrid.classList.replace(this.activeTheme, theme);
        this.activeTheme = theme;
    }

    public nameCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div class="cell__inner">
            <igc-avatar src="${ctx.cell.row.data.Avatar}" shape="circle"></igc-avatar>
            <span class="name">${ctx.cell.value}</span>
        </div>`;
    };
}

new Sample();
