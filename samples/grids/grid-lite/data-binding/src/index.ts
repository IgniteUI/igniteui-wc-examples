import { IgcGridLite } from 'igniteui-grid-lite';
import { IgcButtonComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, User } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: IgcGridLite | null = null;
    private switchButton: IgcButtonComponent | null = null;
    private showingProducts = true;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.switchButton = document.querySelector('igc-button');
        
        const container = document.getElementById('grid-lite');
        
        const template = html`<igc-grid-lite auto-generate .data=${this.dataService.generateProducts(50)}></igc-grid-lite>`;
        
        render(template, container!);
        
        this.gridLite = container!.querySelector('igc-grid-lite');

        window.addEventListener('error', (e) => {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                e.stopImmediatePropagation();
            }
        });

        // Setup button handlers
        this.switchButton!.addEventListener('click', () => this.switchData());
    }

    private switchData() {
        const container = document.getElementById('grid-lite');

        if (this.showingProducts) {
            const template = html`<igc-grid-lite auto-generate .data=${this.dataService.generateUsers(50)}></igc-grid-lite>`;
            render(template, container!);
            this.showingProducts = false;
        } else {
            const template = html`<igc-grid-lite auto-generate .data=${this.dataService.generateProducts(50)}></igc-grid-lite>`;
            render(template, container!);
            this.showingProducts = true;
        }
        
        this.gridLite = container!.querySelector('igc-grid-lite');
    }
}

new Sample();