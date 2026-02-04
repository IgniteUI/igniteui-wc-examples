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
    protected format = (params: any) => html`<span>${formatter.format(params.value)}</span>`;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.dropdown = document.getElementById('dropdown') as IgcDropdownComponent;
        this.formattersSwitch = document.getElementById('formattersSwitch') as IgcSwitchComponent;

        const data: ProductInfo[] = this.dataService.generateProducts(50);

        const container = document.getElementById('grid-lite');
        
        const template = html`
          <igc-grid-lite .data=${data}>
            <igc-grid-lite-column 
              id="col-id"
              field="id" 
              header="ID"
              hidden
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              id="col-name"
              field="name" 
              header="Product Name"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              id="col-price"
              field="price" 
              header="Price" 
              data-type="number"
              .cellTemplate=${this.format}
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              id="col-sold"
              field="sold" 
              header="Units sold" 
              data-type="number"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              id="col-total"
              field="total" 
              header="Total sold"
              .cellTemplate=${this.format}
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              id="col-rating"
              field="rating" 
              header="Customer rating" 
              data-type="number"
              .cellTemplate=${(params: any) => html`<igc-rating readonly step="0.01" value=${params.value}></igc-rating>`}
            ></igc-grid-lite-column>
          </igc-grid-lite>
        `;
        
        render(template, container!);
        
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

        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'igc-checkbox') {
                const checkbox = target as IgcCheckboxComponent;
                const dropdownItem = checkbox.closest('igc-dropdown-item');
                const columnKey = dropdownItem?.id;
                const prop = Array.from(checkbox.classList).filter(c => c.endsWith('-checkbox'))[0].split('-')[0];
                
                const column = this.gridLite!.querySelector(`#col-${columnKey}`) as any;
                if (column) {
                    // Map property names for declarative API
                    if (prop === 'hidden') {
                        column.hidden = !checkbox.checked;
                    } else if (prop === 'resizable') {
                        column.resizable = checkbox.checked;
                    } else if (prop === 'filter') {
                        column.filterable = checkbox.checked;
                    } else if (prop === 'sort') {
                        column.sortable = checkbox.checked;
                    }
                }
            }
        });
    }
}

new Sample();