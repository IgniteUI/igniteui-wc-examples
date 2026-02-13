import {
    IgcStepperComponent,
    IgcRadioGroupComponent,
    IgcStepComponent,
    IgcSwitchComponent,
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

export class StepperOverview {
    private stepper: IgcStepperComponent;
    private selectedCard = null;

    constructor() {
        this.stepper = document.querySelector("igc-stepper") as IgcStepperComponent;
        registerIconFromText("check", checkIcon, "material");
        this.addCards();
        this.registerEventListeners();
    }

    private addCards() {
        const cardsWrapper = document.querySelector(".cards-wrapper");
        if (!cardsWrapper) return;

        const cards: any[] = [
            {
                id: "card-blue",
                img: "https://dl.infragistics.com/x/img/stepper/card-blue.png",
                price: 400,
                offer: "STATEMENT CREDIT OFFER",
                type: "Business Customized Advanced",
                description: "Cash Mastercard"
            },
            {
                id: "card-red",
                img: "https://dl.infragistics.com/x/img/stepper/card-red.png",
                price: 600,
                offer: "STATEMENT CREDIT OFFER",
                type: "Business Travel Advanced",
                description: "World Mastercard"
            },
            {
                id: "card-gold",
                img: "https://dl.infragistics.com/x/img/stepper/card-gold.png",
                price: 500,
                offer: "STATEMENT CREDIT OFFER",
                type: "Business Golden",
                description: "World Mastercard"
            }
        ];

        cards.forEach((cardData) => {
            const cardElement = this.createCard(cardData);
            cardElement.addEventListener("click", () => {
                const selectedCards = document.querySelectorAll(".selected-card");
                selectedCards.forEach((c) => c.classList.remove("selected-card"));
                cardElement.classList.add("selected-card");

                const selectedCardWrappers = document.querySelectorAll(".selected-card-wrapper");
                selectedCardWrappers.forEach((cardWrapper) => {
                    cardWrapper.replaceChildren(this.createCard(cardData));
                });

                this.selectedCard = cardData;
                this.stepper.navigateTo(1);
            });

            cardsWrapper.append(cardElement);
        });
    }

    private createCard(cardData: any) {
        const cardTemplate = document.getElementById("card") as HTMLTemplateElement;
        const card = cardTemplate.content.cloneNode(true) as HTMLElement;

        card.querySelector(".card-img")!.setAttribute("src", cardData.img);
        card.querySelector(".card-price")!.textContent = cardData.price;
        card.querySelector(".card-offer")!.textContent = cardData.offer;
        card.querySelector(".card-type")!.textContent = cardData.type;
        card.querySelector(".card-description")!.textContent = cardData.description;

        return card;
    }

    private registerEventListeners() {
        this.stepper.addEventListener("igcChange", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcInput", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcClosed", this.checkValidity.bind(this));
        this.stepper.addEventListener("igcActiveStepChanged", this.checkValidity.bind(this));
        this.setupNextButtons();
        this.reset();
    }

    private checkValidity() {
        const activeStep = this.stepper.steps.find((step) => step.active);
        if (!activeStep) return;

        const form = activeStep.querySelector("form") as HTMLFormElement;
        if (!form) return;

        const isFormValid = form.checkValidity();
        activeStep.invalid = !isFormValid;
        activeStep.complete = isFormValid;

        const nextButton = activeStep.querySelector("igc-button.next") as IgcButtonComponent | null;
        if (nextButton) {
            nextButton.disabled = !isFormValid && !activeStep.optional;
        }
    }

    private setupNextButtons() {
        const nextButtons = document.querySelectorAll(".next");
        nextButtons.forEach(btn => btn.addEventListener('click', this.nextStep.bind(this)));
    }

    private nextStep() {
        this.stepper.next();
    }

    private reset() {
        const resetButton = document.getElementById("reset");
        if (!resetButton) return;

        resetButton.addEventListener("click", () => {
            this.stepper.reset();
            this.stepper.steps.forEach((step) => {
                step.invalid = true;
                step.complete = false;
            });

            const selectedCards = document.querySelectorAll(".selected-card");
            selectedCards.forEach((c) => c.classList.remove("selected-card"));

            const forms = document.querySelectorAll("form");
	        forms.forEach((form) => form.reset());

            const formControls = document.querySelectorAll("input, select, textarea");
            formControls.forEach(control => (control as HTMLInputElement).value = '');

            this.selectedCard = null;
        });
    }
}

export function initialize() {
  return new StepperOverview();
}