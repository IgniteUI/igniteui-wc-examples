import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent, IgcSelectComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.scss";

IgcGridLite.register();
defineComponents(IgcRatingComponent, IgcSelectComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private currentTheme: string = 'bootstrap-light';
    private data: ProductInfo[] = [];

    constructor() {
        this.dataService = new GridLiteDataService();
        const gridLite = document.getElementById('grid-lite') as any;
        this.data = this.dataService.generateProducts(50);
        
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
        gridLite.data = this.data;

        // Theme switcher
        const themeSelect = document.getElementById('theme-select') as IgcSelectComponent;
        if (themeSelect) {
            themeSelect.addEventListener('igcChange', (event: any) => {
                const selectedValue = event.detail.value;
                this.changeTheme(selectedValue);
            });
        }

        // Apply initial theme
        this.changeTheme(this.currentTheme);
    }

    private changeTheme(theme: string) {
        this.currentTheme = theme;
        const wrapper = document.querySelector('.grid-lite-wrapper');
        if (wrapper) {
            wrapper.setAttribute('data-theme', theme);
        }
        const gridLite = document.getElementById('grid-lite') as any;
        if (gridLite) {
            gridLite.data = this.data;
        }
    }
}

new Sample();