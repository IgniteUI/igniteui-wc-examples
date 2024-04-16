import "igniteui-webcomponents/themes/light/bootstrap.css";
import {
    defineComponents,
    IgcRadioGroupComponent,
    IgcIconComponent,
    IgcStepperComponent,
    IgcSelectComponent,
    IgcSliderComponent,
    IgcSwitchComponent,
    IgcRadioComponent,
    IgcTextareaComponent,
    IgcInputComponent,
    IgcCheckboxComponent,
    IgcButtonComponent,
    IgcDateTimeInputComponent,
    IgcSelectItemComponent
} from "igniteui-webcomponents";
import "./index.css";
import { cities, registerCategoryIcons, venues } from "./data";

defineComponents(IgcRadioGroupComponent, IgcDateTimeInputComponent, IgcButtonComponent, IgcCheckboxComponent, IgcIconComponent, IgcStepperComponent, IgcSelectComponent, IgcSliderComponent, IgcSwitchComponent, IgcTextareaComponent);

function setBudgetFormatter() {
    const currencyFormat: Intl.NumberFormatOptions = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    };
    document.querySelector(IgcSliderComponent.tagName)!.valueFormatOptions = currencyFormat;
}

function setSwitch() {
    const switchControl = document.querySelector<IgcSwitchComponent>('[name="event-public"]')!;
    switchControl.addEventListener("igcChange", () => {
        switchControl.textContent = switchControl.checked ? "Public" : "Private";
    });
}

function setRadio() {
    const group = document.querySelector(IgcRadioGroupComponent.tagName)!;
    const radios = document.querySelectorAll<IgcRadioComponent>('[name="category"]');

    group.addEventListener("igcChange", (e) => {
        for (const radio of radios) {
            radio.classList.toggle("categories-selected", radio === e.target);
        }
    });
}

function setTimeEditor() {
    document.querySelector(IgcDateTimeInputComponent.tagName)!.spinDelta = { minutes: 5 };
}

function setSpecialGuests() {
    const container = document.querySelector<HTMLFieldSetElement>("#special-guests")!;
    const input = document.querySelector<IgcInputComponent>('[name="event-number-of-special-guests"]')!;

    input.addEventListener("igcChange", () => {
        const amount = parseInt(input.value, 10);
        const children = Array.from(container.children);
        const length = children.length;

        if (amount > length) {
            for (let i = 0; i < amount - length; i++) {
                const child = document.createElement(IgcInputComponent.tagName);
                children.push(child);

                const idx = children.indexOf(child) + 1;

                child.label = `Name of special guest #${idx}`;
                child.name = `special-guest-${idx}`;
            }
            container.replaceChildren(...children);
        } else {
            container.replaceChildren(...children.slice(0, amount));
        }
    });
}

function setVenueAndLocation() {
    function createItem(props: unknown) {
        const item = document.createElement(IgcSelectItemComponent.tagName);
        Object.assign(item, props);
        return item;
    }

    function mapVenues(location: "New York" | "Sofia" | "Tokyo") {
        const mapped = venues[location];
        venue.replaceChildren(...mapped.map((value) => createItem({ value, textContent: value })));
    }

    const location = document.querySelector<IgcSelectComponent>('[name="event-location"]')!;
    const venue = document.querySelector<IgcSelectComponent>('[name="event-venue"]')!;

    location.replaceChildren(...cities.map((city) => createItem({ value: city, textContent: city })));

    location.addEventListener("igcChange", () => {
        venue.value = "";
        mapVenues(location.value as any);
    });

    mapVenues(location.value as any);
}

function setForm() {
    const form = document.querySelector("form")!;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

export class FancyForm {
    constructor() {
        registerCategoryIcons();
        setBudgetFormatter();
        setSwitch();
        setRadio();
        setSpecialGuests();
        setTimeEditor();
        setVenueAndLocation();
        setForm();
    }
}

new FancyForm();
