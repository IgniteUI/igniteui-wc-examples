import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';
import { createUser, User } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCheckboxComponent);

export class Sample {

    private grid: IgcGridComponent;
    private activeColumn: IgcColumnComponent;
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.activeColumn = document.getElementById('activeColumn') as IgcColumnComponent;

        this._bind = () => {
            this.grid.data = this.data;
            this.activeColumn.bodyTemplate = this.activeTemplate;
        }
        this._bind();

    }

    private data: User[] = Array.from({ length: 50 }, () => createUser());

    public activeTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-checkbox .checked=${ctx.cell.value}></igc-checkbox>`;
    }

}

new Sample();
