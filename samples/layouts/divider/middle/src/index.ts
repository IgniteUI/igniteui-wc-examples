import { defineComponents, IgcDividerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './DividerStyling.css';

defineComponents(IgcDividerComponent);

export class SelectStyling {
    constructor() {
    }
}

export function initialize() {
  return new SelectStyling();
}