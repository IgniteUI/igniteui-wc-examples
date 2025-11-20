import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private allData: User[] = [];

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as any;
        this.allData = this.dataService.generateUsers(100);
        
        const columns = [
            { key: 'firstName', headerText: 'First name', filter: true },
            { key: 'lastName', headerText: 'Last name', filter: true },
            { key: 'age', headerText: 'Age', filter: true, type: 'number' },
            { key: 'email', headerText: 'Email' }
        ];

        this.gridLite.columns = columns;
        this.gridLite.data = this.allData;

        // Setup button handlers
        document.getElementById('filterAdults')?.addEventListener('click', () => this.filterAdults());
        document.getElementById('filterSeniors')?.addEventListener('click', () => this.filterSeniors());
        document.getElementById('clearFilters')?.addEventListener('click', () => this.clearFilters());
    }

    private filterAdults() {
        const filtered = this.allData.filter(user => user.age >= 18);
        this.gridLite.data = filtered;
    }

    private filterSeniors() {
        const filtered = this.allData.filter(user => user.age >= 65);
        this.gridLite.data = filtered;
    }

    private clearFilters() {
        this.gridLite.data = this.allData;
    }
}

new Sample();