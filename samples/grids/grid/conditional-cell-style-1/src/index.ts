import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataItem, AthletesData } from './AthletesData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.athletesData;
            column1.bodyTemplate = this.webGridBeatsPerMinuteTemplate;
            column2.bodyTemplate = this.webGridTopSpeedTemplate;
            column3.bodyTemplate = this.webGridImageCellTemplate;
        }
        this._bind();

    }

    private _athletesData: AthletesData = null;
    public get athletesData(): AthletesData {
        if (this._athletesData == null)
        {
            this._athletesData = new AthletesData();
        }
        return this._athletesData;
    }


    public webGridBeatsPerMinuteTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value > 95) {
            return html`<div><span style="color: red;">${ctx.cell.value}</span></div>`;
        }
        else {
            return html`<div><span style="color: green;">${ctx.cell.value}</span></div>`;
        }
    }

    public webGridTopSpeedTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value < 5) {
            return html`<div><span style="color: royalblue;">${ctx.cell.value}</span></div>`;
        }
        else {
            return html`<div><span>${ctx.cell.value}</span></div>`;
        }
    };

    public webGridImageCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div>
            <img src="${ctx.cell.value}"/>
        </div>`;
    };

}

new Sample();
