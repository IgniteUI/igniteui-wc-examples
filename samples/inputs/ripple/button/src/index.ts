import { defineComponents, IgcButtonComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcButtonComponent, IgcRippleComponent);
export class RippleButton {
    constructor() {
    }
}

new RippleButton();
