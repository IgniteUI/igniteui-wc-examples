import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private data: User[] = [];

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as any;
        
        const columns = [
            { key: 'firstName', headerText: 'First Name' },
            { key: 'lastName', headerText: 'Last Name' },
            { key: 'age', headerText: 'Age', type: 'number' },
            { key: 'email', headerText: 'Email' },
            { key: 'priority', headerText: 'Priority' }
        ];

        this.gridLite.columns = columns;
        this.gridLite.data = this.data;

        // Setup button handlers
        document.getElementById('loadMore')?.addEventListener('click', () => this.loadMoreData());
        document.getElementById('clearData')?.addEventListener('click', () => this.clearData());

        // Load initial data
        this.loadMoreData();
    }

    private loadMoreData() {
        const newData = this.dataService.generateUsers(20);
        this.data = [...this.data, ...newData];
        this.gridLite.data = this.data;
        this.updateRecordCount();
    }

    private clearData() {
        this.data = [];
        this.gridLite.data = this.data;
        this.updateRecordCount();
    }

    private updateRecordCount() {
        const countElement = document.getElementById('recordCount');
        if (countElement) {
            countElement.textContent = `Records: ${this.data.length}`;
        }
    }
}

new Sample();