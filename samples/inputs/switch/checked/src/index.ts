import {defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class SwitchChecked {
    constructor() {
        defineComponents(IgcSwitchComponent);
    }
}

new SwitchChecked();
