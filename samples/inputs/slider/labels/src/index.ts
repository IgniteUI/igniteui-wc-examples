import { defineComponents, IgcSliderComponent, IgcSliderLabelComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderLabelsStyle.css';

defineComponents(IgcSliderComponent, IgcSliderLabelComponent);

export class SliderLabels {
    constructor() { }
}

new SliderLabels();
