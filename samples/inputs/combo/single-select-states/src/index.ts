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

interface ComboState {
    label: string;
    className?: string;
    value: string[];
    open?: boolean;
}

export class ComboSingleSelectStates {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' }
    ];

    // hover and focus come from the pointer and the keyboard, so the `hover` and `focused`
    // classes show them on the display-only combos
    private states: ComboState[] = [
        { label: 'Idle', value: [] },
        { label: 'Idle & Hover', className: 'hover', value: [] },
        { label: 'Filled', value: ['BY'] },
        { label: 'Filled & Hover', className: 'hover', value: ['BY'] },
        { label: 'Focused', className: 'focused', value: ['BY'] },
        { label: 'Focused (Dropdown On)', className: 'focused', value: ['BY'], open: true }
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
            <div class="states" inert>
                ${this.states.map(
                    (state) => html`
                        <div class="state">
                            <span class="state-label">${state.label}</span>
                            <igc-combo
                                class="state-combo ${state.className ?? ''}"
                                single-select
                                outlined
                                placeholder="Country"
                                value-key="id"
                                display-key="name"
                                group-key="region"
                                ?open=${state.open}
                                @igcClosing=${this.keepOpen}
                                .data=${this.countries}
                                .value=${state.value}
                            ></igc-combo>
                        </div>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboSingleSelectStates();
