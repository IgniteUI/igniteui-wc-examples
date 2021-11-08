import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CheckboxIndeterminate {
    constructor() {
        defineComponents(IgcCheckboxComponent);
    }
}

new CheckboxIndeterminate();
