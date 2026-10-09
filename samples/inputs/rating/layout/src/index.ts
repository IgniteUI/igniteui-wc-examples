import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRatingComponent);

export class RatingLayout {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="layouts">
                <div class="layout">
                    <span class="layout-label">Label / On</span>
                    <igc-rating label="Rate your experience" value="3"></igc-rating>
                </div>
                <div class="layout">
                    <span class="layout-label">Label / Off</span>
                    <igc-rating aria-label="Rate your experience" value="3"></igc-rating>
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new RatingLayout();
