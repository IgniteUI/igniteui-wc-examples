import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent, IgcCircularProgressComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent, IgcCircularProgressComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private progressElement: HTMLElement;
    private queryStringElement: HTMLElement;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as any;
        this.progressElement = document.getElementById('progress')!;
        this.queryStringElement = document.getElementById('queryString')!;
        
        const data: ProductInfo[] = this.dataService.generateProducts(100);
        
        const columns = [
            { 
                key: 'name', 
                headerText: 'Name', 
                sort: true 
            },
            { 
                key: 'price', 
                type: 'number', 
                headerText: 'Price', 
                sort: true 
            },
            {
                key: 'rating',
                type: 'number',
                headerText: 'Rating',
                sort: true,
                cellTemplate: (params: any) => {
                    const rating = document.createElement('igc-rating');
                    rating.setAttribute('readonly', '');
                    rating.setAttribute('step', '0.01');
                    rating.setAttribute('value', params.value.toString());
                    return rating;
                }
            },
            { 
                key: 'sold', 
                type: 'number', 
                headerText: 'Sold', 
                sort: true 
            },
            { 
                key: 'total', 
                type: 'number', 
                headerText: 'Total', 
                sort: true 
            }
        ];

        const dataPipelineConfiguration = {
            sort: async ({ data, grid }: any) => {
                this.progressElement.classList.add('in-operation');
                const queryString = grid.sortExpressions.length
                    ? this.buildUri(grid.sortExpressions)
                    : '';
                this.queryStringElement.querySelector('code')!.textContent = queryString;
                
                await new Promise(resolve => setTimeout(resolve, 250));
                this.progressElement.classList.remove('in-operation');
                return data;
            }
        };

        this.gridLite.columns = columns;
        this.gridLite.data = data;
        this.gridLite.dataPipelineConfiguration = dataPipelineConfiguration;
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