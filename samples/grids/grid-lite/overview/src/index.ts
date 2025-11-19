import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcRatingComponent, IgcCheckboxComponent, IgcSelectComponent, IgcSelectItemComponent, IgcAvatarComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';
import { User, createUser } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(
  IgcAvatarComponent,
  IgcRatingComponent,
  IgcCheckboxComponent,
  IgcSelectComponent,
  IgcSelectItemComponent
);

const choices = ["Low", "Standard", "High"];

export class Sample {

    private grid: IgcGridComponent;
    private avatarColumn: IgcColumnComponent;
    private priorityColumn: IgcColumnComponent;
    private satisfactionColumn: IgcColumnComponent;
    private registeredAtColumn: IgcColumnComponent;
    private activeColumn: IgcColumnComponent;
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.avatarColumn = document.getElementById('avatarColumn') as IgcColumnComponent;
        this.priorityColumn = document.getElementById('priorityColumn') as IgcColumnComponent;
        this.satisfactionColumn = document.getElementById('satisfactionColumn') as IgcColumnComponent;
        this.registeredAtColumn = document.getElementById('registeredAtColumn') as IgcColumnComponent;
        this.activeColumn = document.getElementById('activeColumn') as IgcColumnComponent;

        this._bind = () => {
            this.grid.data = this.data;
            this.avatarColumn.bodyTemplate = this.avatarTemplate;
            this.priorityColumn.bodyTemplate = this.priorityTemplate;
            this.satisfactionColumn.bodyTemplate = this.satisfactionTemplate;
            this.registeredAtColumn.bodyTemplate = this.registeredAtTemplate;
            this.activeColumn.bodyTemplate = this.activeTemplate;
        }
        this._bind();

    }

    private data: User[] = Array.from({ length: 1000 }, () => createUser());

    public avatarTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-avatar
            shape="circle"
            alt="User avatar"
            src=${ctx.cell.value}>
        </igc-avatar>`;
    }

    public priorityTemplate = (ctx: IgcCellTemplateContext) => {
        return html`
            <igc-select outlined .value=${ctx.cell.value} flip>
                ${choices.map(
                    (choice) =>
                        html`<igc-select-item .value=${choice}>${choice}</igc-select-item>`
                )}
            </igc-select>
        `;
    }

    public satisfactionTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-rating readonly .value=${ctx.cell.value}></igc-rating>`;
    }

    public registeredAtTemplate = (ctx: IgcCellTemplateContext) => {
        return html`${ctx.cell.value.toLocaleString()}`;
    }

    public activeTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-checkbox ?checked=${ctx.cell.value}></igc-checkbox>`;
    }

}

new Sample();
