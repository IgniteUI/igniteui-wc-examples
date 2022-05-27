import { defineComponents, IgcTreeComponent, IgcTreeItemComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./TreeBasic.css";

defineComponents(IgcTreeComponent, IgcTreeItemComponent);
export class TreeBasic {
    constructor() {
    }
}

new TreeBasic();
