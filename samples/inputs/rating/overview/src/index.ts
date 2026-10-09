import { defineComponents, IgcCardComponent, IgcRatingComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcCardComponent, IgcRatingComponent);

export class RatingOverview {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <igc-card class="rating-card">
                <igc-card-header>
                    <span slot="title">Rate this product</span>
                    <span slot="subtitle">Your opinion matters to us!</span>
                </igc-card-header>
                <igc-card-content>
                    <igc-rating aria-label="Rate this product" hover-preview></igc-rating>
                </igc-card-content>
            </igc-card>
        `;

        render(template, this.root);
    }
}

new RatingOverview();
