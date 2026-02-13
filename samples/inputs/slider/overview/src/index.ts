import { defineComponents, IgcSliderComponent, IgcRangeSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderOverviewStyle.css';

defineComponents(IgcSliderComponent, IgcRangeSliderComponent);

export class SliderOverview {
    constructor() {
    }
}

export function initialize() {
  return new SliderOverview();
}