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

export class ComboSize {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' }
    ];

    private sizes = [
        { label: 'Small', className: 'small' },
        { label: 'Medium', className: 'medium' },
        { label: 'Large', className: 'large' }
    ];

    private types = [
        { label: 'Border Type', outlined: true, className: 'border-type' },
        { label: 'Box Type', outlined: false, className: 'box-type' }
    ];

    // the `id` values of the selected countries, kept for each combo
    private selected: Record<string, string[]> = {};

    // a click outside a combo moves the focus out of it, and then its dropdown stays open, so each combo opens and closes on its own
    private keepOpenOnOutsideClick = (e: Event) => {
        if (!(e.target as HTMLElement).matches(':focus-within')) {
            e.preventDefault();
        }
    };

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    // `igcChange` is emitted before the selection changes, so the value is read once the combo has
    // updated; the search input of the combo emits its own `igcChange` that bubbles out of the combo,
    // so only the events of the combo itself change the selection
    private async onChange(key: string, e: CustomEvent) {
        const combo = e.currentTarget as IgcComboComponent<Country>;

        if (e.composedPath()[0] !== combo) {
            return;
        }

        await combo.updateComplete;
        this.selected[key] = combo.value as string[];
        this.renderSample();
    }

    private selectionTemplate(selected: string[] = []) {
        const names = selected.map((id) => this.countries.find((country) => country.id === id)!.name);

        return html`
            <div class="selection">
                <span class="selection-title">Selection</span>
                ${names.length
                    ? names.map((name) => html`<span>${name}</span>`)
                    : html`<span class="selection-empty">No items selected</span>`}
            </div>
        `;
    }

    private renderSample() {
        const template = html`
            <div class="sizes">
                <span class="type-label"></span>
                ${this.sizes.map((size) => html`<span class="state-label state-column">${size.label}</span>`)}
                ${this.types.map(
                    (type) => html`
                        <span class="state-label type-label ${type.className}">${type.label}</span>
                        ${this.sizes.map((size) => {
                            const key = `${type.label} ${size.label}`;

                            return html`
                                <div class="${size.className} ${type.className}">
                                    <igc-combo
                                        ?outlined=${type.outlined}
                                        placeholder="Country"
                                        placeholder-search="Search"
                                        value-key="id"
                                        display-key="name"
                                        group-key="region"
                                        open
                                        @igcClosing=${this.keepOpenOnOutsideClick}
                                        @igcChange=${(e: CustomEvent) => this.onChange(key, e)}
                                        .data=${this.countries}
                                    ></igc-combo>
                                    ${this.selectionTemplate(this.selected[key])}
                                </div>
                            `;
                        })}
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboSize();
