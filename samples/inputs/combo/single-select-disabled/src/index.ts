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

export class ComboSingleSelectDisabled {
    private countries: Country[] = [
        { id: 'BY', name: 'Belarus', region: 'Europe' },
        { id: 'BE', name: 'Belgium', region: 'Europe' },
        { id: 'BG', name: 'Bulgaria', region: 'Europe' }
    ];

    private rows = [
        { label: 'Idle', outlined: true, value: [] as string[] },
        { label: 'Filled', outlined: true, value: ['BY'] },
        { label: 'Idle', outlined: false, value: [] as string[] },
        { label: 'Filled', outlined: false, value: ['BY'] }
    ];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const combo = (outlined: boolean, value: string[], disabled: boolean) => html`
            <igc-combo
                single-select
                ?outlined=${outlined}
                ?disabled=${disabled}
                placeholder="Country"
                value-key="id"
                display-key="name"
                group-key="region"
                .data=${this.countries}
                .value=${value}
            ></igc-combo>
        `;

        const template = html`
            <div class="states">
                <span></span>
                <span class="state-label state-column">Enabled</span>
                <span class="state-label state-column">Disabled</span>
                ${this.rows.map(
                    (row, index) => html`
                        <span class="state-label ${index === 2 ? 'group-start' : ''}">${row.label}</span>
                        <div class="${index === 2 ? 'group-start' : ''}">${combo(row.outlined, row.value, false)}</div>
                        <div class="${index === 2 ? 'group-start' : ''}">${combo(row.outlined, row.value, true)}</div>
                    `
                )}
            </div>
        `;

        render(template, this.root);
    }
}

new ComboSingleSelectDisabled();
