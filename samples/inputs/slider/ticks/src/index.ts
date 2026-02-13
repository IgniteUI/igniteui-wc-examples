import { defineComponents, IgcSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderTicksStyle.css';

defineComponents(IgcSliderComponent);

export class SliderTicks {
    constructor() {
    }
}

export function initialize() {
  return new SliderTicks();
}