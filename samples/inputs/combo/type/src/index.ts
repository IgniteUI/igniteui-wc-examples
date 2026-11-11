import { defineComponents, IgcComboComponent, IgcIconComponent, registerIconFromText } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcComboComponent, IgcIconComponent);

const languageIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>';

interface Option {
    id: number;
    name: string;
    group: string;
}

interface TypedCombo {
    label: string;
    outlined: boolean;
    selected: number[];
}

export class ComboType {
    private options: Option[] = [1, 2, 3, 4, 5].map((id) => ({ id, name: `Item ${id}`, group: 'Header' }));

    // each combo keeps the `id` values of its selected options
    private types: TypedCombo[] = [
        { label: 'Border Type', outlined: true, selected: [] },
        { label: 'Box Type', outlined: false, selected: [] }
    ];

    // a click outside a combo moves the focus out of it, and then its dropdown stays open, so each combo opens and closes on its own
    private keepOpenOnOutsideClick = (e: Event) => {
        if (!(e.target as HTMLElement).matches(':focus-within')) {
            e.preventDefault();
        }
    };

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        registerIconFromText('language', languageIcon, 'material');

        this.renderSample();
    }

    // `igcChange` is emitted before the selection changes, so the value is read once the combo has
    // updated; the search input of the combo emits its own `igcChange` that bubbles out of the combo,
    // so only the events of the combo itself change the selection
    private async onChange(type: TypedCombo, e: CustomEvent) {
        const combo = e.currentTarget as IgcComboComponent<Option>;

        if (e.composedPath()[0] !== combo) {
            return;
        }

        await combo.updateComplete;
        type.selected = combo.value as number[];
        this.renderSample();
    }

    private selectionTemplate(selected: number[]) {
        const names = selected.map((id) => this.options.find((option) => option.id === id)!.name);

        return html`
            <div class="selection">
                <span class="selection-title">Selection</span>
                ${names.length
                    ? names.map((name) => html`<span>${name}</span>`)
                    : html`<span class="selection-empty">No items selected</span>`}
            </div>
        `;
    }

    private renderSample() {
        const template = html`
            <div class="types">
                ${this.types.map(
                    (type) => html`
                        <div class="type">
                            <span class="type-label">${type.label}</span>
                            <igc-combo
                                ?outlined=${type.outlined}
                                label="Label"
                                placeholder="Select a value"
                                placeholder-search="Search"
                                value-key="id"
                                display-key="name"
                                group-key="group"
                                open
                                @igcClosing=${this.keepOpenOnOutsideClick}
                                @igcChange=${(e: CustomEvent) => this.onChange(type, e)}
                                .data=${this.options}
                            >
                                <igc-icon slot="prefix" name="language" collection="material"></igc-icon>
                            </igc-combo>
                            ${this.selectionTemplate(type.selected)}
                        </div>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboType();
