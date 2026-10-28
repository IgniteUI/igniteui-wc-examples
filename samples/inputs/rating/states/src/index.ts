import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRatingComponent);

export class RatingStates {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="states">
                <div class="state">
                    <span class="state-label">Empty State</span>
                    <igc-rating label="Rate your experience" value="0" readonly></igc-rating>
                </div>
                <div class="state">
                    <span class="state-label">Full State</span>
                    <igc-rating label="Rate your experience" value="5" readonly></igc-rating>
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new RatingStates();
