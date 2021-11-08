import { defineComponents, IgcNavbarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class NavbarOverview {
    constructor() {
        defineComponents(IgcNavbarComponent);
    }
}

new NavbarOverview();
