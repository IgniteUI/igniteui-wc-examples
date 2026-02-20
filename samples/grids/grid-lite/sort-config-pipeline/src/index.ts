import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent, IgcCircularProgressComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent, IgcCircularProgressComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: IgcGridLite | null = null;
    private progressElement: HTMLElement;
    private queryStringElement: HTMLElement;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.progressElement = document.getElementById('progress')!;
        this.queryStringElement = document.getElementById('queryString')!;
        
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

        const dataPipelineConfiguration = {
            sort: async ({ data, grid }: any) => {
                this.progressElement.classList.add('in-operation');
                const queryString = grid.sortingExpressions.length
                    ? this.buildUri(grid.sortingExpressions)
                    : '';
                this.queryStringElement.querySelector('code')!.textContent = queryString;
                
                await new Promise(resolve => setTimeout(resolve, 250));
                this.progressElement.classList.remove('in-operation');
                return data;
            }
        };

        this.gridLite!.dataPipelineConfiguration = dataPipelineConfiguration;
    }

    private buildUri(state: any[]): string {
        const uri: string[] = [];
        for (const expr of state) {
            if (expr.direction === 'none') {
                continue;
            }
            uri.push(
                expr.direction === 'ascending'
                    ? `asc(${expr.key})`
                    : `desc(${expr.key})`
            );
        }
        return `GET: /data?sort_by=${uri.join(',')}`;
    }
}

new Sample();