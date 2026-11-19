import 'igniteui-webcomponents-grids/grids/combined';
import type { IgcHierarchicalGridComponent, IgcRowIslandComponent } from 'igniteui-webcomponents-grids/grids';
import 'igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';

const northwindUrl = 'https://data-northwind.indigo.design';

interface Customer {
    customerId: string;
    companyName: string;
    contactName: string;
    address: { country: string };
}

interface CustomerPage {
    items: Customer[];
    totalRecordsCount: number;
}

interface Order {
    orderId: number;
    shipAddress: { city: string };
}

async function fetchData<T>(path: string): Promise<T> {
    const response = await fetch(`${northwindUrl}/${path}`);
    if (!response.ok) {
        throw new Error(`Northwind request failed (${response.status}): ${response.url}`);
    }
    return response.json();
}

export class Sample {
    private readonly grid = document.getElementById('grid') as IgcHierarchicalGridComponent;
    private readonly pageSize = 20;
    private readonly cache: Customer[] = [];
    private nextPage = 0;
    private totalRecords = Infinity;
    private loading = false;

    constructor() {
        const orders = document.getElementById('orders') as IgcRowIslandComponent;
        orders.addEventListener('gridCreated', async ({ detail: { grid, parentID } }) => {
            grid.isLoading = true;
            try {
                grid.data = await fetchData<Order[]>(`Customers/${encodeURIComponent(parentID)}/Orders`);
            } catch (error) {
                console.error('Unable to load customer orders.', error);
            } finally {
                grid.isLoading = false;
                grid.markForCheck();
            }
        });

        this.grid.addEventListener('dataPreLoad', ({ detail }) => {
            const end = (detail.startIndex ?? 0) + (detail.chunkSize ?? 0);
            if (end >= this.cache.length) {
                void this.loadNextPage();
            }
        });

        void this.loadNextPage();
    }

    private async loadNextPage(): Promise<void> {
        if (this.loading || this.cache.length >= this.totalRecords) return;
        this.loading = true;
        this.grid.isLoading = true;
        try {
            const page = await fetchData<CustomerPage>(
                `Customers/GetCustomersWithPage?pageIndex=${this.nextPage}&size=${this.pageSize}`,
            );
            if (!page.items.length && this.cache.length < page.totalRecordsCount) {
                throw new Error(`Northwind returned an empty customer page at index ${this.nextPage}.`);
            }
            this.totalRecords = page.totalRecordsCount;
            this.nextPage++;
            this.cache.push(...page.items);
            // Let the grid virtualize the loaded rows, including expanded child rows.
            this.grid.data = [...this.cache];
        } catch (error) {
            console.error('Unable to load customer rows.', error);
        } finally {
            this.loading = false;
            this.grid.isLoading = false;
        }
    }
}

new Sample();
