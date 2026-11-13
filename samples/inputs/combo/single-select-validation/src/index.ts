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

interface ValidationState {
    label: string;
    className: string;
    invalid?: boolean;
    helperText?: string;
}

export class ComboSingleSelectValidation {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' }
    ];

    // the combo has a built-in invalid state and no success or warn state: the `success` class draws
    // the success state, and the warn combo is an invalid combo that the `warn` class gives the warning color
    private states: ValidationState[] = [
        { label: 'Success', className: 'success' },
        { label: 'Warn', className: 'warn', invalid: true, helperText: 'Additional fees might be included' },
        { label: 'Error', className: 'error', invalid: true, helperText: 'Please select a different region' }
    ];

    private types = [
        { label: 'Border Type', outlined: true, className: 'border-type' },
        { label: 'Box Type', outlined: false, className: 'box-type' }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        // the combos are display-only, so inert blocks pointer and keyboard interaction
        const template = html`
            <div class="states" inert>
                <span class="type-label"></span>
                ${this.states.map((state) => html`<span class="state-label state-column">${state.label}</span>`)}
                ${this.types.map(
                    (type) => html`
                        <span class="state-label type-label ${type.className}">${type.label}</span>
                        ${this.states.map(
                            (state) => html`
                                <igc-combo
                                    class="state-combo ${state.className} ${type.className}"
                                    single-select
                                    ?outlined=${type.outlined}
                                    ?invalid=${state.invalid}
                                    placeholder="Country"
                                    value-key="id"
                                    display-key="name"
                                    .data=${this.countries}
                                    .value=${['BY']}
                                >
                                    ${state.helperText ? html`<span slot="helper-text">${state.helperText}</span>` : ''}
                                </igc-combo>
                            `
                        )}
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboSingleSelectValidation();
