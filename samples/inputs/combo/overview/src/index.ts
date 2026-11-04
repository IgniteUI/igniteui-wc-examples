import { defineComponents, IgcComboComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent, IgcIconComponent);

const placeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

interface City {
    id: string;
    name: string;
    country: string;
}

export class ComboOverview {
    private cities: City[] = [
        { id: 'BG01', name: 'Sofia', country: 'Country of Bulgaria' },
        { id: 'BG02', name: 'Plovdiv', country: 'Country of Bulgaria' },
        { id: 'BG03', name: 'Varna', country: 'Country of Bulgaria' },
        { id: 'BG04', name: 'Burgas', country: 'Country of Bulgaria' },
        { id: 'BG05', name: 'Pleven', country: 'Country of Bulgaria' }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        registerIconFromText('place', placeIcon, 'material');

        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <igc-combo
                class="locations"
                outlined
                label="Locations"
                placeholder="Cities"
                placeholder-search="Search cities"
                value-key="id"
                display-key="name"
                group-key="country"
                open
                .data=${this.cities}
            >
                <igc-icon slot="prefix" name="place" collection="material"></igc-icon>
            </igc-combo>
        `;

        render(template, this.root);
    }
}

new ComboOverview();
