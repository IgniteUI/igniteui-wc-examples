import { defineComponents, IgcButtonComponent, IgcCardComponent, IgcCarouselComponent, IgcSelectComponent, IgcSwitchComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCarouselComponent, IgcSelectComponent, IgcCardComponent, IgcButtonComponent, IgcSwitchComponent);

export class CarouselAnimations {
    private carousel: IgcCarouselComponent;
    private select: IgcSelectComponent;
    private switch: IgcSwitchComponent;

    constructor() {
        this.carousel = document.querySelector('igc-carousel') as IgcCarouselComponent;
        this.select = document.querySelector('igc-select') as IgcSelectComponent;
        this.switch = document.querySelector('igc-switch') as IgcSwitchComponent;

        this.select.addEventListener("igcChange", (e) => {
            const animation = e.detail.value as 'slide' | 'fade' | 'none';
            this.carousel.animationType = animation;
        });

        this.switch.addEventListener("igcChange", (e) => {
            this.carousel.vertical = e.detail.checked;
        });
    }
}

export function initialize() {
  return new CarouselAnimations();
}