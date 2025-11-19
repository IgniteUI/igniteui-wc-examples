import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private eventLog: HTMLElement;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.eventLog = document.getElementById('eventLog')!;
        
        const gridLite = document.getElementById('grid-lite') as any;
        const data: User[] = this.dataService.generateUsers(50);
        
        const columns = [
            { key: 'firstName', headerText: 'First name', filter: true },
            { key: 'lastName', headerText: 'Last name', filter: true },
            { key: 'age', headerText: 'Age', filter: true, type: 'number' },
            { key: 'email', headerText: 'Email', filter: true }
        ];

        gridLite.columns = columns;
        gridLite.data = data;

        // Listen to filter events
        gridLite.addEventListener('filterChanged', (e: any) => {
            this.logEvent(`Filter changed: ${JSON.stringify(e.detail)}`);
        });
    }

    private logEvent(message: string) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        this.eventLog.insertBefore(logEntry, this.eventLog.firstChild);
        
        // Keep only last 10 entries
        while (this.eventLog.children.length > 10) {
            this.eventLog.removeChild(this.eventLog.lastChild!);
        }
    }
}

new Sample();