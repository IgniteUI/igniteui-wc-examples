import { defineComponents, IgcIconComponent, IgcRippleComponent, IgcButtonComponent, registerIconFromText } from "igniteui-webcomponents";
import { IgcActionStripComponent } from "igniteui-webcomponents-grids/grids";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "igniteui-webcomponents-grids/grids/combined";
import "./ActionStripParagraphMenu.css";

defineComponents(IgcIconComponent);
defineComponents(IgcRippleComponent);
defineComponents(IgcButtonComponent);

const icons = [
    {
        name: "more",
        iconText:
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>'
    },
    {
        name: "left",
        iconText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>'
    },
    {
        name: "center",
        iconText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg>'
    },
    {
        name: "right",
        iconText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg>'
    }
];

export class ActionStripParagraphMenu {
    private actionStrip: IgcActionStripComponent;

    private more: HTMLElement;

    private left: HTMLElement;
    private center: HTMLElement;
    private right: HTMLElement;

    private parent: HTMLElement;

    private isActionStripShown = false;

    constructor() {
        icons.forEach((icon) => {
            registerIconFromText(icon.name, icon.iconText, "material");
        });

        this.actionStrip = document.querySelector("igc-action-strip") as IgcActionStripComponent;

        this.more = document.querySelector(".more") as IgcButtonComponent;

        this.left = document.querySelector(".left") as IgcButtonComponent;
        this.center = document.getElementById("center") as IgcButtonComponent;
        this.right = document.querySelector(".right") as IgcButtonComponent;

        this.parent = document.querySelector(".parent") as HTMLElement;

        this.parent.addEventListener("mouseenter", () => this.show());
        this.parent.addEventListener("mouseleave", () => this.hide());

        let paragraph = document.querySelector(".paragraph") as HTMLElement;

        this.more.addEventListener("click", (e) => {
            if (!this.isActionStripShown) {
                this.actionStrip.show();
                this.isActionStripShown = true;
            } else {
                this.actionStrip.hide();
                this.isActionStripShown = false;
            }
        });

        this.left.addEventListener("click", (e) => {
            paragraph.classList.add("text-align-left");
            paragraph.classList.remove("text-align-center");
            paragraph.classList.remove("text-align-right");
        });

        this.center.addEventListener("click", (e) => {
            paragraph.classList.remove("text-align-left");
            paragraph.classList.add("text-align-center");
            paragraph.classList.remove("text-align-right");
        });

        this.right.addEventListener("click", (e) => {
            paragraph.classList.remove("text-align-left");
            paragraph.classList.remove("text-align-center");
            paragraph.classList.add("text-align-right");
        });
    }

    private show() {
        this.more.style.visibility = "visible"
    }

    private hide() {
        this.more.style.visibility = "hidden"
        this.actionStrip.hide();
        this.isActionStripShown = false;
    }
}

new ActionStripParagraphMenu();
