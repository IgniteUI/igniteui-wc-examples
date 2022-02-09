import { defineComponents, IgcSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderValueFormatStyle.css';

defineComponents(IgcSliderComponent);

export class SliderValueFormat {
    constructor() {
        const slider1 = document.getElementById('slider1') as IgcSliderComponent;
        const slider2 = document.getElementById('slider2') as IgcSliderComponent;

        slider1.valueFormatOptions = {
            style: 'currency',
            currency: 'USD'
        }

        slider2.valueFormatOptions = {
            minimumFractionDigits: 1
        }
    }
}

new SliderValueFormat();
