import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private column1: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            column1.bodyTemplate = this.webGridBooleanCellTemplate;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


        public webGridBooleanCellTemplate = (ctx: IgcCellTemplateContext) => {
            if (ctx.cell.value) {
                return html`<img src="https://dl.infragistics.com/x/img/grid/active.png" title="Continued" alt="Continued" />`
            } else {
                return html`<img src="https://dl.infragistics.com/x/img/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
            }
    }

}

export function initialize() {
  return new Sample();
}