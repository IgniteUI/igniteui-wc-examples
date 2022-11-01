import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcRadioComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperLabelPositionAndOrientation.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent);
export class StepperLabelPositionAndOrientation {
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

new StepperLabelPositionAndOrientation();
