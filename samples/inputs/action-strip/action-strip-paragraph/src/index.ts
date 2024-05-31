import { defineComponents, IgcButtonGroupComponent, IgcIconComponent, IgcToggleButtonComponent, registerIconFromText } from "igniteui-webcomponents";
import { IgcActionStripComponent } from "igniteui-webcomponents-grids/grids";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "igniteui-webcomponents-grids/grids/combined";
import "./ActionStripParagraph.css";

defineComponents(IgcButtonGroupComponent);
defineComponents(IgcIconComponent);

const icons = [
    {
        name: "bold",
        iconText:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>'
    },
    {
        name: "italic",
        iconText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>'
    },
    {
        name: "underlined",
        iconText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>'
    }
];

export class ActionStripParagraph {
    private actionStrip: IgcActionStripComponent;

    private bold: IgcToggleButtonComponent;
    private italic: IgcToggleButtonComponent;
    private underlined: IgcToggleButtonComponent;

    private parent: HTMLElement;

    private isBold = false;
    private isItalic = false;
    private isUnderlined = false;

    constructor() {
        icons.forEach((icon) => {
            registerIconFromText(icon.name, icon.iconText, "material");
        });

        this.actionStrip = document.querySelector("igc-action-strip") as IgcActionStripComponent;

        this.bold = document.querySelector(".bold") as IgcToggleButtonComponent;
        this.italic = document.querySelector(".italic") as IgcToggleButtonComponent;
        this.underlined = document.querySelector(".underlined") as IgcToggleButtonComponent;

        this.parent = document.querySelector(".parent") as HTMLElement;

        this.parent.addEventListener("mouseenter", () => this.actionStrip.show());
        this.parent.addEventListener("mouseleave", () => this.actionStrip.hide());

        let paragraph = document.querySelector(".paragraph") as HTMLElement;

        this.bold.addEventListener("click", (e) => {
            if (!this.isBold) {
                paragraph.classList.add("font-bold");
                this.isBold = true;
            } else {
                paragraph.classList.remove("font-bold");
                this.isBold = false;
            }
        });

        this.italic.addEventListener("click", (e) => {
            if (!this.isItalic) {
                paragraph.classList.add("font-italic");
                this.isItalic = true;
            } else {
                paragraph.classList.remove("font-italic");
                this.isItalic = false;
            }
        });

        this.underlined.addEventListener("click", (e) => {
            if (!this.isUnderlined) {
                paragraph.classList.add("font-underlined");
                this.isUnderlined = true;
            } else {
                paragraph.classList.remove("font-underlined");
                this.isUnderlined = false;
            }
        });
    }
}

new ActionStripParagraph();
