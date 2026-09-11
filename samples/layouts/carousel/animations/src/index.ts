import {
  defineComponents,
  IgcCarouselComponent,
  IgcSelectComponent,
  IgcSwitchComponent,
} from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCarouselComponent, IgcSelectComponent, IgcSwitchComponent);

const carousel = document.querySelector("igc-carousel") as IgcCarouselComponent;
const select = document.querySelector("igc-select") as IgcSelectComponent;
const verticalSwitch = document.querySelector("igc-switch") as IgcSwitchComponent;

select.addEventListener("igcChange", (event: CustomEvent<{ value: "slide" | "fade" | "none" }>) => {
  carousel.animationType = event.detail.value;
});

verticalSwitch.addEventListener("igcChange", (event: CustomEvent<{ checked: boolean }>) => {
  carousel.vertical = event.detail.checked;
});
