import { defineComponents, IgcCheckboxComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';
import './CheckboxLabelStyles.css'

export class CheckboxLabel {
    constructor() {
        defineComponents(IgcCheckboxComponent);
    }
}

new CheckboxLabel();
