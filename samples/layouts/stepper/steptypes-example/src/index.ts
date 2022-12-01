import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcRadioComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperStepTypes.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent);
export class StepperStepTypes {
    private stepper: IgcStepperComponent;

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;

        document.addEventListener("igcChange", (e) => {
            const radio = e.target as unknown as IgcRadioComponent;
            const radioValue = radio.value as "indicator" | "title" | "full";
            this.stepper.stepType = radioValue;
        });
    }
}

new StepperStepTypes();
