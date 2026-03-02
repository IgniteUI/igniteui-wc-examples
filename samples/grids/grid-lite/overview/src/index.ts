import { IgcGridLite } from 'igniteui-grid-lite';
import { 
  defineComponents,
  IgcRatingComponent,
  IgcCheckboxComponent,
  IgcSelectComponent,
  IgcAvatarComponent
} from 'igniteui-webcomponents';
import { GridLiteDataService, User } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();
defineComponents(
  IgcAvatarComponent,
  IgcRatingComponent,
  IgcCheckboxComponent,
  IgcSelectComponent
);

export class Sample {
  private dataService: GridLiteDataService;
  private choices = ['Low', 'Standard', 'High'];

  constructor() {
    this.dataService = new GridLiteDataService();
    
    const data: User[] = this.dataService.generateUsers(1000);
    
    const container = document.getElementById('grid-lite');
    
    const template = html`
      <igc-grid-lite .data=${data}>
        <igc-grid-lite-column 
          field="avatar" 
          header="Avatar"
          .cellTemplate=${(params: any) => html`<igc-avatar shape="circle" alt="User avatar" src=${params.value}></igc-avatar>`}
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="firstName" 
          header="First name" 
          sortable
          filterable
          resizable
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="lastName" 
          header="Last name" 
          sortable
          filterable
          resizable
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="email" 
          header="Email Address"
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="priority" 
          header="Priority" 
          width="12rem"
          sortable
          sorting-case-sensitive
          .sortConfiguration=${{ comparer: (a: string, b: string) => this.choices.indexOf(a) - this.choices.indexOf(b) }}
          .cellTemplate=${(params: any) => html`
            <igc-select outlined flip value=${params.value}>
              ${this.choices.map(choice => html`<igc-select-item value=${choice}>${choice}</igc-select-item>`)}
            </igc-select>
          `}
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="satisfaction" 
          header="Satisfaction rating" 
          data-type="number"
          sortable
          filterable
          .cellTemplate=${(params: any) => html`<igc-rating readonly value=${params.value}></igc-rating>`}
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="registeredAt" 
          header="Registered @" 
          sortable
          .cellTemplate=${(params: any) => html`<span>${params.value.toLocaleString()}</span>`}
        ></igc-grid-lite-column>
        <igc-grid-lite-column 
          field="active" 
          header="Active" 
          data-type="boolean"
          .cellTemplate=${(params: any) => html`<igc-checkbox ?checked=${params.value}></igc-checkbox>`}
        ></igc-grid-lite-column>
      </igc-grid-lite>
    `;
    
    render(template, container!);
  }
}

new Sample();