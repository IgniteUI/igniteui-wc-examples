import { defineComponents, IgcButtonGroupComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './ButtonGroupStyle.css'

defineComponents(IgcButtonGroupComponent, IgcRippleComponent);
export class ButtonGroupStyling {
    constructor() {
    }
}

export function initialize() {
  return new ButtonGroupStyling();
}