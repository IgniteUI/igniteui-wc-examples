import "igniteui-webcomponents/themes/material.css";
import { registerIcon } from "igniteui-webcomponents/components/icon/icon.registry";
import "igniteui-webcomponents";

export class IconButtonVariants {
    constructor() {
        registerIcon("thumb-up", "https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_thumb_up_24px.svg", "material");
    }
}

new IconButtonVariants();
