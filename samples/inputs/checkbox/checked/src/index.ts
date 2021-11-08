import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CheckboxChecked {
    constructor() {
        defineComponents(IgcCheckboxComponent);
    }
}

new CheckboxChecked();
