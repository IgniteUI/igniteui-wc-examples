import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: IgcGridLite | null = null;
    private log: string[] = [];
    private logElement: HTMLElement;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.logElement = document.getElementById('log')!;
        
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

        // Listen to sorting events
        this.gridLite!.addEventListener('sorting', (event: any) => this.handleSorting(event));
        this.gridLite!.addEventListener('sorted', (event: any) => this.handleSorted(event));
    }

    private get timeStamp(): string {
        return `[${new Date().toLocaleTimeString()}]`;
    }

    private updateLog(message: string) {
        if (this.log.length > 10) {
            this.log.shift();
        }
        this.log.push(message);
        this.renderLog();
    }

    private renderLog() {
        this.logElement.innerHTML = this.log
            .map(entry => `<p><code>${entry}</code></p>`)
            .join('');
        this.logElement.scrollTop = this.logElement.scrollHeight;
    }

    private handleSorting(event: any) {
        const { detail, type } = event;
        const allowedColumns = ['price', 'total', 'sold'];
        
        if (!allowedColumns.includes(detail.key)) {
            event.preventDefault();
            this.updateLog(
                `${this.timeStamp} :: Event '${type}' :: Sort operation was prevented for column '${detail.key}'`
            );
        } else {
            this.updateLog(
                `${this.timeStamp} :: Event '${type}' :: Column '${detail.key}' is being sorted with expression: ${JSON.stringify(detail)}`
            );
        }
    }

    private handleSorted(event: any) {
        const { detail, type } = event;
        this.updateLog(
            `${this.timeStamp} :: Event '${type}' :: Column '${detail.key}' was sorted with expression: ${JSON.stringify(detail)}`
        );
    }
}

new Sample();