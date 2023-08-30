import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcStepComponent, IgcInputComponent, IgcButtonComponent, IgcRadioComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperAnimations.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcInputComponent, IgcButtonComponent);
export class StepperAnimations {
    private stepper: IgcStepperComponent;
    private inputDuration: IgcInputComponent;
    private radios: NodeListOf<IgcRadioComponent>;

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;
        this.inputDuration = document.getElementById("duration") as IgcInputComponent;
        this.inputDuration.addEventListener("igcChange", this.updateDuration.bind(this));

        this.radios = document.querySelectorAll('igc-radio') as NodeListOf<IgcRadioComponent>;
        this.radios.forEach(radio => {
            radio.addEventListener('igcChange', () => {
                if (radio!.parentElement!.id == "orientation") {
                    this.stepper!.orientation = radio.value as "horizontal" | "vertical";
                } else if (radio!.parentElement!.id == "vertical") {
                    this.stepper!.verticalAnimation = radio.value as "grow" | "fade" | "none";
                } else if (radio!.parentElement!.id == "horizontal") {
                    this.stepper!.horizontalAnimation = radio.value as "slide" | "fade" | "none";
                }
            });
        })
    }

    private updateDuration() {
        this.stepper.animationDuration = Number(this.inputDuration!.value);
    }
}

new StepperAnimations();
