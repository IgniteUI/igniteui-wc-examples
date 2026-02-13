import { defineComponents, IgcDividerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcDividerComponent);

export class SelectOverview {
    constructor() {
    }
}

export function initialize() {
  return new SelectOverview();
}