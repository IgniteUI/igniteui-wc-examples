import { defineComponents, IgcTabsComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTabsComponent);

export class TabsResponsiveness {
    private categories = ['Podcasts', 'Playlists', 'Genres'];
    private days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="modes">
                <span class="mode-label">Content Fit</span>
                <igc-tabs alignment="justify">
                    ${this.categories.map((category) => html`<igc-tab label=${category}></igc-tab>`)}
                </igc-tabs>
                <span class="mode-label">Content Fix</span>
                <igc-tabs>
                    ${this.days.map((day) => html`<igc-tab label=${day}></igc-tab>`)}
                </igc-tabs>
            </div>
        `;

        render(template, this.root);
    }
}

new TabsResponsiveness();
