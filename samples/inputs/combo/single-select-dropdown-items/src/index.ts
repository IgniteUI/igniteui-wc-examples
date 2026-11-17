import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface Option {
    id: number;
    name: string;
    group?: string;
}

interface ItemRow {
    label: string;
    className: string;
    groupKey?: string;
    data: Option[];
}

export class ComboSingleSelectDropdownItems {
    private sizes = [
        { label: 'Small', className: 'small' },
        { label: 'Medium', className: 'medium' },
        { label: 'Large', className: 'large' }
    ];

    // the header row hides its option, so only the group header shows
    private rows: ItemRow[] = [
        { label: 'Header', className: 'header-only', groupKey: 'group', data: [{ id: 1, name: 'Item', group: 'Header' }] },
        { label: 'Item', className: 'item-only', data: [{ id: 1, name: 'Item' }] }
    ];

    // the input fields are hidden, so the dropdowns stay open and each one works on its own
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="items">
                <span></span>
                ${this.sizes.map((size) => html`<span class="state-label state-column">${size.label}</span>`)}
                ${this.rows.map(
                    (row) => html`
                        <span class="state-label">${row.label}</span>
                        ${this.sizes.map(
                            (size) => html`
                                <igc-combo
                                    class="dropdown ${row.className} ${size.className}"
                                    single-select
                                    value-key="id"
                                    display-key="name"
                                    group-key=${ifDefined(row.groupKey)}
                                    open
                                    @igcClosing=${this.keepOpen}
                                    .data=${row.data}
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

new ComboSingleSelectDropdownItems();
