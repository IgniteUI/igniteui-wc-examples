import {defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class SwitchDisabled {
    constructor() {
        defineComponents(IgcSwitchComponent);
    }
}

new SwitchDisabled();
