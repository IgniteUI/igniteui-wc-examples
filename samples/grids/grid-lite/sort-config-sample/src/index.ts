import { IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

export class Sample {
    private dataService: GridLiteDataService;

    constructor() {
        this.dataService = new GridLiteDataService();
        const data: User[] = this.dataService.generateUsers(50);
        
        const container = document.getElementById('grid-lite');
        
        const template = html`
          <igc-grid-lite .data=${data}>
            <igc-grid-lite-column 
              field="firstName" 
              header="First name" 
              sortable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="lastName" 
              header="Last name" 
              sortable
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="age" 
              header="Age" 
              sortable
              data-type="number"
            ></igc-grid-lite-column>
            <igc-grid-lite-column 
              field="email" 
              header="Email"
              sortable
            ></igc-grid-lite-column>
          </igc-grid-lite>
        `;
        
        render(template, container!);
    }
}

new Sample();