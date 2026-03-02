import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcRatingComponent, IgcSelectComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';
import { html, render } from 'lit-html';
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.scss";

IgcGridLite.register();
defineComponents(IgcRatingComponent, IgcSelectComponent);

export class Sample {
    private dataService: GridLiteDataService;
    private formatter: Intl.NumberFormat;
    private currentTheme: string = 'bootstrap-light';
    private data: ProductInfo[] = [];

    constructor() {
        this.dataService = new GridLiteDataService();
        this.formatter = new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'EUR'
        });

        const data: ProductInfo[] = this.dataService.generateProducts(50);

        const container = document.getElementById('grid-lite');

        const template = html`
            <igc-grid-lite .data=${data}>
                <igc-grid-lite-column 
                field="name" 
                header="Product Name"
                ></igc-grid-lite-column>
                <igc-grid-lite-column 
                field="price" 
                header="Price" 
                data-type="number"
                .cellTemplate=${(params: any) => html`<span>${this.formatter.format(params.value)}</span>`}
                ></igc-grid-lite-column>
                <igc-grid-lite-column 
                field="sold" 
                header="Units sold" 
                data-type="number"
                ></igc-grid-lite-column>
                <igc-grid-lite-column 
                field="total" 
                header="Total sold"
                .cellTemplate=${(params: any) => html`<span>${this.formatter.format(params.value)}</span>`}
                ></igc-grid-lite-column>
                <igc-grid-lite-column 
                field="rating" 
                header="Customer rating" 
                data-type="number"
                .cellTemplate=${(params: any) => html`<igc-rating readonly step="0.01" value=${params.value}></igc-rating>`}
                ></igc-grid-lite-column>
            </igc-grid-lite>
        `;

        render(template, container!);


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