import { defineComponents, IgcSliderComponent, IgcRangeSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderStyling.css';
import './layout.css';

defineComponents(IgcSliderComponent);
defineComponents(IgcRangeSliderComponent);

export class SliderTicks {
    constructor() {
    }
}

new SliderTicks();
