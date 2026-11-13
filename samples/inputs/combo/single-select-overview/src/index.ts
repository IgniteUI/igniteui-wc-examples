import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface Country {
    id: string;
    name: string;
    region: string;
}

export class ComboSingleSelectOverview {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' },
        { id: 'HR', name: 'Croatia', region: 'Europe' },
        { id: 'CZ', name: 'Czechia', region: 'Europe' },
        { id: 'DK', name: 'Denmark', region: 'Europe' }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <igc-combo
                class="country"
                single-select
                outlined
                label="Country"
                placeholder="Select a country"
                value-key="id"
                display-key="name"
                group-key="region"
                open
                .data=${this.countries}
            ></igc-combo>
        `;

        render(template, this.root);
    }
}

new ComboSingleSelectOverview();
