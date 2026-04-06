import { defineComponents, IgcSplitterComponent, IgcSwitchComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./SplitterOverview.css";

defineComponents(IgcSplitterComponent, IgcSwitchComponent);

export class SplitterOverview {
    private splitter: IgcSplitterComponent;

    constructor() {
        this.splitter = document.getElementById("splitter") as IgcSplitterComponent;

        document.getElementById("orientationToggle")!.addEventListener("igcChange", (e: Event) => {
            this.splitter.orientation = (e.target as IgcSwitchComponent).checked ? "vertical" : "horizontal";
        });

        document.getElementById("disableCollapseToggle")!.addEventListener("igcChange", (e: Event) => {
            this.splitter.disableCollapse = (e.target as IgcSwitchComponent).checked;
        });

        document.getElementById("disableResizeToggle")!.addEventListener("igcChange", (e: Event) => {
            this.splitter.disableResize = (e.target as IgcSwitchComponent).checked;
        });

        document.getElementById("hideDragHandleToggle")!.addEventListener("igcChange", (e: Event) => {
            this.splitter.hideDragHandle = (e.target as IgcSwitchComponent).checked;
        });

        document.getElementById("hideCollapseButtonsToggle")!.addEventListener("igcChange", (e: Event) => {
            this.splitter.hideCollapseButtons = (e.target as IgcSwitchComponent).checked;
        });
    }
}

new SplitterOverview();
