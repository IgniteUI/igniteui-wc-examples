import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcCheckboxChangeEventArgs, IgcCheckboxComponent, IgcDropdownComponent, IgcRatingComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);
defineComponents(IgcDropdownComponent);
defineComponents(IgcSwitchComponent);
defineComponents(IgcCheckboxComponent);

const formatter = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'EUR',
});

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: IgcGridLite | null = null;
    private dropdown: IgcDropdownComponent;
    private formattersSwitch: IgcSwitchComponent;
    protected hasFormatters = true;
    protected columns: any[];
    protected format = (params: any) => html`<span>${formatter.format(params.value)}</span>`;

    private checkHandler = (col: any, prop: string, e: CustomEvent<IgcCheckboxChangeEventArgs>) => { 
      const columnElement = this.gridLite!.querySelector(`#col-${col.field}`) as any;
      columnElement[prop] = e.detail.checked;
    }

    constructor() {
        this.dataService = new GridLiteDataService();
        const data: ProductInfo[] = this.dataService.generateProducts(50);

        const controlPanel = document.getElementById('panel');
        const container = document.getElementById('grid-lite');

        this.columns = [
          { field: 'id', header: 'ID', hidden: true, resizable: true, sortable: false, filterable: false },
          { field: 'name', header: 'Product Name', hidden: false, resizable: true, sortable: false, filterable: false },
          { field: 'price', header: 'Price', hidden: false, resizable: true, sortable: false, filterable: false },
          { field: 'sold', header: 'Units sold', hidden: false, resizable: true, sortable: false, filterable: false, dataType: 'number' },
          { field: 'total', header: 'Total sold', hidden: false, resizable: true, sortable: false, filterable: false },
          { field: 'rating', header: 'Customer rating', hidden: false, resizable: true, sortable: false, filterable: false, dataType: 'number' }
        ];

        const ratingTemplate = (params: any) => html`<igc-rating readonly step="0.01" value=${params.value}></igc-rating>`;

        const panelTemplate = html`
          <igc-dropdown id="dropdown" keep-open-on-select flip>      
            <igc-button slot="target" variant="outlined">Column properties</igc-button>
            ${this.columns.map(col => html`
              <igc-dropdown-item id=${col.field} role="option">
                <div class="config">
                  <span class="config-key">${col.header}</span>
                  <igc-checkbox @igcChange=${(e: CustomEvent<IgcCheckboxChangeEventArgs>) => this.checkHandler(col, 'hidden', e)} class="hidden-checkbox" ?checked=${col.hidden} label-position="before">Hidden</igc-checkbox>
                  <igc-checkbox @igcChange=${(e: CustomEvent<IgcCheckboxChangeEventArgs>) => this.checkHandler(col, 'resizable', e)} class="resizable-checkbox" ?checked=${col.resizable} label-position="before">Resizable</igc-checkbox>
                  <igc-checkbox @igcChange=${(e: CustomEvent<IgcCheckboxChangeEventArgs>) => this.checkHandler(col, 'sortable', e)} class="sort-checkbox" ?checked=${col.sortable} label-position="before">Sortable</igc-checkbox>
                  <igc-checkbox @igcChange=${(e: CustomEvent<IgcCheckboxChangeEventArgs>) => this.checkHandler(col, 'filterable', e)} class="filter-checkbox" ?checked=${col.filterable} label-position="before">Filterable</igc-checkbox>
                </div>
              </igc-dropdown-item>
            `)}
          </igc-dropdown>
          <igc-switch id="formattersSwitch" label-position="before" checked="true">Value formatters:</igc-switch>
        `;

        const template = html`
          <igc-grid-lite .data=${data}>
            ${this.columns.map(col => html`
              <igc-grid-lite-column
                id="col-${col.field}"
                field=${col.field}
                header=${col.header}
                ?hidden=${col.hidden}
                ?resizable=${col.resizable}
                ?sortable=${col.sortable}
                ?filterable=${col.filterable}
                .cellTemplate=${col.field === 'price' || col.field === 'total'
                  ? this.format
                  : col.field === 'rating'
                    ? ratingTemplate
                    : undefined}
              ></igc-grid-lite-column>
            `)}
          </igc-grid-lite>
        `;

        render(panelTemplate, controlPanel!);
        render(template, container!);

        this.dropdown = document.getElementById('dropdown') as IgcDropdownComponent;
        this.formattersSwitch = document.getElementById('formattersSwitch') as IgcSwitchComponent;
        this.gridLite = container!.querySelector('igc-grid-lite');

        this.dropdown.addEventListener('igcChange', (e: any) => { this.dropdown.clearSelection(); });
        this.formattersSwitch.addEventListener('igcChange', (e: CustomEvent<IgcCheckboxChangeEventArgs>) => {
            const priceCol = this.gridLite!.querySelector('#col-price') as any;
            const totalCol = this.gridLite!.querySelector('#col-total') as any;

            if (e.detail.checked) {
                priceCol.cellTemplate = this.format;
                totalCol.cellTemplate = this.format;
            } else {
                priceCol.cellTemplate = undefined;
                totalCol.cellTemplate = undefined;
            }
        });
    }
}

new Sample();