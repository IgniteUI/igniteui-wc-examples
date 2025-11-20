import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);

export class Sample {
    private dataService: GridLiteDataService;

    constructor() {
        this.dataService = new GridLiteDataService();
        const gridLite = document.getElementById('grid-lite') as any;
        const data: ProductInfo[] = this.dataService.generateProducts(50);
        
        const columns = [
            { 
                key: 'name', 
                headerText: 'Product', 
                sort: true, 
                filter: true 
            },
            {
                key: 'price',
                headerText: 'Price',
                sort: true,
                filter: true,
                type: 'number'
            },
            {
                key: 'sold',
                headerText: 'Sold',
                sort: true,
                filter: true,
                type: 'number'
            },
            {
                key: 'total',
                headerText: 'Total',
                sort: true,
                filter: true,
                type: 'number'
            },
            {
                key: 'rating',
                headerText: 'Rating',
                type: 'number',
                sort: true,
                filter: true,
                cellTemplate: (params: any) => {
                    const rating = document.createElement('igc-rating');
                    rating.setAttribute('readonly', '');
                    rating.setAttribute('value', params.value.toString());
                    return rating;
                }
            }
        ];

        gridLite.columns = columns;
        gridLite.data = data;
    }
}

new Sample();