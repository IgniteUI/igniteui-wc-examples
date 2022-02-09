import { defineComponents, IgcSliderComponent, IgcRangeSliderComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SliderValueStyle.css';

defineComponents(IgcSliderComponent, IgcRangeSliderComponent);

export class SliderValue {
    constructor() {
        const slider = document.querySelector('igc-slider') as IgcSliderComponent;
        const rangeSlider = document.querySelector('igc-range-slider') as IgcRangeSliderComponent;
        const sliderValueSpan = document.getElementById('slider-value') as HTMLElement;
        const sliderLowerSpan = document.getElementById('slider-lower') as HTMLElement;
        const sliderUpperSpan = document.getElementById('slider-upper') as HTMLElement;

        slider.addEventListener('igcInput', (ev: CustomEvent) => {
            sliderValueSpan.innerHTML = ev.detail;
        });

        rangeSlider.addEventListener('igcInput', (ev: CustomEvent) => {
            sliderLowerSpan.innerHTML = ev.detail.lower;
            sliderUpperSpan.innerHTML = ev.detail.upper;
        });
    }
}

new SliderValue();
