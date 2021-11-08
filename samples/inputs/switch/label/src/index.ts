import {defineComponents, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './SwitchLabelStyles.css'

export class SwitchLabel {
    constructor() {
        defineComponents(IgcSwitchComponent);
    }
}

new SwitchLabel();
