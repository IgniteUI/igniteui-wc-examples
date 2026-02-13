import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRatingComponent);
export class SingleSelectionRating {
    constructor() {
    }
}

export function initialize() {
  return new SingleSelectionRating();
}