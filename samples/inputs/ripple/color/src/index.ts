import { defineComponents, IgcButtonComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './RippleColorStyles.css'

defineComponents(IgcButtonComponent, IgcRippleComponent);
export class RippleColor {
    constructor() {
    }
}

new RippleColor();
