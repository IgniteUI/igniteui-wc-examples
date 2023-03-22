import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { CustomersDataItem, CustomersData } from './CustomersData';
import { IgcPropertyEditorPropertyDescriptionButtonClickEventArgs } from 'igniteui-webcomponents-layouts';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";

export class Sample {

    private grid: IgcGridComponent
    private column1: IgcColumnComponent
    private column2: IgcColumnComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;
        var column1 = this.column1 = document.getElementById('column1') as IgcColumnComponent;
        var column2 = this.column2 = document.getElementById('column2') as IgcColumnComponent;

        this._bind = () => {
            grid.data = this.customersData;
            column1.bodyTemplate = this.webGridCompositeContactCellTemplate;
            column1.inlineEditorTemplate = this.webGridCompositeContactEditCellTemplate;
            column2.bodyTemplate = this.webGridCompositeAddressCellTemplate;
            column2.inlineEditorTemplate = this.webGridCompositeAddressEditCellTemplate;
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


    public webGridCompositeContactCellTemplate = (ctx: IgcCellTemplateContext) => {
        var cell = ctx.cell as any;
        if (cell === undefined || cell.row === undefined || cell.row.data === undefined) {
            return html``
        }

        return html` <div class="contact-container">
        <span><strong>Name:</strong> ${cell.row.data.ContactName}</span>
        <span><strong>Title:</strong> ${cell.row.data.ContactTitle}</span>
        <br />
        <span><strong>Company:</strong> ${cell.row.data.CompanyName}</span>
        <br />
    </div>`;
    }

    public webGridCompositeContactEditCellTemplate = (ctx: IgcCellTemplateContext) => {
        var cell = ctx.cell as any;
        if (cell === undefined || cell.row === undefined || cell.row.data === undefined) {
            return html``
        }

        function keyUpHandler(event: any, ctx: IgcCellTemplateContext) {
            var cell = ctx.cell as any;
            if (cell !== undefined && cell.row !== undefined && cell.row.data !== undefined) {
                cell.row.data[event.target.id] = event.target.value;
            }
        }

        return html`<div class="contact-container--edit" style="display: inline-grid">
                 <div>
                     <strong>Name:</strong>
                     <input id='ContactName' @keyup=${(e: any) => keyUpHandler(e, ctx)} value="${cell.row.data.ContactName}"></input>
                 </div>
                 <div>
                     <strong>Title:</strong>
                     <input id='ContactTitle' @keyup=${(e: any) => keyUpHandler(e, ctx)} value='${cell.row.data.ContactTitle}'></input>
                 </div>
             <div>
                 <strong>Company:</strong>
                 <input id='CompanyName' @keyup=${(e: any) => keyUpHandler(e, ctx)} value='${cell.row.data.CompanyName}'></input>
             </div>
         </div>`;
    }

    public webGridCompositeAddressCellTemplate = (ctx: IgcCellTemplateContext) => {
        var cell = ctx.cell as any;
        if (cell === undefined || cell.row === undefined || cell.row.data === undefined) {
            return html``
        }

        return html`<div class="address-container">
        <div class="country-city">
            <span><strong>Country:</strong> ${cell.row.data.Country}</span>
            <br>
            <span><strong>City:</strong> ${cell.row.data.City}</span>
        </div>
        <div class="phone-pscode">
            <span><strong>Postal Code:</strong> ${cell.row.data.PostalCode}</span>
            <br>
            <span><strong>Phone:</strong> ${cell.row.data.Phone}</span>
        </div>
        <br />
    </div>`;
    }

    public webGridCompositeAddressEditCellTemplate = (ctx: IgcCellTemplateContext) => {

        var cell = ctx.cell as any;
        if (cell === undefined || cell.row === undefined || cell.row.data === undefined) {
            return html``
        }

        function keyUpHandler(event: any, ctx: IgcCellTemplateContext) {
            var cell = ctx.cell as any;
            if (cell !== undefined && cell.row !== undefined && cell.row.data !== undefined) {
                cell.row.data[event.target.id] = event.target.value;
            }
         }

        return html`<div class="address-container--edit" style="display: inline-grid">
             <div>
                 <span><strong>Country:</strong></span>
                 <input id='Country' @keyup=${(e: any) => keyUpHandler(e, ctx)} value="${cell.row.data.Country}"></input>
                 <br>
                 <span><strong>City:</strong></span>
                 <input id='City' @keyup=${(e: any) => keyUpHandler(e, ctx)} value="${cell.row.data.City}"></input>
             </div>
             <div>
                 <span><strong>Postal Code:</strong></span>
                 <input id='PostalCode' @keyup=${(e: any) => keyUpHandler(e, ctx)} value="${cell.row.data.PostalCode}"></input>
                 <br>
                 <span><strong>Selected:</strong></span>
                 <input id='Phone' @keyup=${(e: any) => keyUpHandler(e, ctx)} value="${cell.row.data.Phone}"></input>
             </div>
             <br>
         </div>`;
        }

}

new Sample();
