import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcCheckboxComponent);
export class SwitchDisabled {
    constructor() {
    }
}

export function initialize() {
  return new SwitchDisabled();
}