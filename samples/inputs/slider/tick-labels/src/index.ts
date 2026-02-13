import { defineComponents, IgcSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderTickLabelsStyle.css';

defineComponents(IgcSliderComponent);

export class SliderTickLabels {
    constructor() {
    }
}

export function initialize() {
  return new SliderTickLabels();
}