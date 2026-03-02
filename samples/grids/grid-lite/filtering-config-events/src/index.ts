import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private log: string[] = [];
    private logElement: HTMLElement;
    private gridLite: IgcGridLite | null = null;

    get time() {
        return `[${new Date().toLocaleTimeString()}]`;
    }

    constructor() {
        this.dataService = new GridLiteDataService();
        this.logElement = document.getElementById('log')!;
        
        const data: User[] = this.dataService.generateUsers(50);
        
        const container = document.getElementById('grid-lite');
        
        const template = html`
          <igc-grid-lite .data=${data}>
            <igc-grid-lite-column 
              field="firstName" 
              header="First name" 
              filterable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="lastName" 
              header="Last name" 
              filterable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="age" 
              header="Age" 
              filterable
              data-type="number"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="email" 
              header="Email" 
              filterable
            ></igc-grid-lite-column>
          </igc-grid-lite>
        `;
        
        render(template, container!);
        
        // Get reference to the grid after rendering
        this.gridLite = container!.querySelector('igc-grid-lite');
        
        // Listen to filter events
        this.gridLite!.addEventListener('filtering', (e: any) => {
            const { expressions, type } = e.detail;
            this.updateLog(`${this.time} :: Event \`${e.type}\` :: Filter operation of type '${type}' for column '${expressions[0].key}'`);
        });
        this.gridLite!.addEventListener('filtered', (e: any) => {
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