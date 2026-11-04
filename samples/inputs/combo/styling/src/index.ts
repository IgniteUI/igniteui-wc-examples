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

export class ComboStyling {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <igc-combo
                class="styled-combo"
                outlined
                placeholder="Country"
                placeholder-search="Search"
                value-key="id"
                display-key="name"
                group-key="region"
                open
                .data=${this.countries}
                .value=${['BY']}
            ></igc-combo>
        `;

        render(template, this.root);
    }
}

new ComboStyling();
