import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface Option {
    id: number;
    name: string;
    group: string;
}

export class ComboDropdownSize {
    private options: Option[] = [1, 2, 3].map((id) => ({ id, name: 'Item', group: 'Header' }));

    private sizes = [
        { label: 'Small', className: 'small' },
        { label: 'Medium', className: 'medium' },
        { label: 'Large', className: 'large' }
    ];

    // the display-only dropdowns stay open when the user clicks outside them
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        // the dropdowns are display-only, so inert blocks pointer and keyboard interaction
        const template = html`
            <div class="sizes" inert>
                ${this.sizes.map(
                    (size) => html`
                        <div class="size">
                            <span class="state-label">${size.label}</span>
                            <igc-combo
                                class="dropdown ${size.className}"
                                placeholder-search="Search"
                                value-key="id"
                                display-key="name"
                                group-key="group"
                                open
                                @igcClosing=${this.keepOpen}
                                .data=${this.options}
                            ></igc-combo>
                        </div>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboDropdownSize();
