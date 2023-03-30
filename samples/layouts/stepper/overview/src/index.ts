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
    IgcSelectComponent,
    IgcSelectItemComponent
} from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./StepperOverview.css";

const checkIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z"/></svg>';

defineComponents(IgcStepperComponent, IgcButtonComponent, IgcRadioGroupComponent, IgcFormComponent, IgcSwitchComponent, IgcCardComponent, IgcBadgeComponent, IgcSelectComponent, IgcMaskInputComponent, IgcCheckboxComponent, IgcIconComponent);
export class StepperOverview {
    private stepper: IgcStepperComponent;
    private taxIdInput: IgcMaskInputComponent;
    private mailingAddressCheckbox: IgcCheckboxComponent;
    private selectedCard = null;
    private cards: any[] = [
        {
            id: "card-blue",
            img: "https://www.infragistics.com/angular-demos/assets/images/stepper/card-blue.png",
            price: 400,
            offer: "STATEMENT CREDIT OFFER",
            type: "Business Customized Advanced",
            description: "Cash Mastercard"
        },
        {
            id: "card-red",
            img: "https://www.infragistics.com/angular-demos/assets/images/stepper/card-red.png",
            price: 600,
            offer: "STATEMENT CREDIT OFFER",
            type: "Business Travel Advanced",
            description: "World Mastercard"
        },
        {
            id: "card-gold",
            img: "https://www.infragistics.com/angular-demos/assets/images/stepper/card-gold.png",
            price: 500,
            offer: "STATEMENT CREDIT OFFER",
            type: "Business Golden",
            description: "World Mastercard"
        }
    ];

    private businessInformation: any = {
        name: "",
        physicalAddress: "",
        city: "",
        state: "",
        zip: null,
        taxIdNumber: null,
        differentAddress: false,
        nonUSBusinessActivity: null
    };

    private personalInformation: any = {
        firstName: "",
        lastName: "",
        jobTitle: "",
        phoneNumber: "",
        email: "",
        authorization: false,
        agreementAccepted: false
    };

    private shippingDetails: any = {
        firstName: "",
        lastName: "",
        mailingAddress: "",
        city: "",
        state: "",
        zip: null
    };

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;
        this.taxIdInput = document.getElementById("tax-id") as unknown as IgcMaskInputComponent;
        this.mailingAddressCheckbox = document.getElementById("different-mailing-address") as unknown as IgcCheckboxComponent;

        registerIconFromText("check", checkIcon, "material");

