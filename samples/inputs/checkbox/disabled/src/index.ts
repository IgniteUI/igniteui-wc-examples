import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class SwitchDisabled {
    constructor() {
        defineComponents(IgcCheckboxComponent);
    }
}

new SwitchDisabled();
