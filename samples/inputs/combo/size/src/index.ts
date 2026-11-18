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

    // the display-only dropdowns stay open when the user clicks outside them
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        // the combos are display-only, so inert blocks pointer and keyboard interaction
        const template = html`
            <div class="sizes" inert>
                <span class="type-label"></span>
                ${this.sizes.map((size) => html`<span class="state-label state-column">${size.label}</span>`)}
                ${this.types.map(
                    (type) => html`
                        <span class="state-label type-label ${type.className}">${type.label}</span>
                        ${this.sizes.map(
                            (size) => html`
                                <div class="${size.className} ${type.className}">
                                    <igc-combo
                                        ?outlined=${type.outlined}
                                        placeholder="Country"
                                        placeholder-search="Search"
                                        value-key="id"
                                        display-key="name"
                                        group-key="region"
                                        open
                                        @igcClosing=${this.keepOpen}
                                        .data=${this.countries}
                                    ></igc-combo>
                                </div>
                            `
                        )}
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboSize();
