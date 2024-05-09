import { defineComponents, IgcInputComponent, IgcSelectComponent, IgcSnackbarComponent, IgcSelectItemComponent, IgcComboComponent, IgcMaskInputComponent, IgcTextareaComponent, IgcCheckboxComponent, IgcButtonComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";
import { businessRoles, states, titleLevels } from "./data";

defineComponents(IgcInputComponent, IgcSelectComponent, IgcComboComponent, IgcSnackbarComponent, IgcTextareaComponent, IgcCheckboxComponent, IgcMaskInputComponent, IgcButtonComponent);

function populateSelect(id: string, data: string[]) {
    const elements = data.map((value) => {
        const element = document.createElement(IgcSelectItemComponent.tagName);
        return Object.assign(element, { value, textContent: value });
    });

    document.querySelector(id)!.append(...elements);
}

function populateCombo() {
    document.querySelector<IgcComboComponent>("[name='state']")!.data = ["Not in the USA", ...states];
}

function inputValidation(elements) {
    const inputs = [
        { name: "email", errorSelector: "#email .helper-text" },
        { name: "first-name", errorSelector: "#first-name .helper-text" },
        { name: "last-name", errorSelector: "#last-name .helper-text" },
        { name: "message", errorSelector: "#message .helper-text" },
        { name: "company-name", errorSelector: "#company-name .helper-text" }
    ];

    inputs.forEach(input => {
        const inputElement = elements?.namedItem(input.name) as HTMLInputElement;
        const errorElement = document.querySelector(input.errorSelector);
        inputValidaionMessages(inputElement, errorElement);
    });
}

function inputValidaionMessages(input, inputError){

    if(input != null){
        input.addEventListener("blur", (event) => {
        // On blur we check if the form fields are valid.
        if (input.validity.valid) {
            // In case there is an error message visible, if the field
            // is valid, we remove the error message.
            if(inputError != null){
                inputError.textContent = ""; // Reset the content of the message
        }
        } else {
            // If there is still an error, show the correct error
            showError(input, inputError);
        }
        });
    }    
}

function showError(input, inputError) {
    inputError!.textContent = input.validationMessage; 
}

function onSubmit() {
    const form = document.querySelector("form")!;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        document.querySelector(IgcSnackbarComponent.tagName)?.show();

        for (const [name, value] of new FormData(form).entries()) {
            console.log(`${name}: ${value}`);
        }
    });
}

export class FormOverview {
    constructor() {
        populateSelect("[name='business-role']", businessRoles);
        populateSelect("[name='title-level']", titleLevels);
        populateCombo();
        onSubmit();

        const form: HTMLFormElement = document.querySelector("form")!;
        const elements: HTMLFormControlsCollection = form?.elements;        
        const emailError = document.querySelector("span.helper-text");

        inputValidation(elements);
    }
    
}

new FormOverview();
