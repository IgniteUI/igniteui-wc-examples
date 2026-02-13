import { IgcGridLite } from 'igniteui-grid-lite';
import { IgcButtonComponent } from 'igniteui-webcomponents';
import { GridLiteDataService, User } from './GridLiteDataService';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: any;
    private switchButton: IgcButtonComponent | null = null;
    private showingProducts = true;

    constructor() {
        this.dataService = new GridLiteDataService();
        this.gridLite = document.getElementById('grid-lite') as IgcGridLite<User>;
        this.switchButton = document.querySelector('igc-button');

        this.gridLite.data = this.dataService.generateProducts(50);

        window.addEventListener('error', (e) => {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                e.stopImmediatePropagation();
            }
        });

        // Setup button handlers
        this.switchButton.addEventListener('click', () => this.switchData());
    }

    private switchData() {
        this.gridLite.columns = []

        if (this.showingProducts) {
            this.gridLite.data = this.dataService.generateUsers(50);
            this.showingProducts = false;
        } else {
            this.gridLite.data = this.dataService.generateProducts(50);
            this.showingProducts = true;
        }
    }
}

export function initialize() {
  return new Sample();
}