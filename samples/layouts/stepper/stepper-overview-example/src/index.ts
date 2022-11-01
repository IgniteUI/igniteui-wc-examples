import {
    defineComponents,
    IgcStepperComponent,
    IgcRadioGroupComponent,
    IgcStepComponent,
    IgcSwitchComponent,
    IgcFormComponent,
    IgcInputComponent,
    IgcButtonComponent,
    IgcRadioComponent,
    IgcCardComponent,
    IgcBadgeComponent,
    IgcMaskInputComponent,
    IgcCheckboxComponent,
    IgcIconComponent,
    registerIconFromText,
    IgcSelectComponent
} from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperOverview.css";

const checkIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z"/></svg>';

defineComponents(IgcStepperComponent, IgcRadioGroupComponent, IgcFormComponent, IgcSwitchComponent, IgcCardComponent, IgcBadgeComponent, IgcSelectComponent, IgcMaskInputComponent, IgcCheckboxComponent, IgcIconComponent);
export class StepperOverview {
    private stepper: IgcStepperComponent;
    private cards: IgcCardComponent[];

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;
        this.cards = Array.from(document.querySelectorAll("igc-card.card-first-step"));
        registerIconFromText("check", checkIcon, "material");
        this.registerEventListeners();
    }

    private get activeStep(): IgcStepComponent | undefined {
        return this.stepper.steps.find((step) => step.active);
    }

    private get nextButton(): IgcButtonComponent | null {
        return this.activeStep!.querySelector("igc-button.next") as IgcButtonComponent | null;
    }

    private registerEventListeners() {
        this.stepper.addEventListener("igcInput", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcChange", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcClosed", this.checkValidity.bind(this));
        this.selectCard();
    }

    private selectCard() {
        this.cards.forEach((card, index, array) => {
            card.addEventListener("click", () => {
                card.parentElement!.classList.add("selected-card");

                array.forEach((c, i) => {
                    if (i !== index) {
                        c.parentElement!.classList.remove("selected-card");
                    }
                });

                // apply the selected card from the first step to the following steps
                document.querySelectorAll(".selected-card-holder").forEach((selectedCardHolder, i, array) => {
                    const clonedCard = card.cloneNode(true);
                    selectedCardHolder.innerHTML = "";
                    selectedCardHolder.append(clonedCard);
                });

                this.activeStep!.invalid = false;

                requestAnimationFrame(() => {
                    this.stepper.next();
                });
            });
        });
    }

    private checkValidity() {
        const formControls = this.activeStep!.querySelectorAll("igc-radio, igc-input, igc-select, igc-mask-input, igc-checkbox");
        const isFormInvalid =
            formControls &&
            Array.from(formControls).some((control) => {
                const igcControl = control as IgcInputComponent | IgcRadioComponent | IgcSelectComponent | IgcMaskInputComponent | IgcCheckboxComponent;
                return !igcControl.checkValidity();
            });

        if (isFormInvalid) {
            this.activeStep!.invalid = true;
            this.nextButton!.disabled = true;
        } else {
            this.activeStep!.invalid = false;
            this.nextButton!.disabled = false;
        }
    }
}

new StepperOverview();
