import { ColumnConfiguration, IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcCheckboxChangeEventArgs, IgcCheckboxComponent, IgcDropdownComponent, IgcRatingComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, ProductInfo } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcRatingComponent);
defineComponents(IgcDropdownComponent);
defineComponents(IgcSwitchComponent);
defineComponents(IgcCheckboxComponent);

const formatter = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'EUR',
});

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private dropdown: IgcDropdownComponent;
    private formattersSwitch: IgcSwitchComponent;
    protected hasFormatters = true;
    protected format = (params: any) => formatter.format(params.value);
    private columns: any[] = [];

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as IgcGridLite<ProductInfo>;
        this.dropdown = document.getElementById('dropdown') as IgcDropdownComponent;
        this.formattersSwitch = document.getElementById('formattersSwitch') as IgcSwitchComponent;

        const data: ProductInfo[] = this.dataService.generateProducts(50);

        this.columns = [
            {
                key: 'id',
                hidden: true,
                headerText: 'ID'
            },
            {
                key: 'name',
                headerText: 'Product Name'
            },
            {
                key: 'price',
                headerText: 'Price',
                type: 'number',
                cellTemplate: (params: any) => {
                    const span = document.createElement('span');
                    span.textContent = formatter.format(params.value);
                    return span;
                }
            },
            {
                key: 'sold',
                type: 'number',
                headerText: 'Units sold'
            },
            {
                key: 'total',
                headerText: 'Total sold',
                cellTemplate: (params: any) => {
                    const span = document.createElement('span');
                    span.textContent = formatter.format(params.value);
                    return span;
                }
            },
            {
                key: 'rating',
                type: 'number',
                headerText: 'Customer rating',
                cellTemplate: (params: any) => {
                    const rating = document.createElement('igc-rating');
                    rating.setAttribute('readonly', '');
                    rating.setAttribute('step', '0.01');
                    rating.setAttribute('value', params.value.toString());
                    return rating;
                }
            }
        ];

        this.gridLite.columns = this.columns;
        this.gridLite.data = data;

        this.dropdown.addEventListener('igcChange', (e: any) => { this.dropdown.clearSelection(); });
        this.formattersSwitch.addEventListener('igcChange', (e: CustomEvent<IgcCheckboxChangeEventArgs>) => {
            this.gridLite.updateColumns(
                ['price', 'total'].map((key) => ({
                    key,
                    cellTemplate: e.detail.checked ? this.format : undefined,
                })) as ColumnConfiguration<ProductInfo>[]
            );
        });

        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'igc-checkbox') {
                const checkbox = target as IgcCheckboxComponent;
                const dropdownItem = checkbox.closest('igc-dropdown-item');
                const columnKey = dropdownItem?.id;
                const prop = Array.from(checkbox.classList).filter(c => c.endsWith('-checkbox'))[0].split('-')[0];
                this.gridLite.updateColumns({ key: columnKey, [prop]: !checkbox.checked });
            }
        });
    }
}

export function initialize() {
  return new Sample();
}