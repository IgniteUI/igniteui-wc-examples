import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcCheckboxComponent);

export class CheckboxStates {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    // the checkboxes are display-only, so user interaction is blocked
    private preventToggle(e: Event) {
        e.preventDefault();
    }

    private renderSample() {
        const template = html`
            <div
                class="states"
                @click=${this.preventToggle}
                @keydown=${this.preventToggle}
            >
                <div class="state">
                    <span class="state-label">Indeterminate</span>
                    <igc-checkbox indeterminate aria-label="Indeterminate"></igc-checkbox>
                </div>
                <div class="state">
                    <span class="state-label">On</span>
                    <igc-checkbox checked aria-label="On"></igc-checkbox>
                </div>
                <div class="state">
                    <span class="state-label">Off</span>
                    <igc-checkbox aria-label="Off"></igc-checkbox>
                </div>
                <div class="state">
                    <span class="state-label">Disabled</span>
                    <igc-checkbox disabled aria-label="Disabled"></igc-checkbox>
                </div>
                <div class="state">
                    <span class="state-label">Invalid</span>
                    <igc-checkbox invalid aria-label="Invalid"></igc-checkbox>
                </div>
                <div class="state">
                    <span class="state-label">Required</span>
                    <igc-checkbox required aria-label="Required"></igc-checkbox>
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new CheckboxStates();