        this.addCards();
        this.registerEventListeners();
    }

    private get activeStep(): IgcStepComponent | undefined {
        return this.stepper.steps.find((step) => step.active);
    }

    private get nextButton(): IgcButtonComponent | null {
        return this.activeStep!.querySelector("igc-button.next") as IgcButtonComponent | null;
    }

    private registerEventListeners() {
        this.stepper.addEventListener("igcChange", this.onChange.bind(this));
        this.stepper.addEventListener("igcInput", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcClosed", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcActiveStepChanged", this.checkValidity.bind(this));
        this.checkTaxIdInputValidity();
        this.onDifferentMailingAddressChecked();
        this.setupNextButtons();
        this.reset();
    }

    private checkValidity() {
        // checks validity of the input elements in the form
        const formControls = this.activeStep!.querySelectorAll("igc-radio, igc-input, igc-select, igc-mask-input, igc-checkbox") as NodeListOf<any>;
        const isFormInvalid = this.checkFormInvalid(formControls);

        this.activeStep!.invalid = isFormInvalid;
        this.activeStep!.complete = !isFormInvalid;

        this.setShippingDetailsComplete();

        if (this.nextButton) {
            this.nextButton!.disabled = isFormInvalid && !this.activeStep!.optional;
        }
    }

    private checkFormInvalid(formControls: NodeListOf<any>) {
        return Array.from(formControls).some((control: IgcInputComponent | IgcRadioComponent | IgcSelectComponent | IgcMaskInputComponent | IgcCheckboxComponent) => {
            const oldState = control.invalid;
            // checks whether some of the form controls is not valid
            let isControlInvalid = !control.checkValidity();
            if (control instanceof IgcRadioComponent) {
                isControlInvalid = this.businessInformation.nonUSBusinessActivity === null;
            }
            // restores the invalid state of the control
            control.invalid = oldState;
            return isControlInvalid;
        });
    }

    private checkTaxIdInputValidity() {
        // shows an error message bellow the Federal Tax Id Number's input
        this.taxIdInput.addEventListener("igcInput", () => {
            const errorMessage = document.querySelector("#tax-id-error-message") as HTMLParagraphElement;
            this.taxIdInput.checkValidity() ? errorMessage.classList.add("hidden") : errorMessage.classList.remove("hidden");
        });
    }

    private onDifferentMailingAddressChecked() {
        // sets the optional and disabled properties of the Shipping Details step
        this.mailingAddressCheckbox.addEventListener("igcChange", (e: CustomEvent) => {            
            this.stepper.steps[3].optional = !e.detail;
            this.stepper.steps[3].disabled = !e.detail;
        });
    }

    private onChange(e: Event) {
        const ev = e as CustomEvent<any>
        const that = this as any;
        const control = ev.target as any as IgcInputComponent | IgcRadioComponent | IgcSelectComponent | IgcMaskInputComponent | IgcCheckboxComponent;
        if (control.name === undefined) {
            return;
        }
        // collects the data of a form
        if (ev.target instanceof IgcSelectComponent) {
            that[this.activeStep!.id][control.name] = (ev.detail as IgcSelectItemComponent).value;
        } else if (ev.target instanceof IgcCheckboxComponent) {
            that[this.activeStep!.id][control.name] = ev.detail;
        }
        else {
            that[this.activeStep!.id][control.name] = control.value;
        }
        this.checkValidity();
    }

    private createCard(cardData: any) {
        const cardTemplate = document.getElementById("card") as HTMLTemplateElement;
        const card = cardTemplate!.content!.firstElementChild!.cloneNode(true) as HTMLElement;

        (card!.querySelector(".card-img")! as HTMLImageElement).src = cardData.img;
        card!.querySelector(".card-price")!.textContent = cardData.price;
        card!.querySelector(".card-offer")!.textContent = cardData.offer;
        card!.querySelector(".card-type")!.textContent = cardData.type;
        card!.querySelector(".card-description")!.textContent = cardData.description;

        return card;
    }

    private addCards() {
        this.cards.forEach((card) => {
            const cardElement = this.createCard(card);
            cardElement.classList.add("card-first-step");

            cardElement.addEventListener("click", () => {
                document.querySelectorAll(".selected-card").forEach((c) => {
                    c.classList.remove("selected-card");
                });

                cardElement.classList.add("selected-card");

                document.querySelectorAll(".selected-card-wrapper").forEach((cardWrapper) => {
                    (cardWrapper as any).replaceChildren(this.createCard(card));
                });

                this.selectedCard = card;
                this.activeStep!.invalid = false;
                this.checkValidity();
                this.stepper!.navigateTo(1);
            });

            document.querySelector(".cards-wrapper")!.append(cardElement);
        });
    }

    private setupNextButtons() {
        const nextButtons = document.querySelectorAll(".next") as NodeListOf<any>;
        nextButtons.forEach(btn => btn.addEventListener('click', this.nextStep.bind(this)));
    }

    private nextStep() {
        this.stepper.next();
        this.setShippingDetailsComplete();
    }

    private setShippingDetailsComplete() {
        if (this.activeStep!.index === 4 && this.stepper.steps[1].complete && !this.mailingAddressCheckbox.checked) {
            this.stepper.steps[3].complete = true;
        }
    }

    private reset() {
        document.getElementById("reset")!.addEventListener("click", () => {
            this.stepper!.reset();
            this.stepper!.steps.forEach((step) => {
                step.invalid = true;
                step.complete = false;
            });
            this.stepper!.steps[3].optional = true;
            this.stepper!.steps[3].disabled = true;
            document.querySelector(".selected-card")!.classList.remove("selected-card");
            document.querySelectorAll("igc-form").forEach((form) => form.reset());

            // resets the invalid state of all form controls
            requestAnimationFrame(() => {
                const formControls = document.querySelectorAll("igc-radio, igc-input, igc-select, igc-mask-input, igc-checkbox") as NodeListOf<any>;
                Array.from(formControls).forEach((control: IgcInputComponent | IgcRadioComponent | IgcSelectComponent | IgcMaskInputComponent | IgcCheckboxComponent) => {
                    control.invalid = false;
                });
            });

            this.businessInformation = {};
            this.personalInformation = {};
            this.shippingDetails = {};
            this.selectedCard = null;
        });
    }
}

new StepperOverview();
