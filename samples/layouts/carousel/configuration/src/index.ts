import { defineComponents, IgcCarouselComponent, IgcSwitchComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcCarouselComponent, IgcSwitchComponent);

const carousel = document.querySelector("#carousel") as IgcCarouselComponent;

const configureSwitch = (id: string, update: (checked: boolean) => void) => {
  const control = document.querySelector(`#${id}`) as IgcSwitchComponent;
  control.addEventListener("igcChange", (event: CustomEvent) => update(event.detail.checked));
};

configureSwitch("hide-navigation", (checked) => {
  carousel.hideNavigation = checked;
});

configureSwitch("hide-indicators", (checked) => {
  carousel.hideIndicators = checked;
});

configureSwitch("disable-loop", (checked) => {
  carousel.disableLoop = checked;
});
