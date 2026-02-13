import 'igniteui-webcomponents-grids/grids/combined';
import { IgcHierarchicalGridComponent } from 'igniteui-webcomponents-grids/grids';
import SingersData from './SingersData.json';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

import "./index.css";

export class Sample {

    private hierarchicalGrid1: IgcHierarchicalGridComponent
    private _bind: () => void;

    constructor() {
        var hierarchicalGrid1 = this.hierarchicalGrid1 = document.getElementById('hierarchicalGrid1') as IgcHierarchicalGridComponent;

        this._bind = () => {
            hierarchicalGrid1.data = this.singersData;
            hierarchicalGrid1.excelStyleHeaderIconTemplate = this.webGridFilterAltIconTemplate;
        }
        this._bind();

    }

    private _singersData: any[] = SingersData;
    public get singersData(): any[] {
        return this._singersData;
    }


    public webGridFilterAltIconTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<img height="15px" width="15px" src="http://dl.infragistics.com/x/img/grid/propeller-logo.sv" title="Continued" alt="Continued" />`
    }

}

export function initialize() {
  return new Sample();
}