import { defineComponents, IgcStepperComponent, IgcSwitchComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcStepperComponent, IgcSwitchComponent);

export class StepperLinear {
  private stepper: IgcStepperComponent;

  constructor() {
    this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;

    document.querySelector("igc-switch")!.addEventListener("igcChange", (e: CustomEvent) => {
      const rows = (e.target as IgcSwitchComponent).checked ? '0fr' : '1fr';
      this.stepper.style.setProperty('--body-grid-rows', rows);
      document.getElementById('body-grid-rows-value')!.textContent = rows;
    });
  }
}

new StepperLinear();
