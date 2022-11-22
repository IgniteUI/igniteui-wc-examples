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
        this.reset();
    }

    private checkValidity() {
        // checks validity of the input elements in the form
        const formControls = this.activeStep!.querySelectorAll("igc-radio, igc-input, igc-select, igc-mask-input, igc-checkbox") as NodeListOf<any>;
        const isFormInvalid = Array.from(formControls).some((control: IgcInputComponent | IgcRadioComponent | IgcSelectComponent | IgcMaskInputComponent | IgcCheckboxComponent) => !control.checkValidity());

        this.activeStep!.invalid = isFormInvalid;
        this.nextButton!.disabled = isFormInvalid && !this.activeStep!.optional;
    }

    private checkTaxIdInputValidity() {
        // shows an error message bellow the Federal Tax Id Number's input
        this.taxIdInput.addEventListener("igcInput", () => {
            const errorMessage = document.querySelector("#tax-id-error-message") as HTMLParagraphElement;
            this.taxIdInput.checkValidity() ? errorMessage.classList.add("hidden") : errorMessage.classList.remove("hidden");
        });
    }

    private onDifferentMailingAddressChecked() {
        // sets the optional property of the Shipping Details' step
        this.mailingAddressCheckbox.addEventListener("igcChange", (e: CustomEvent) => {
            this.stepper.steps[3].optional = !e.detail;
        });
    }

    private onChange(e: Event) {
        this.checkValidity();
        const that = this as any;
        const control = e.target as any as IgcInputComponent | IgcRadioComponent | IgcSelectComponent | IgcMaskInputComponent | IgcCheckboxComponent;
        // collects the data of a form
        that[this.activeStep!.id][control.id] = control.value;
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
                this.stepper!.navigateTo(1);
            });

            document.querySelector(".card-wrapper")!.append(cardElement);
        });
    }

    private reset() {
        document.getElementById("reset")!.addEventListener("click", () => {
            this.stepper!.reset();
            this.stepper!.steps.forEach((step) => (step.invalid = true));
            document.querySelector(".selected-card")!.classList.remove("selected-card");
            document.querySelectorAll("igc-form").forEach((form) => form.reset());
            this.businessInformation = {};
            this.personalInformation = {};
            this.shippingDetails = {};
            this.selectedCard = null;
        });
    }
}

new StepperOverview();
