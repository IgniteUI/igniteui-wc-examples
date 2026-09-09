import { defineComponents, IgcAccordionComponent, IgcExpansionPanelComponent, IgcSwitchComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./index.css";

defineComponents(IgcAccordionComponent, IgcExpansionPanelComponent, IgcSwitchComponent);
export class AccordionNestedScenario {
    private accordion: IgcAccordionComponent;
    private nestedAccordion: IgcAccordionComponent;
    private switch: IgcSwitchComponent;

    constructor() {
        this.accordion = document.getElementById("accordion") as IgcAccordionComponent;
        this.nestedAccordion = document.getElementById("nestedAccordion") as IgcAccordionComponent;
        this.switch = document.getElementById("switch") as IgcSwitchComponent;

        this.switch.addEventListener("igcChange", (ev: CustomEvent) => {
            this.accordion.singleExpand = ev.detail.checked;
            this.nestedAccordion.singleExpand = ev.detail.checked;
        });
    }
}

new AccordionNestedScenario();
