import { defineComponents, IgcButtonGroupComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcButtonGroupComponent, IgcRippleComponent);
export class ButtonGroupAlignment {
    constructor() {
    }
}

new ButtonGroupAlignment();
