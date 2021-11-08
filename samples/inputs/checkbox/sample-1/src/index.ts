import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class CheckboxSample {
    constructor() {
        defineComponents(IgcCheckboxComponent);
    }
}

new CheckboxSample();
