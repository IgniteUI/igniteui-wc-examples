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

    // the `id` values of the selected countries
    private selected = ['BY'];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    // `igcChange` is emitted before the selection changes, so the value is read once the combo has
    // updated; the search input of the combo emits its own `igcChange` that bubbles out of the combo,
    // so only the events of the combo itself change the selection
    private onChange = async (e: CustomEvent) => {
        const combo = e.currentTarget as IgcComboComponent<Country>;

        if (e.composedPath()[0] !== combo) {
            return;
        }

        await combo.updateComplete;
        this.selected = combo.value as string[];
        this.renderSample();
    };

    private renderSample() {
        const names = this.selected.map((id) => this.countries.find((country) => country.id === id)!.name);

        const template = html`
            <div>
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
                    .value=${this.selected}
                    @igcChange=${this.onChange}
                ></igc-combo>
                <div class="selection">
                    <span class="selection-title">Selection</span>
                    ${names.length
                        ? names.map((name) => html`<span>${name}</span>`)
                        : html`<span class="selection-empty">No items selected</span>`}
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new ComboStyling();
