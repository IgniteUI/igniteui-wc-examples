import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './CheckboxStyle.css'

defineComponents(IgcCheckboxComponent);
export class CheckboxStyling {
    constructor() {
    }
}

export function initialize() {
  return new CheckboxStyling();
}