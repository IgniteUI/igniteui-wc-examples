import { defineComponents, IgcTreeComponent, IgcTreeItemComponent, IgcIconComponent } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import "./TreeBasic.css";

defineComponents(IgcTreeComponent, IgcTreeItemComponent, IgcIconComponent);
export class TreeBasic {
    constructor() {
    }
}

new TreeBasic();
