import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcPinningConfig, ColumnPinningPosition, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataExtendedItem, AthletesDataExtended } from './AthletesDataExtended';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents } from 'igniteui-webcomponents';
defineAllComponents();

import "./index.css";

export class Sample {

    private grid: IgcGridComponent
    private _pinningConfig1: IgcPinningConfig | null = null;
    public get pinningConfig1(): IgcPinningConfig {
        if (this._pinningConfig1 == null)
        {
            var pinningConfig1: IgcPinningConfig = {} as IgcPinningConfig;
            pinningConfig1.columns = ColumnPinningPosition.End;

            this._pinningConfig1 = pinningConfig1;
        }
        return this._pinningConfig1;
    }
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.athletesDataExtended;
            grid.pinning = this.pinningConfig1;
            column1.bodyTemplate = this.webGridImageCellTemplate;
            column2.bodyTemplate = this.webGridAvatarCellTemplate;
        }
        this._bind();

    }

    private _athletesDataExtended: AthletesDataExtended = null;
    public get athletesDataExtended(): AthletesDataExtended {
        if (this._athletesDataExtended == null)
        {
            this._athletesDataExtended = new AthletesDataExtended();
        }
        return this._athletesDataExtended;
    }


    public webGridImageCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div>
            <img src="${ctx.cell.value}"
            style="border: 1px solid black;
            object-fit: fill;
            height: 2rem;
            width: 3rem;"/>
        </div>`;
    };

        public webGridAvatarCellTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<div>
        <igc-avatar shape="circle" src="${ctx.cell.value}">
        </igc-avatar>
    </div>`;
    }

}

new Sample();
