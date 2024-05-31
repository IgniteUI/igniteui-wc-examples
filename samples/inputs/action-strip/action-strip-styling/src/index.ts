import { defineComponents, IgcIconComponent, IgcRippleComponent, IgcButtonComponent, registerIconFromText } from "igniteui-webcomponents";
import { IgcActionStripComponent } from "igniteui-webcomponents-grids/grids";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "igniteui-webcomponents-grids/grids/combined";
import "./ActionStripStyling.css";

defineComponents(IgcIconComponent);
defineComponents(IgcRippleComponent);
defineComponents(IgcButtonComponent);

const icons = [
    {
        name: "restore",
        iconText:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44"><path d="M25.99 6C16.04 6 8 14.06 8 24H2l7.79 7.79.14.29L18 24h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83C16.53 39.98 21.02 42 25.99 42 35.94 42 44 33.94 44 24S35.94 6 25.99 6zM24 16v10l8.56 5.08L34 28.65l-7-4.15V16h-3z"/></svg>'
    },
    {
        name: "delete",
        iconText:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26"><path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path></svg>'
    }
];

export class ActionStripStyling {
    private actionStrip: IgcActionStripComponent;

    private restore: HTMLElement;
    private delete: HTMLElement;

    private parentElement: HTMLElement;

    constructor() {
        icons.forEach((icon) => {
            registerIconFromText(icon.name, icon.iconText, "material");
        });

        this.actionStrip = document.querySelector("igc-action-strip") as IgcActionStripComponent;

        this.restore = document.querySelector(".restore") as IgcButtonComponent;
        this.delete = document.querySelector(".delete") as IgcButtonComponent;

        this.parentElement = document.querySelector(".parent") as HTMLElement;

        this.parentElement.addEventListener("mouseenter", () => this.actionStrip.show());
        this.parentElement.addEventListener("mouseleave", () => this.actionStrip.hide());

        let paragraph = document.querySelector(".paragraph") as HTMLElement;

        this.restore.addEventListener("click", (e) => {
            paragraph.classList.remove("text-strike-through");
        });

        this.delete.addEventListener("click", (e) => {
            paragraph.classList.add("text-strike-through");
        });
    }
}

new ActionStripStyling();
