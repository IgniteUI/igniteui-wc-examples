import { defineComponents, IgcBadgeComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class BadgeShape {
    constructor() {
        defineComponents(IgcBadgeComponent);
    }
}

new BadgeShape();
