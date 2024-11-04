import { defineComponents, IgcSelectComponent, IgcSelectItemComponent, IgcInputComponent, IgcDividerComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcSelectComponent, IgcSelectItemComponent, IgcInputComponent, IgcDividerComponent);

export class SelectOverview {
    constructor() {
    }
}

new SelectOverview();
