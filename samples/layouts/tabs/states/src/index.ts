import { defineComponents, IgcTabsComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTabsComponent);

export class TabsStates {
    private root = document.getElementById('sample') as HTMLElement;

    // the tabs are display-only, so keyboard navigation is blocked
    private blockKeyboard = {
        handleEvent: (e: Event) => e.stopPropagation(),
        capture: true
    };

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="states" @keydown=${this.blockKeyboard}>
                <span></span>
                <span class="state-label state-column">Active</span>
                <span class="state-label state-column">Inactive</span>
                <span class="state-label state-column">Disabled</span>
                <span class="state-label">Hover / Off</span>
                <igc-tabs class="state-tabs" alignment="justify">
                    <igc-tab label="Active" selected></igc-tab>
                    <igc-tab label="Inactive"></igc-tab>
                    <igc-tab label="Disabled" disabled></igc-tab>
                </igc-tabs>
                <span class="state-label">Hover / On</span>
                <igc-tabs class="state-tabs" alignment="justify">
                    <igc-tab class="hover" label="Active" selected></igc-tab>
                    <igc-tab class="hover" label="Inactive"></igc-tab>
                </igc-tabs>
            </div>
        `;

        render(template, this.root);
    }
}

new TabsStates();
