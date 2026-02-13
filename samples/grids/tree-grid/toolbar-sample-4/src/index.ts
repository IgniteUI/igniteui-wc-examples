import { IgcCellTemplateContext, IgcColumnComponent, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcAvatarComponent, IgcButtonComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { EmployeesFlatAvatars } from './EmployeesFlatAvatars';
import { html } from 'lit-html';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import "./index.css";



defineComponents(IgcButtonComponent, IgcIconComponent, IgcAvatarComponent);

const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;

export class Sample {
    constructor() {
        registerIconFromText('clear', icon, 'material');

        var treeGrid  = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = document.getElementById('column1') as IgcColumnComponent;

        treeGrid.data = this.employeesFlatAvatars;
        column1.bodyTemplate = this.webTreeGridAvatarCellTemplate;

        var button = document.getElementById('clearSort') as IgcButtonComponent;
        button.addEventListener("click", () => {
            treeGrid.clearSort();
        });
    }

    private _employeesFlatAvatars: EmployeesFlatAvatars = null;
    public get employeesFlatAvatars(): EmployeesFlatAvatars {
        if (this._employeesFlatAvatars == null)
        {
            this._employeesFlatAvatars = new EmployeesFlatAvatars();
        }
        return this._employeesFlatAvatars;
    }

    public webTreeGridAvatarCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div class="cell__inner">
            <igc-avatar shape="circle" src="${ctx.cell.row.data.Avatar}">
            </igc-avatar>
            <span class="name">${ctx.cell.value}</span>
        </div>`;
    }
}

export function initialize() {
  return new Sample();
}