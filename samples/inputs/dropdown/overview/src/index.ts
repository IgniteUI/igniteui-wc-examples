import { defineComponents, IgcButtonComponent, IgcDropdownComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcButtonComponent, IgcDropdownComponent);

export class DropDownOverview {
    constructor() {
    }
}

export function initialize() {
  return new DropDownOverview();
}