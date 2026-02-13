import {defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcSwitchComponent);
export class SwitchDisabled {
    constructor() {
    }
}

export function initialize() {
  return new SwitchDisabled();
}