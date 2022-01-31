import { defineComponents, IgcSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderLabelFormatterStyle.css';

defineComponents(IgcSliderComponent);

export class SliderLabelFormatter {
    constructor() {
        const slider = document.querySelector('igc-slider') as IgcSliderComponent;

        slider.labelFormatter = (value: number) => {
            return `${value}%`;
        }
    }
}

new SliderLabelFormatter();
