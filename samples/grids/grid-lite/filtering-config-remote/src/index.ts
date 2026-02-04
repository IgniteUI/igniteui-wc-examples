import { DataPipelineConfiguration, FilterExpression, FilterOperation, IgcGridLite } from 'igniteui-grid-lite';
import { GridLiteDataService, User } from './GridLiteDataService';
import { html, render } from 'lit-html';

import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

IgcGridLite.register();

function groupBy<T extends object>(arr: T[], key: keyof T) {
    const out: Record<string, T[]> = {};
    for (const each of arr) {
        const slot = each[key] as string;
        if (!out[slot]) {
            out[slot] = [];
        }
        out[slot].push(each);
    }
    return out;
}

export class Sample {
    private dataService: GridLiteDataService;
    private gridLite: IgcGridLite | null = null;
    private codeElement: HTMLElement;
    private allData: User[] = [];

    constructor() {
        this.dataService = new GridLiteDataService();
        this.allData = this.dataService.generateUsers(100);
        this.codeElement = document.getElementById('queryString')!;

        const container = document.getElementById('grid-lite');
        
        const template = html`
          <igc-grid-lite .data=${this.allData}>
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
            ></igc-grid-lite-column>
          </igc-grid-lite>
        `;
        
        render(template, container!);
        
        // Get reference to the grid after rendering
        this.gridLite = container!.querySelector('igc-grid-lite');
        this.gridLite!.dataPipelineConfiguration = this.config;
    }

    protected config: DataPipelineConfiguration<User> = {
        filter: async ({ data, grid }) => {
            this.buildUri(grid.filterExpressions);
            await new Promise((resolve) => setTimeout(resolve, 250));
            return data;
        },
    };

    protected mapExpressions(arr: FilterExpression<User>[]) {
        return arr
            .map(({ searchTerm, criteria, condition }, idx) => {
                const c = condition as unknown as FilterOperation<User>;
                return idx < 1
                    ? `${c.name}("${searchTerm}")`
                    : `${criteria?.toUpperCase()} ${c.name}("${searchTerm}")`;
            })
            .join(' ');
    }

    protected buildUri(state: FilterExpression<User>[]) {
        const out: string[] = [];
        const qs = groupBy(state, 'key');
        for (const [key, exprs] of Object.entries(qs)) {
            out.push(`${key}(${this.mapExpressions(exprs)})`);
        }
        this.codeElement.textContent = `GET: /data?filter=${out.join('&')}`;
    }
}

new Sample();