import { defineComponents, IgcSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderDisabledStyle.css';

defineComponents(IgcSliderComponent);

export class SliderDisabled {
    constructor() {
    }
}

export function initialize() {
  return new SliderDisabled();
}