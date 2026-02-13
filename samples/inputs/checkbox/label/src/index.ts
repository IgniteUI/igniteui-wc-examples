import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './CheckboxLabelStyles.css'

defineComponents(IgcCheckboxComponent);
export class CheckboxLabel {
    constructor() {
    }
}

export function initialize() {
  return new CheckboxLabel();
}