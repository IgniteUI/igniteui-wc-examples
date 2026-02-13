import 'igniteui-webcomponents-grids/grids/combined';
import { IgcGridComponent, IgcColumnComponent, IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html } from 'lit-html';
import { InvoicesData } from './InvoicesData';
import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import { defineAllComponents, IgcSelectComponent } from 'igniteui-webcomponents';

defineAllComponents();

import "./index.css";

export class Sample {
    private grid: IgcGridComponent;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;

        this.grid.data = this.invoicesData;
        this.grid.addEventListener('columnInit', this.onColumnInit);

        const mergeSelect = document.getElementById('mergeSelect') as IgcSelectComponent;
        mergeSelect?.addEventListener('igcChange', (e: CustomEvent) => {
            const value = e.detail.value as 'always' | 'onSort';
            this.grid.cellMergeMode = value;
        });
    }

    private _invoicesData: InvoicesData = null;
    public get invoicesData(): InvoicesData {
        if (this._invoicesData == null) {
            this._invoicesData = new InvoicesData();
        }
        return this._invoicesData;
    }

    private onColumnInit = (args: CustomEvent) => {
        const column = args.detail as IgcColumnComponent;
        if (column.field === 'UnitPrice') {
            column.formatter = (val: number) => "$" + Number(val).toFixed(2);
        }
        if (column.field === 'Discontinued') {
            column.bodyTemplate = this.discontinuedTemplate;
        }
    };

    private discontinuedTemplate = (ctx: IgcCellTemplateContext) => {
        if (ctx.cell.value) {
            return html`<img src="https://dl.infragistics.com/x/img/grid/active.png" title="Continued" alt="Continued" />`;
        }
        return html`<img src="https://dl.infragistics.com/x/img/grid/expired.png" title="Discontinued" alt="Discontinued" />`;
    };
}

export function initialize() {
  return new Sample();
}