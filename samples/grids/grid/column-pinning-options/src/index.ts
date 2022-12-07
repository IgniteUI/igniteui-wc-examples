import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private column3: IgcColumnComponent
    private column4: IgcColumnComponent
    private column5: IgcColumnComponent
    private column6: IgcColumnComponent
    private column7: IgcColumnComponent
    private column8: IgcColumnComponent
    private column9: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        // var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        // var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;
        // var column3 = this.column3 = document.getElementById('column3') as IgcColumnComponent;
        // var column4 = this.column4 = document.getElementById('column4') as IgcColumnComponent;
        // var column5 = this.column5 = document.getElementById('column5') as IgcColumnComponent;
        // var column6 = this.column6 = document.getElementById('column6') as IgcColumnComponent;
        // var column7 = this.column7 = document.getElementById('column7') as IgcColumnComponent;
        // var column8 = this.column8 = document.getElementById('column8') as IgcColumnComponent;
        // var column9 = this.column9 = document.getElementById('column9') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.customersData
            // column1.headerTemplate = this.webGridPinHeaderTemplate
            // column2.headerTemplate = this.webGridPinHeaderTemplate
            // column3.headerTemplate = this.webGridPinHeaderTemplate
            // column4.headerTemplate = this.webGridPinHeaderTemplate
            // column5.headerTemplate = this.webGridPinHeaderTemplate
            // column6.headerTemplate = this.webGridPinHeaderTemplate
            // column7.headerTemplate = this.webGridPinHeaderTemplate
            // column8.headerTemplate = this.webGridPinHeaderTemplate
            // column9.headerTemplate = this.webGridPinHeaderTemplate
        }
        this._bind();

    }

    private _customersData: CustomersData = null;
    public get customersData(): CustomersData {
        if (this._customersData == null)
        {
            this._customersData = new CustomersData();
        }
        return this._customersData;
    }




    public webGridPinHeaderTemplate = (ctx: IgcCellTemplateContext) => {
        const column = (ctx as any).column;
        return html`<div>
            <span style="float:left">${column.field}</span>
            <span style="float:right" @onpointerdown='"${(e) => this.toggleColumnPin(column.field)}")'>📌</span>
        </div>`;
        };

    public toggleColumnPin(field: string) {
        var grid = document.getElementsByTagName("igc-grid")[0] as IgcGridComponent;
        var col = grid.getColumnByName(field);
        col.pinned = !col.pinned;
        grid.markForCheck();
    }
}

new Sample();
