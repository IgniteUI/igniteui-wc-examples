import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, IgcColumnPipeArgs } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataItem, AthletesData } from './AthletesData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private _columnPipeArgs1: IgcColumnPipeArgs | null = null;
    public get columnPipeArgs1(): IgcColumnPipeArgs {
        if (this._columnPipeArgs1 == null)
        {
            var columnPipeArgs1: IgcColumnPipeArgs = {} as IgcColumnPipeArgs;
            columnPipeArgs1.digitsInfo = "1.1-5";

            this._columnPipeArgs1 = columnPipeArgs1;
        }
        return this._columnPipeArgs1;
    }
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
            column1.pipeArgs = this.columnPipeArgs1;
            column2.bodyTemplate = this.webGridProgressCellTemplate;
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


    public webGridProgressCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div style="width: 4rem">
            <igc-linear-progress value="${ctx.cell.value}"></igc-linear-progress>
        </div>`;
    };

    public webGridImageCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div>
            <img src="${ctx.cell.value}"
            style="border: 1px solid black;
            object-fit: fill;
            height: 2rem;
            width: 3rem;"/>
        </div>`;
    };

}

new Sample();
