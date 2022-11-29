import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcStepComponent, IgcSwitchComponent, IgcInputComponent, IgcButtonComponent, IgcRadioComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperLinear.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcSwitchComponent, IgcInputComponent, IgcButtonComponent);
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
        document.querySelector("igc-switch")!.addEventListener("igcChange", (e: CustomEvent) => {
            this.stepper!.linear = e.detail;

            document.querySelectorAll("igc-button.next").forEach((button) => {
                const igcButton = button as unknown as IgcButtonComponent;
                const step = igcButton.closest("igc-step") as IgcStepComponent;
                igcButton.disabled = !this.stepper!.linear ? false : step.invalid ? true : false;
            });
        });
    }

    private checkValidity() {
        if (this.activeStep!.optional || !this.nextButton) {
            return;
        }
        const formControls = this.activeStep!.querySelectorAll("igc-radio, igc-input") as NodeListOf<any>;
        const isFormInvalid = Array.from(formControls).some((control: IgcInputComponent | IgcRadioComponent) => !control.checkValidity());

        this.activeStep!.invalid = isFormInvalid;
        this.nextButton.disabled = this.stepper!.linear ? isFormInvalid : false;
    }
}

new StepperLinear();
