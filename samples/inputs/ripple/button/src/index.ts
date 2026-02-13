import { defineComponents, IgcButtonComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcButtonComponent, IgcRippleComponent);
export class RippleButton {
    constructor() {
    }
}

export function initialize() {
  return new RippleButton();
}