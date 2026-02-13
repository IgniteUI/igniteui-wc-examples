import 'igniteui-webcomponents-grids/grids/combined';
import { IgcTreeGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesFlatAvatarsItem, EmployeesFlatAvatars } from './EmployeesFlatAvatars';
import { IgcExporterOptionsBase, IgcGridToolbarExportEventArgs } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private treeGrid: IgcTreeGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var treeGrid = this.treeGrid = document.getElementById('treeGrid') as IgcTreeGridComponent;
        this.webTreeGridToolbarExporting = this.webTreeGridToolbarExporting.bind(this);
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            treeGrid.data = this.employeesFlatAvatars;
            treeGrid.addEventListener("toolbarExporting", this.webTreeGridToolbarExporting);
            column1.bodyTemplate = this.webTreeGridAvatarCellTemplate;
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


    public webTreeGridToolbarExporting(evt: CustomEvent<IgcGridToolbarExportEventArgs>): void {
        const args = evt.detail;
        const options: IgcExporterOptionsBase = args.options;
        if (options) {
            options.fileName = `Report_${new Date().toDateString()}`;
            (args.exporter as any).columnExporting.subscribe((columnArgs: any) => {
                    columnArgs.cancel = columnArgs.header === 'Name';
            });
        }
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