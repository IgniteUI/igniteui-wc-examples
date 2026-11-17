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
        { label: 'Border Type', outlined: true },
        { label: 'Box Type', outlined: false }
    ];

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

    private renderSample() {
        const template = html`
            <div class="sizes">
                <span></span>
                ${this.sizes.map((size) => html`<span class="state-label state-column">${size.label}</span>`)}
                ${this.types.map(
                    (type) => html`
                        <span class="state-label type-label">${type.label}</span>
                        ${this.sizes.map(
                            (size) => html`
                                <igc-combo
                                    class=${size.className}
                                    ?outlined=${type.outlined}
                                    placeholder="Country"
                                    placeholder-search="Search"
                                    value-key="id"
                                    display-key="name"
                                    group-key="region"
                                    open
                                    @igcClosing=${this.keepOpenOnOutsideClick}
                                    .data=${this.countries}
                                ></igc-combo>
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
