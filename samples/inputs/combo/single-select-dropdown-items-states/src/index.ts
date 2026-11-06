import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface Option {
    id: number;
    name: string;
}

interface ItemState {
    label: string;
    className?: string;
}

interface ItemRow {
    label: string;
    value: number[];
    states: ItemState[];
}

export class ComboSingleSelectDropdownItemsStates {
    private options: Option[] = [{ id: 1, name: 'Item' }];

    // hover, focus, and disabled come from the pointer, the keyboard, and the data, so the
    // `hover`, `focus`, and `disabled` classes show them on the display-only items
    private states: ItemState[] = [
        { label: 'Idle' },
        { label: 'Hover', className: 'hover' },
        { label: 'Focus', className: 'focus' },
        { label: 'Disabled', className: 'disabled' }
    ];

    private rows: ItemRow[] = [
        { label: 'Unselected', value: [], states: this.states },
        { label: 'Selected', value: [1], states: this.states.slice(0, 3) }
    ];

    // the input fields are hidden, so the dropdowns stay open
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        // the items are display-only, so inert blocks keyboard interaction
        const template = html`
            <div class="items" inert>
                <span></span>
                ${this.states.map((state) => html`<span class="state-label state-column">${state.label}</span>`)}
                ${this.rows.map(
                    (row) => html`
                        <span class="state-label">${row.label}</span>
                        ${row.states.map(
                            (state) => html`
                                <igc-combo
                                    class="dropdown ${state.className ?? ''}"
                                    single-select
                                    value-key="id"
                                    display-key="name"
                                    open
                                    @igcClosing=${this.keepOpen}
                                    .data=${this.options}
                                    .value=${row.value}
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

new ComboSingleSelectDropdownItemsStates();
