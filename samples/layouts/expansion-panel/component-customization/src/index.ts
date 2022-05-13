import { defineComponents, IgcExpansionPanelComponent, IgcButtonComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./ExpansionPanelCustomization.css";

defineComponents(IgcExpansionPanelComponent, IgcButtonComponent);
export class ExpansionPanelCustomization {
    private panel: IgcExpansionPanelComponent;
    private indicator: HTMLElement | null;

    constructor() {
        this.panel = document.getElementById("exp-panel") as IgcExpansionPanelComponent;
        this.indicator = document.querySelector("[slot='indicator']");

        this.panel.addEventListener("igcOpened", this.handleExpansionPanelEvents.bind(this));
        this.panel.addEventListener("igcClosed", this.handleExpansionPanelEvents.bind(this));
    }

    public handleExpansionPanelEvents(ev: CustomEvent) {
        if (this.indicator) {
            if (ev.type === "igcOpened") {
                this.indicator.textContent = "Show less";
            }
            if (ev.type === "igcClosed") {
                this.indicator.textContent = "Show more";
            }
        }
    }
}

new ExpansionPanelCustomization();
