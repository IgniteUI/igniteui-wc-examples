import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent } from 'igniteui-webcomponents-grids/grids';
import { InvoicesDataItem, InvoicesData } from './InvoicesData';
import { IgcGroupByRowTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, nothing } from 'lit-html';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";


export class Sample {

    private grid: IgcGridComponent
    private _bind: () => void;

    constructor() {
        var grid = this.grid = document.getElementById('grid') as IgcGridComponent;

        this._bind = () => {
            grid.data = this.invoicesData
            grid.groupRowTemplate = this.webGridGroupByRowTemplate
        }
        this._bind();

    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null)
        {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }
    


    
        public webGridGroupByRowTemplate = (ctx: IgcGroupByRowTemplateContext) => {
    
            var groupRow = (ctx as any).$implicit;
            var values = groupRow.records;
    
            const startDate = new Date('1/1/2022');
            const endDate = new Date('12/31/2022');
            var calc2022 = values.filter((x) => new Date(x.orderDate) >= startDate && new Date(x.orderDate) <= endDate).length;
    
            return html`<div>
    <span style="color:#09f;">${groupRow.expression.fieldName} :</span>
    <span>${groupRow.value}</span>
    <igc-badge>${groupRow.records.length}</igc-badge>
    <span style="color:#09f;"> Ordered in 2022:</span><span>${calc2022}</span>
    </div>`;
    
        };
        
}

new Sample();
