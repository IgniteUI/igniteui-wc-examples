import { defineComponents, IgcAccordionComponent, IgcButtonComponent, IgcExpansionPanelComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./AccordionProgrammaticExpansion.css";

defineComponents(IgcAccordionComponent, IgcButtonComponent, IgcExpansionPanelComponent);

export class AccordionProgrammaticExpansion {
    private accordion: IgcAccordionComponent;
    private showAllButton: IgcButtonComponent;
    private hideAllButton: IgcButtonComponent;

    constructor() {
        this.accordion = document.getElementById("accordion") as IgcAccordionComponent;
        this.showAllButton = document.getElementById("showAll") as IgcButtonComponent;
        this.hideAllButton = document.getElementById("hideAll") as IgcButtonComponent;

        this.showAllButton.addEventListener("click", () => this.accordion.showAll());
        this.hideAllButton.addEventListener("click", () => this.accordion.hideAll());
    }
}

new AccordionProgrammaticExpansion();
