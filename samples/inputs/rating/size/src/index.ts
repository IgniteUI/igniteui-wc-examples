import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { html, render } from 'lit-html';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRatingComponent);

export class RatingSize {
    private root = document.getElementById('sample') as HTMLElement;

    constructor() {
        this.renderSample();
    }

    private renderSample() {
        const template = html`
            <div class="sizes">
                <div class="size">
                    <span class="size-label">Small</span>
                    <igc-rating class="size-small" label="Rate your experience" value="5"></igc-rating>
                </div>
                <div class="size">
                    <span class="size-label">Medium</span>
                    <igc-rating class="size-medium" label="Rate your experience" value="5"></igc-rating>
                </div>
                <div class="size">
                    <span class="size-label">Large</span>
                    <igc-rating class="size-large" label="Rate your experience" value="5"></igc-rating>
                </div>
            </div>
        `;

        render(template, this.root);
    }
}

new RatingSize();
