import { defineComponents, IgcIconButtonComponent, registerIcon } from "igniteui-webcomponents";
import "igniteui-webcomponents/themes/bootstrap.css";

defineComponents(IgcIconButtonComponent);

export class IconButtonVariants {
    constructor() {
        registerIcon("thumb-up", "https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_thumb_up_24px.svg", "material");
    }
}

new IconButtonVariants();
