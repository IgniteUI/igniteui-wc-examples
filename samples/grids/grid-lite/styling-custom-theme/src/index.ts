import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.scss";

IgcGridLite.register();
defineComponents(IgcRatingComponent);

export class Sample {
    private dataService: GridLiteDataService;

    constructor() {
        this.dataService = new GridLiteDataService();
        const data: ProductInfo[] = this.dataService.generateProducts(50);
        
        const container = document.getElementById('grid-lite');
        
        const template = html`
          <igc-grid-lite .data=${data}>
            <igc-grid-lite-column 
              field="name" 
              header="Product" 
              sortable
              filterable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="price" 
              header="Price" 
              sortable
              filterable
              data-type="number"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="sold" 
              header="Sold" 
              sortable
              filterable
              data-type="number"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="total" 
              header="Total" 
              sortable
              filterable
              data-type="number"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="rating" 
              header="Rating" 
              data-type="number"
              sortable
              filterable
              .cellTemplate=${(params: any) => html`<igc-rating readonly value=${params.value}></igc-rating>`}
            ></igc-grid-lite-column>
          </igc-grid-lite>
        `;
        
        render(template, container!);
    }
}

new Sample();