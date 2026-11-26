import { defineComponents, IgcComboComponent, IgcInputComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent);

interface SearchState {
    label: string;
    // the state that the display-only search input shows: `:hover` or `:focus-within`
    shows?: string;
    disabled?: boolean;
    // the search text of a filled search input
    text?: string;
}

export class ComboSearchInput {
    private states: SearchState[] = [
        { label: 'Idle' },
        { label: 'Idle & Hover', shows: ':hover' },
        { label: 'Disabled', disabled: true },
        { label: 'Filled', text: 'Input text' },
        { label: 'Filled & Hover', shows: ':hover', text: 'Input text' },
        { label: 'Focused', shows: ':focus-within', text: 'Input text' }
    ];

    // the display-only dropdowns stay open when the user clicks outside them
    private keepOpen = (e: Event) => e.preventDefault();

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
        this.showStates();
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
                                class="search"
                                placeholder-search="Search"
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

    // each state sheet, with the theme sheets that it was copied from
    private stateSheets = new WeakMap<CSSStyleSheet, CSSStyleSheet[]>();

    // Adds to the element a copy of the rules that its theme has for the state.
    private showStateRules(element: IgcComboComponent | IgcInputComponent, state: string, takesPart: (selector: string) => boolean) {
        const show = () => {
            const root = element.shadowRoot!;
            const themeSheets = root.adoptedStyleSheets.filter((sheet) => !this.stateSheets.has(sheet));
            const copied = root.adoptedStyleSheets.find((sheet) => this.stateSheets.has(sheet));
            const copiedFrom = copied && this.stateSheets.get(copied);
            if (copiedFrom && copiedFrom.length === themeSheets.length
                && copiedFrom.every((sheet, index) => sheet === themeSheets[index])) {
                return;
            }

            const stateSheet = new CSSStyleSheet();
            this.stateSheets.set(stateSheet, themeSheets);
            for (const sheet of themeSheets) {
                for (const rule of Array.from(sheet.cssRules)) {
                    if (rule instanceof CSSStyleRule && rule.selectorText.includes(state)
                        && !rule.selectorText.includes(`:not(${state}`) && takesPart(rule.selectorText)) {
                        stateSheet.insertRule(rule.cssText.split(state).join(`:not(${state})`), stateSheet.cssRules.length);
                    }
                }
            }
            root.adoptedStyleSheets = [...themeSheets, stateSheet];
        };

        // a theme change sets the style sheets of the new theme on the shadow root of the element, and may keep
        // the sheet copied from the previous theme, so the rules are copied again each time the style sheets
        // of the shadow root are set
        const adopted = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, 'adoptedStyleSheets')!;
        Object.defineProperty(element.shadowRoot!, 'adoptedStyleSheets', {
            configurable: true,
            get() {
                return adopted.get!.call(this);
            },
            set(sheets: CSSStyleSheet[]) {
                adopted.set!.call(this, sheets);
                queueMicrotask(show);
            },
        });
        show();
    }

    // The themes draw the hover and the focus of the search input with `:hover` and `:focus-within` rules, and a
    // display-only search input is never hovered or focused. This copies those rules of the search input, and of the combo list around it,
    // with the condition turned around, so the theme draws the state while the search input is not in it. The
    // sample adds no styles of its own.
    private async showState(combo: IgcComboComponent, state: SearchState) {
        await combo.updateComplete;
        const input = combo.renderRoot.querySelector<IgcInputComponent>('[part~="search-input"]')!;
        await input.updateComplete;

        // the search input is an input inside the combo, so its text and its disabled state are set on it
        input.value = state.text ?? '';
        input.disabled = state.disabled ?? false;

        if (state.shows) {
            // of the rules of the combo, only those for its list take part
            this.showStateRules(combo, state.shows, (selector) => selector.includes('list-wrapper'));
            this.showStateRules(input, state.shows, () => true);
        }
    }

    private showStates() {
        this.root.querySelectorAll<IgcComboComponent>('igc-combo').forEach((combo, index) => {
            this.showState(combo, this.states[index]);
        });
    }
}

new ComboSearchInput();
