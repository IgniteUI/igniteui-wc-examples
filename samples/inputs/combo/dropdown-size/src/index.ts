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

interface SizedDropdown {
    label: string;
    className: string;
    selected: number[];
}

export class ComboDropdownSize {
    private options: Option[] = [1, 2, 3].map((id) => ({ id, name: 'Item', group: 'Header' }));

    // each dropdown keeps the `id` values of its selected options
    private sizes: SizedDropdown[] = [
        { label: 'Small', className: 'small', selected: [] },
        { label: 'Medium', className: 'medium', selected: [] },
        { label: 'Large', className: 'large', selected: [] }
    ];

    // the input fields are hidden, so the dropdowns stay open and each one works on its own
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    // `igcChange` is emitted before the selection changes, so the value is read once the combo has
    // updated; the search input of the combo emits its own `igcChange` that bubbles out of the combo,
    // so only the events of the combo itself change the selection
    private async onChange(size: SizedDropdown, e: CustomEvent) {
        const combo = e.currentTarget as IgcComboComponent<Option>;

        if (e.composedPath()[0] !== combo) {
            return;
        }

        await combo.updateComplete;
        size.selected = combo.value as number[];
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="sizes">
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
                                @igcChange=${(e: CustomEvent) => this.onChange(size, e)}
                                .data=${this.options}
                            ></igc-combo>
                            <div class="selection">
                                <span class="selection-title">Selection</span>
                                ${size.selected.length
                                    ? size.selected.map(
                                          (id) => html`<span>${this.options.find((option) => option.id === id)!.name}</span>`
                                      )
                                    : html`<span>No items selected</span>`}
                            </div>
                        </div>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboDropdownSize();
