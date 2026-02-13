import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcRatingComponent);
export class RatingBasic {
    constructor() {
    }
}

export function initialize() {
  return new RatingBasic();
}