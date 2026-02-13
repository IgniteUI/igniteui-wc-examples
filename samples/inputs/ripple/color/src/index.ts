import { defineComponents, IgcButtonComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './RippleColorStyles.css'

defineComponents(IgcButtonComponent, IgcRippleComponent);
export class RippleColor {
    constructor() {
    }
}

export function initialize() {
  return new RippleColor();
}