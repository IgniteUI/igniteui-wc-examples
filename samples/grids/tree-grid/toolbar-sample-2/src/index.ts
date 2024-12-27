import { IgcCellTemplateContext, IgcColumnComponent, IgcTreeGridComponent } from 'igniteui-webcomponents-grids/grids';
import { defineComponents, IgcAvatarComponent, IgcInputComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import { EmployeesFlatAvatars } from './EmployeesFlatAvatars';
import { html } from 'lit-html';
import 'igniteui-webcomponents-grids/grids/combined';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
import "./index.css";



defineComponents(IgcAvatarComponent, IgcInputComponent, IgcSwitchComponent);

export class Sample {
    constructor() {
        var treeGrid  = document.getElementById('treeGrid') as IgcTreeGridComponent;
        var column1 = document.getElementById('column1') as IgcColumnComponent;

        treeGrid.data = this.employeesFlatAvatars;
        column1.bodyTemplate = this.webTreeGridAvatarCellTemplate;

        var inputTitle = document.getElementById('inputTitle') as IgcInputComponent;
        var switchFiltering = document.getElementById('enableFiltering') as IgcSwitchComponent;
        var switchHiding = document.getElementById('enableHiding') as IgcSwitchComponent;
        var switchPinning = document.getElementById('enablePinning') as IgcSwitchComponent;
        var switchExport = document.getElementById('enableExport') as IgcSwitchComponent;

        var toolbarTitle = document.getElementById('toolbarTitle');
        var toolbarFiltering = document.getElementById('toolbarFiltering');
        var toolbarHiding = document.getElementById('toolbarHiding');
        var toolbarPinning = document.getElementById('toolbarPinning');
        var toolbarExporter = document.getElementById('toolbarExporter');

        inputTitle.addEventListener('igcInput', (evt: CustomEvent) => {
            toolbarTitle.textContent = evt.detail;
        });

        switchFiltering.addEventListener('igcChange', () => {
            toolbarFiltering.hidden = !switchFiltering.checked;
        });

        switchHiding.addEventListener('igcChange', () => {
            toolbarHiding.hidden = !switchHiding.checked;
        });

        switchPinning.addEventListener('igcChange', () => {
            toolbarPinning.hidden = !switchPinning.checked;
        });

        switchExport.addEventListener('igcChange', () => {
            toolbarExporter.hidden = !switchExport.checked;
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

new Sample();
