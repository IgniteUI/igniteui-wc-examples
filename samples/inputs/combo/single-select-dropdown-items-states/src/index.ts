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
    // the state that the display-only item shows: `:hover`, or the `active` or `disabled` attribute
    shows?: string;
}

// the item element of the combo list: it updates itself and takes controllers, as the combo does
type ComboItem = HTMLElement & {
    updateComplete: Promise<boolean>;
    addController(controller: { hostUpdated(): void }): void;
};

interface ItemRow {
    label: string;
    value: number[];
    states: ItemState[];
}

export class ComboSingleSelectDropdownItemsStates {
    private options: Option[] = [{ id: 1, name: 'Item' }];

    // an item that has the keyboard focus is the active item of the list
    private states: ItemState[] = [
        { label: 'Idle' },
        { label: 'Hover', shows: ':hover' },
        { label: 'Focus', shows: '[active]' },
        { label: 'Disabled', shows: '[disabled]' }
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
        this.showStates();
    }

    private renderSample() {
        // the items are display-only, so inert blocks pointer and keyboard interaction
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
                                    class="dropdown"
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

    // each state sheet, with the theme sheets that it was copied from
    private stateSheets = new WeakMap<CSSStyleSheet, CSSStyleSheet[]>();

    // the list renders its item after the combo itself, so the list is watched until the item is there
    private itemOf(combo: IgcComboComponent) {
        return new Promise<ComboItem>((resolve) => {
            const item = combo.renderRoot.querySelector<ComboItem>('igc-combo-item');
            if (item) {
                resolve(item);
                return;
            }

            const observer = new MutationObserver(() => {
                const rendered = combo.renderRoot.querySelector<ComboItem>('igc-combo-item');
                if (rendered) {
                    observer.disconnect();
                    resolve(rendered);
                }
            });
            observer.observe(combo.renderRoot, { childList: true, subtree: true });
        });
    }

    // The themes draw the hover of an item with `:hover` rules, and its focus and its disabled state with
    // rules for the `active` and the `disabled` attribute, and a display-only item is in none of these
    // states. This copies those rules of the item with the condition turned around, so the theme draws
    // the state while the item is not in it. The sample adds no styles of its own.
    private async showState(combo: IgcComboComponent, state: string) {
        await combo.updateComplete;
        const item = await this.itemOf(combo);
        await item.updateComplete;

        const show = () => {
            const root = item.shadowRoot!;
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
                        && !rule.selectorText.includes(`:not(${state}`)) {
                        stateSheet.insertRule(rule.cssText.split(state).join(`:not(${state})`), stateSheet.cssRules.length);
                    }
                }
            }
            root.adoptedStyleSheets = [...themeSheets, stateSheet];
        };

        // a theme change sets the style sheets of the new theme on the shadow root of the item, and may keep
        // the sheet copied from the previous theme, so the rules are copied again each time the style sheets
        // of the shadow root are set
        const adopted = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, 'adoptedStyleSheets')!;
        Object.defineProperty(item.shadowRoot!, 'adoptedStyleSheets', {
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

    private showStates() {
        const states = this.rows.flatMap((row) => row.states);

        this.root.querySelectorAll<IgcComboComponent>('igc-combo').forEach((combo, index) => {
            const state = states[index].shows;
            if (state) {
                this.showState(combo, state);
            }
        });
    }
}

new ComboSingleSelectDropdownItemsStates();
