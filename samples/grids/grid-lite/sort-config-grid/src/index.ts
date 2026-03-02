import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent, IgcSwitchComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: IgcGridLite | null = null;
    private sortingOptions: any = {
        mode: 'multiple'
    };

    constructor() {
        this.dataService = new GridLiteDataService();
        
        const data: ProductInfo[] = this.dataService.generateProducts(100);
        
        const container = document.getElementById('grid-lite');
        
        const template = html`
          <igc-grid-lite .data=${data}>
            <igc-grid-lite-column 
              field="name" 
              header="Name" 
              sortable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="price" 
              header="Price" 
              data-type="number"
              sortable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="rating" 
              header="Rating" 
              data-type="number"
              sortable
              .cellTemplate=${(params: any) => html`<igc-rating readonly step="0.01" value=${params.value}></igc-rating>`}
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="sold" 
              header="Sold" 
              data-type="number"
              sortable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="total" 
              header="Total" 
              data-type="number"
              sortable
            ></igc-grid-lite-column>
          </igc-grid-lite>
        `;
        
        render(template, container!);
        
        // Get reference to the grid after rendering
        this.gridLite = container!.querySelector('igc-grid-lite');
        this.gridLite!.sortingOptions = this.sortingOptions;

        // Setup switch handlers
        const multiSortSwitch = document.getElementById('multiSort') as any;

        multiSortSwitch?.addEventListener('igcChange', (e: any) => {
            this.updateConfig('mode', e.detail.checked ? 'multiple' : 'single');
        });
    }

    private updateConfig(prop: string, value: any) {
        this.sortingOptions = { ...this.sortingOptions, [prop]: value };
        this.gridLite!.sortingOptions = this.sortingOptions;
    }
}

new Sample();