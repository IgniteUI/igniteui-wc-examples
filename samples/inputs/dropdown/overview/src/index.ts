import { defineComponents, IgcButtonComponent, IgcDropDownComponent, IgcDropDownItemComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcButtonComponent, IgcDropDownComponent, IgcDropDownItemComponent);

export class DropDownOverview {
    constructor() {
    }
}

new DropDownOverview();
