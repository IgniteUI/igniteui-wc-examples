import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;

    constructor() {
        this.dataService = new GridLiteDataService();
        const gridLite = document.getElementById('grid-lite') as any;
        const data: User[] = this.dataService.generateUsers(50);
        
        const columns = [
            { 
                key: 'firstName', 
                headerText: 'First name', 
                sort: true 
            },
            { 
                key: 'lastName', 
                headerText: 'Last name', 
                sort: true 
            },
            { 
                key: 'age', 
                headerText: 'Age', 
                sort: true, 
                type: 'number' 
            },
            { 
                key: 'email', 
                headerText: 'Email',
                sort: true
            }
        ];

        gridLite.columns = columns;
        gridLite.data = data;
    }
}

new Sample();