import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcStepComponent, IgcSwitchComponent, IgcFormComponent, IgcInputComponent, IgcButtonComponent, IgcRadioComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperLinear.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcFormComponent, IgcSwitchComponent);
export class StepperLinear {
    private stepper: IgcStepperComponent;

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;
        this.registerEventListeners();
    }

    private get activeStep(): IgcStepComponent | undefined {
        return this.stepper.steps.find((step) => step.active);
    }

    private get nextButton(): IgcButtonComponent | null {
        return this.activeStep!.querySelector("igc-button.next") as IgcButtonComponent | null;
    }

    private registerEventListeners() {
        this.linearChange();
        this.stepper.addEventListener("igcInput", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcChange", this.checkValidity.bind(this));
    }

    private linearChange() {
        document.querySelector("igc-switch")!.addEventListener("igcChange", (e) => {
            const customEvent = e as CustomEvent;
            this.stepper!.linear = customEvent.detail;

            document.querySelectorAll("igc-button.next").forEach((button) => {
                const igcButton = button as IgcButtonComponent;
                igcButton.disabled = this.stepper!.linear ? true : false;
            });
        });
    }

    private checkValidity() {
        if (this.activeStep!.optional || !this.nextButton) {
            return;
        }

        const formControls = this.activeStep!.querySelectorAll("igc-radio, igc-input");
        const isFormInvalid =
            formControls &&
            Array.from(formControls).some((control) => {
                const igcControl = control as IgcInputComponent | IgcRadioComponent;
                return !igcControl.checkValidity();
            });

        if (isFormInvalid) {
            this.activeStep!.invalid = true;
            this.nextButton.disabled = this.stepper!.linear ? true : false;
        } else {
            this.activeStep!.invalid = false;
            this.nextButton.disabled = false;
        }
    }
}

new StepperLinear();
