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
    }
}

new FormOverview();
