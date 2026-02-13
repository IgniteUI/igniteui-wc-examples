import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcCheckboxComponent);
export class CheckboxChecking {
    constructor() {
    }
}

export function initialize() {
  return new CheckboxChecking();
}