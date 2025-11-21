import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent, IgcSwitchComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private sortConfiguration: any = {
        multiple: true,
        triState: true
    };

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as any;
        
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
        this.gridLite.sortConfiguration = this.sortConfiguration;

        // Setup switch handlers
        const multiSortSwitch = document.getElementById('multiSort') as any;
        const triStateSwitch = document.getElementById('triState') as any;

        multiSortSwitch?.addEventListener('igcChange', (e: any) => {
            this.updateConfig('multiple', e.detail.checked);
        });

        triStateSwitch?.addEventListener('igcChange', (e: any) => {
            this.updateConfig('triState', e.detail.checked);
        });
    }

    private updateConfig(prop: string, value: boolean) {
        this.sortConfiguration = { ...this.sortConfiguration, [prop]: value };
        this.gridLite.sortConfiguration = this.sortConfiguration;
    }
}

new Sample();