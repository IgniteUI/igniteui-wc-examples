import {defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class SwitchSample {
    constructor() {
        defineComponents(IgcSwitchComponent);
    }
}

new SwitchSample();
