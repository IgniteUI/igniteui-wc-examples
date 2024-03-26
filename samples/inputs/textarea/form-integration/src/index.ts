import { defineComponents, IgcTextareaComponent, IgcButtonComponent, IgcToastComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcTextareaComponent, IgcButtonComponent, IgcToastComponent);

export class TextareaFormIntegration {
    constructor() {
        const toast = document.querySelector("#submitted") as IgcToastComponent;
        const form = document.querySelector("#form") as HTMLFormElement;

        form.addEventListener("submit", (e: SubmitEvent) => {
            e.preventDefault();
            toast.show();
        });
    }
}

new TextareaFormIntegration();
