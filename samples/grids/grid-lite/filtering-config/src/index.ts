import { IgcGridLite } from 'igniteui-grid-lite';
import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(IgcCheckboxComponent);

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
                filter: true 
            },
            { 
                key: 'lastName', 
                headerText: 'Last name', 
                filter: true 
            },
            { 
                key: 'age', 
                headerText: 'Age', 
                filter: true, 
                type: 'number' 
            },
            {
                key: 'active',
                headerText: 'Active',
                type: 'boolean',
                filter: true,
                cellTemplate: (params: any) => {
                    const checkbox = document.createElement('igc-checkbox');
                    if (params.value) {
                        checkbox.setAttribute('checked', '');
                    }
                    return checkbox;
                }
            }
        ];

        gridLite.columns = columns;
        gridLite.data = data;
    }
}

export function initialize() {
  return new Sample();
}