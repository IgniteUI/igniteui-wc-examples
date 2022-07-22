import { defineComponents, IgcSelectComponent, IgcSelectItemComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcSelectComponent, IgcSelectItemComponent, IgcInputComponent);

export class SelectOverview {
    constructor() {
    }
}

new SelectOverview();
