import { defineComponents, IgcTabsComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTabsComponent);

export class TabsAmount {
    private categories = ['Podcasts', 'Playlists', 'Genres', 'Albums', 'Artists', 'Audiobooks', 'Radio'];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="amounts">
                <span class="amount-label">Two Tabs</span>
                <igc-tabs class="two-tabs" alignment="justify">
                    ${this.categories.slice(0, 2).map((category) => html`<igc-tab label=${category}></igc-tab>`)}
                </igc-tabs>
                <span class="amount-label">Five Tabs</span>
                <igc-tabs class="five-tabs" alignment="justify">
                    ${this.categories.slice(0, 5).map((category) => html`<igc-tab label=${category}></igc-tab>`)}
                </igc-tabs>
                <span class="amount-label">5+ Tabs</span>
                <igc-tabs>
                    ${this.categories.map((category) => html`<igc-tab label=${category}></igc-tab>`)}
                </igc-tabs>
            </div>
        `;

        render(template, this.root);
    }
}

new TabsAmount();
