import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private log: string[] = [];
    private logElement: HTMLElement;

    get time() {
        return `[${new Date().toLocaleTimeString()}]`;
    }

    constructor() {
        this.dataService = new GridLiteDataService();
        this.logElement = document.getElementById('log')!;
        
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
        gridLite.addEventListener('filtering', (e: any) => {
            const { expressions, type } = e.detail;
            this.updateLog(`${this.time} :: Event \`${e.type}\` :: Filter operation of type '${type}' for column '${expressions[0].key}'`);
        });
        gridLite.addEventListener('filtered', (e: any) => {
            this.updateLog( `${this.time} :: Event \`${e.type}\` for column '${e.detail.key}'`);
        });
    }

    private updateLog(message: string) {
        if (this.log.length > 10) {
            this.log.shift();
        }
        this.log.push(message);
        this.renderLog();
    }

    private renderLog() {
        this.logElement.innerHTML = this.log
            .map(entry => `<p><code>${entry}</code></p>`)
            .join('');
        this.logElement.scrollTop = this.logElement.scrollHeight;
    }
}

new Sample();