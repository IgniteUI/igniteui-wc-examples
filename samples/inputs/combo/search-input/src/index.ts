import { defineComponents, IgcComboComponent, IgcInputComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface SearchState {
    label: string;
    className?: string;
    // the state that the display-only search input shows: `:hover` or `:focus-within`
    shows?: string;
    text?: string;
}

export class ComboSearchInput {
    // the search input has no disabled or filled state of its own to set, so the `disabled` and
    // `filled` classes draw them
    private states: SearchState[] = [
        { label: 'Idle' },
        { label: 'Idle & Hover', shows: ':hover' },
        { label: 'Disabled', className: 'disabled' },
        { label: 'Filled', className: 'filled', text: 'Input text' },
        { label: 'Filled & Hover', className: 'filled', shows: ':hover', text: 'Input text' },
        { label: 'Focused', className: 'filled', shows: ':focus-within', text: 'Input text' }
    ];

    // the display-only dropdowns stay open when the user clicks outside them
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
        this.showStates();
        // a theme change gives the combos the style sheets of the new theme, so the states are shown again
        window.addEventListener('igc-change-theme', () => this.showStates());
    }

    private renderSample() {
        // the search inputs are display-only, so inert blocks pointer and keyboard interaction
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

    private stateSheets = new WeakSet<CSSStyleSheet>();

    // The themes draw the hover and the focus of the search input with `:hover` and `:focus-within` rules,
    // and a display-only search input is never hovered or focused. This copies those rules of the search
    // input, and of the combo list around it, with the condition turned around, so the theme draws the
    // state while the search input is not in it. The sample adds no styles of its own.
    private async showState(combo: IgcComboComponent, state: string) {
        await combo.updateComplete;
        const input = combo.renderRoot.querySelector<IgcInputComponent>('[part~="search-input"]')!;
        await input.updateComplete;

        for (const root of [combo.shadowRoot!, input.shadowRoot!]) {
            const themeSheets = root.adoptedStyleSheets.filter((sheet) => !this.stateSheets.has(sheet));
            const stateSheet = new CSSStyleSheet();
            this.stateSheets.add(stateSheet);

            for (const sheet of themeSheets) {
                for (const rule of sheet.cssRules) {
                    // of the rules of the combo, only those for its list take part
                    if (rule instanceof CSSStyleRule && rule.selectorText.includes(state)
                        && !rule.selectorText.includes(`:not(${state}`)
                        && (root === input.shadowRoot || rule.selectorText.includes('list-wrapper'))) {
                        stateSheet.insertRule(rule.cssText.split(state).join(`:not(${state})`), stateSheet.cssRules.length);
                    }
                }
            }
            root.adoptedStyleSheets = [...themeSheets, stateSheet];
        }
    }

    private showStates() {
        this.root.querySelectorAll<IgcComboComponent>('igc-combo').forEach((combo, index) => {
            const state = this.states[index].shows;
            if (state) {
                this.showState(combo, state);
            }
        });
    }
}

new ComboSearchInput();
