import { defineComponents, IgcComboComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface SearchState {
    label: string;
    className?: string;
    text?: string;
}

export class ComboSearchInput {
    // the search input states come from the pointer and the keyboard, so the `hover`,
    // `disabled`, `filled` and `focused` classes show them on the display-only combos
    private states: SearchState[] = [
        { label: 'Idle' },
        { label: 'Idle & Hover', className: 'hover' },
        { label: 'Disabled', className: 'disabled' },
        { label: 'Filled', className: 'filled', text: 'Input text' },
        { label: 'Filled & Hover', className: 'filled hover', text: 'Input text' },
        { label: 'Focused', className: 'filled focused', text: 'Input text' }
    ];

    // the display-only dropdowns stay open when the user clicks outside them
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        // the search inputs are display-only, so inert blocks keyboard interaction
        const template = html`
            <div class="states" inert>
                ${this.states.map(
                    (state) => html`
                        <div class="state">
                            <span class="state-label">${state.label}</span>
                            <igc-combo
                                class="search ${state.className ?? ''}"
                                placeholder-search=${state.text ?? 'Search'}
                                open
                                @igcClosing=${this.keepOpen}
                                .data=${[]}
                            ></igc-combo>
                        </div>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboSearchInput();
