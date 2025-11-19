import 'igniteui-webcomponents-grids/grids/combined';
import { defineComponents, IgcRatingComponent, IgcCheckboxComponent, IgcSwitchComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import { IgcGridComponent, IgcColumnComponent } from 'igniteui-webcomponents-grids/grids';
import { IgcCellTemplateContext } from 'igniteui-webcomponents-grids/grids';
import { html, render } from 'lit-html';
import { createProductInfo, ProductInfo } from './mock-data';

import "igniteui-webcomponents-grids/grids/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcRatingComponent, IgcCheckboxComponent, IgcSwitchComponent, IgcButtonComponent);

const formatter = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "EUR",
});

export class Sample {

    private grid: IgcGridComponent;
    private priceColumn: IgcColumnComponent;
    private totalColumn: IgcColumnComponent;
    private ratingColumn: IgcColumnComponent;
    private panel: HTMLElement;
    private hasFormatters: boolean = true;
    private _bind: () => void;

    constructor() {
        this.grid = document.getElementById('grid') as IgcGridComponent;
        this.priceColumn = document.getElementById('priceColumn') as IgcColumnComponent;
        this.totalColumn = document.getElementById('totalColumn') as IgcColumnComponent;
        this.ratingColumn = document.getElementById('ratingColumn') as IgcColumnComponent;
        this.panel = document.getElementById('panel') as HTMLElement;

        this._bind = () => {
            this.grid.data = this.data;
            this.priceColumn.bodyTemplate = this.formatCurrency;
            this.totalColumn.bodyTemplate = this.formatCurrency;
            this.ratingColumn.bodyTemplate = this.ratingTemplate;
            
            this.renderPanel();
        }
        this._bind();

    }

    private data: ProductInfo[] = Array.from({ length: 50 }, () => createProductInfo());

    public formatCurrency = (ctx: IgcCellTemplateContext) => {
        return html`${formatter.format(ctx.cell.value)}`;
    }

    public ratingTemplate = (ctx: IgcCellTemplateContext) => {
        return html`<igc-rating
            readonly
            step="0.01"
            value=${ctx.cell.value}>
        </igc-rating>`;
    }

    private renderPanel() {
        const panelContent = html`
            <div id="control-panel">
                <igc-switch 
                    ?checked=${this.hasFormatters}
                    @igcChange=${(e: CustomEvent) => this.handleFormattersChange(e.detail)}
                    label-position="before">
                    Value formatters:
                </igc-switch>
            </div>
        `;
        render(panelContent, this.panel);
    }

    private handleFormattersChange(checked: boolean) {
        this.hasFormatters = checked;
        if (checked) {
            this.priceColumn.bodyTemplate = this.formatCurrency;
            this.totalColumn.bodyTemplate = this.formatCurrency;
        } else {
            this.priceColumn.bodyTemplate = undefined;
            this.totalColumn.bodyTemplate = undefined;
        }
    }

}

new Sample();
