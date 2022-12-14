import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcRadioComponent, IgcButtonComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperTitlePositionAndOrientation.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcButtonComponent);
export class StepperTitlePositionAndOrientation {
    private stepper: IgcStepperComponent;

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;

        document.addEventListener("igcChange", (e) => {
            const radio = e.target as IgcRadioComponent;
            if (radio!.parentElement!.id === "titlePosition") {
                this.stepper!.titlePosition = radio.value as "bottom" | "top" | "end" | "start" | undefined;
            } else {
                this.stepper!.orientation = radio.value as "horizontal" | "vertical";
            }
        });
    }
}

new StepperTitlePositionAndOrientation();
