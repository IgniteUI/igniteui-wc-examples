import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private columns: any[] = [];
    private availableColumns = [
        { key: 'firstName', headerText: 'First Name' },
        { key: 'lastName', headerText: 'Last Name' },
        { key: 'age', headerText: 'Age', type: 'number' },
        { key: 'email', headerText: 'Email' },
        { key: 'priority', headerText: 'Priority' },
        { key: 'satisfaction', headerText: 'Satisfaction', type: 'number' }
    ];

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as any;
        const data: User[] = this.dataService.generateUsers(50);
        
        // Start with first two columns
        this.columns = [
            this.availableColumns[0],
            this.availableColumns[1]
        ];

        this.gridLite.columns = this.columns;
        this.gridLite.data = data;

        // Setup button handlers
        document.getElementById('addColumn')?.addEventListener('click', () => this.addColumn());
        document.getElementById('removeColumn')?.addEventListener('click', () => this.removeColumn());
    }

    private addColumn() {
        if (this.columns.length < this.availableColumns.length) {
            this.columns.push(this.availableColumns[this.columns.length]);
            this.gridLite.columns = [...this.columns];
        }
    }

    private removeColumn() {
        if (this.columns.length > 1) {
            this.columns.pop();
            this.gridLite.columns = [...this.columns];
        }
    }
}

new Sample();