import { defineComponents, IgcButtonComponent, IgcDropdownComponent, IgcDropdownItemComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcButtonComponent, IgcDropdownComponent, IgcDropdownItemComponent);

export class DropDownOverview {
    constructor() {
    }
}

new DropDownOverview();
