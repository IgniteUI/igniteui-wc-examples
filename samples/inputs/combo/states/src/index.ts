import { defineComponents, IgcComboComponent, IgcInputComponent } from 'igniteui-webcomponents';
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
    // the state that the display-only combo shows: `:hover` or `:focus-within`
    shows?: string;
    value: string[];
    open?: boolean;
}

export class ComboStates {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' }
    ];

    private states: ComboState[] = [
        { label: 'Idle', value: [] },
        { label: 'Idle & Hover', shows: ':hover', value: [] },
        { label: 'Filled', value: ['BY', 'BE'] },
        { label: 'Filled & Hover', shows: ':hover', value: ['BY', 'BE'] },
        { label: 'Focused', shows: ':focus-within', value: ['BY', 'BE'] },
        { label: 'Focused (Dropdown On)', shows: ':focus-within', value: ['BY', 'BE'], open: true }
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
        // the combos are display-only, so inert blocks pointer and keyboard interaction
        const template = html`
            <div class="states" inert>
                ${this.states.map(
                    (state) => html`
                        <div class="state">
                            <span class="state-label">${state.label}</span>
                            <igc-combo
                                class="state-combo"
                                outlined
                                placeholder="Country"
                                placeholder-search="Search"
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

    private stateSheets = new WeakSet<CSSStyleSheet>();

    // The themes draw the hover and the focus of the combo with `:hover` and `:focus-within` rules, and a
    // display-only combo is never hovered or focused. This copies those rules of the combo and of its input
    // with the condition turned around, so the theme draws the state while the combo is not in it. The
    // sample adds no styles of its own.
    private async showState(combo: IgcComboComponent, state: string) {
        await combo.updateComplete;
        const input = combo.renderRoot.querySelector<IgcInputComponent>('igc-input')!;
        await input.updateComplete;

        for (const root of [combo.shadowRoot!, input.shadowRoot!]) {
            const themeSheets = root.adoptedStyleSheets.filter((sheet) => !this.stateSheets.has(sheet));
            const stateSheet = new CSSStyleSheet();
            this.stateSheets.add(stateSheet);

            for (const sheet of themeSheets) {
                for (const rule of sheet.cssRules) {
                    // the rules for the state of the search input in the list are left out
                    if (rule instanceof CSSStyleRule && rule.selectorText.includes(state)
                        && !rule.selectorText.includes(`:not(${state}`)
                        && !rule.selectorText.includes('list-wrapper')) {
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

new ComboStates();
