import { defineComponents, IgcSelectComponent, IgcSelectItemComponent, IgcSelectHeaderComponent, IgcInputComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcSelectComponent, IgcSelectItemComponent, IgcSelectHeaderComponent, IgcInputComponent);

export class SelectHeader {
    constructor() {
    }
}

new SelectHeader();
