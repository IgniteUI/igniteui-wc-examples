import { defineComponents, IgcAccordionComponent, IgcExpansionPanelComponent, IgcSwitchComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./AccordionOverview.css";

defineComponents(IgcAccordionComponent, IgcExpansionPanelComponent, IgcSwitchComponent);
export class AccordionOverview {
    private accordion: IgcAccordionComponent;
    private switch: IgcSwitchComponent;

    constructor() {
        this.accordion = document.getElementById("accordion") as IgcAccordionComponent;
        this.switch = document.getElementById("switch") as IgcSwitchComponent;

        this.switch.addEventListener("igcChange", (ev: CustomEvent) => {
            this.accordion.singleExpand = ev.detail;
        });
    }
}

new AccordionOverview();
