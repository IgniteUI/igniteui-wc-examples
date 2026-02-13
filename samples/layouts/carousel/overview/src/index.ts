import { defineComponents, IgcCarouselComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCarouselComponent);

export class CarouselOverview {
    constructor() {}
}

export function initialize() {
  return new CarouselOverview();
}