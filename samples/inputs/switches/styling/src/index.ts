import {defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './SwitchStyle.css'

defineComponents(IgcSwitchComponent);
export class SwitchStyling {
    constructor() {
    }
}

export function initialize() {
  return new SwitchStyling();
}