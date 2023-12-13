import { defineComponents, IgcStepperComponent, IgcSelectComponent, IgcSelectItemComponent, IgcRadioGroupComponent, IgcInputComponent, IgcButtonComponent, IgcRadioComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcInputComponent, IgcButtonComponent, IgcSelectComponent);
export class StepperAnimations {
    private stepper: IgcStepperComponent;
    private inputDuration: IgcInputComponent;

    constructor() {
        const orientation = document.getElementById("orientation") as IgcSelectComponent;
        const horizontalAnim = document.getElementById("hanimation") as IgcSelectComponent;
        const verticalAnim = document.getElementById("vanimation") as IgcSelectComponent;

        horizontalAnim?.addEventListener("igcChange", (ev) => this.updateAnimations(ev, 'horizontal'));
        verticalAnim?.addEventListener("igcChange", (ev) => this.updateAnimations(ev, 'vertical'));
        orientation?.addEventListener("igcChange", (ev) => this.updateOrientation(ev));

        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;
        this.inputDuration = document.getElementById("duration") as IgcInputComponent;
        this.inputDuration.addEventListener("igcChange", this.updateDuration.bind(this));
    }

    private updateOrientation(ev: CustomEvent) {
        const orientation: any  = (ev.detail as IgcSelectItemComponent).value;
        this.stepper.orientation = orientation;
        console.log(orientation);
    }

    private updateAnimations(ev: CustomEvent, animationType: 'vertical' | 'horizontal') {
        const animation: any  = (ev.detail as IgcSelectItemComponent).value;

        if (animationType === 'horizontal') this.stepper.horizontalAnimation = animation;
        if (animationType === 'vertical') this.stepper.verticalAnimation = animation;
    }

    private updateDuration() {
        this.stepper.animationDuration = Number(this.inputDuration.value);
    }
}

new StepperAnimations();
