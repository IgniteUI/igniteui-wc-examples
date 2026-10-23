import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRatingComponent);

export class RatingInteractionStates {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="states">
                <div class="state">
                    <span class="state-label">Enabled</span>
                    <igc-rating label="Rate your experience" value="1"></igc-rating>
                </div>
                <div class="state">
                    <span class="state-label">Disabled</span>
                    <igc-rating label="Rate your experience" value="1" disabled></igc-rating>
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new RatingInteractionStates();
