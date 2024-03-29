import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataItem, AthletesData } from './AthletesData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

import "./index.css";

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
            column1.cellClasses = this.webGridBeatsPerMinuteCellClassesHandler;
            column2.cellClasses = this.webGridTopSpeedCellClassesHandler;
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


    public webGridBeatsPerMinuteCellClassesHandler = {
        upFont: (rowData: any, columnKey: any): boolean => rowData[columnKey] > 95,
        downFont: (rowData: any, columnKey: any): boolean => rowData[columnKey] <= 95
    }

    public webGridTopSpeedCellClassesHandler = {
        topSpeed: (rowData: any, columnKey: any): boolean => rowData[columnKey] < 5
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

}

new Sample();
