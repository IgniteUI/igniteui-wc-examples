import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private log: string[] = [];
    private logElement: HTMLElement;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as any;
        this.logElement = document.getElementById('log')!;
        
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

        this.gridLite.columns = columns;
        this.gridLite.data = data;

        // Listen to sorting events
        this.gridLite.addEventListener('sorting', (event: any) => this.handleSorting(event));
        this.gridLite.addEventListener('sorted', (event: any) => this.handleSorted(event));
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