import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { EmployeesNestedDataItem, EmployeesNestedDataItem_EmployeesItem, EmployeesNestedData } from './EmployeesNestedData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.employeesNestedData
            column1.bodyTemplate = this.webGridNestedDataCellTemplate
        }
        this._bind();

    }

    private _employeesNestedData: EmployeesNestedData = null;
    public get employeesNestedData(): EmployeesNestedData {
        if (this._employeesNestedData == null)
        {
            this._employeesNestedData = new EmployeesNestedData();
        }
        return this._employeesNestedData;
    }


    public webGridNestedDataCellTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value != null) {
            if (ctx.cell.value.length === 0) return html``;
            return html`
        <igc-expansion-panel>
            <div slot="title" style="font-size: 1.1em; font-weight: bold; margin-top: 1rem; margin-bottom: 0.25rem;">
            ${ctx.cell.value[0].Name}
            </div>
            <div class="description">
                <div style="display: flex; align-items: center;">
                    <div for="title" style="min-width: 30px">Title</div>
                    <input id='Title' type="text" name="title" value="${ctx.cell.value[0].Title}" style="text-overflow: ellipsis;" />
                </div>
                <div style="display: flex; align-items: center;">
                    <div for="age" style="min-width: 30px">Age</div>
                    <input id='Age' type="text" name="title" value="${ctx.cell.value[0].Age}" style="text-overflow: ellipsis;" />
                </div>
            </div>
        </igc-expansion-panel>
            `;
        }
    };

}

new Sample();
