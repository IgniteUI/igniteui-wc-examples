import { defineComponents, IgcStepperComponent, IgcRadioGroupComponent, IgcRadioComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './StepperStyle.css';
import './layout.css';

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcButtonComponent);
export class StepperStyling {
    private stepper: IgcStepperComponent;

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;

    }
}

new StepperStyling();
