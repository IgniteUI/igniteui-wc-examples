import { IgcPropertyEditorPanelModule } from 'igniteui-webcomponents-layouts';
import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { AthletesDataItem, AthletesData } from './AthletesData';
import "./index.css";

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPropertyEditorPanelModule
);

export class Sample {

    private grid: IgcGridComponent;

    private upFontCondition = (rowData: any, columnKey: any): boolean => rowData[columnKey] > 95;

    private downFontCondition = (rowData: any, columnKey: any): boolean => rowData[columnKey] <= 95;

    public beatsPerMinuteClasses = {
        downFont: this.downFontCondition,
        upFont: this.upFontCondition
    };

    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var beatsPerMinuteColumn = document.getElementById('beatsPerMinuteClasses') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.athletesData;
            beatsPerMinuteColumn.cellClasses = this.beatsPerMinuteClasses;
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

}

new Sample();
