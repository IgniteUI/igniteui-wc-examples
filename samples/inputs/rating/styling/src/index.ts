import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './RatingStyle.css';

defineComponents(IgcRatingComponent);
export class RatingStyling {
    constructor() {
    }
}

export function initialize() {
  return new RatingStyling();
}