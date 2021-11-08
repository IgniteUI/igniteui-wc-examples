import { defineComponents, IgcBadgeComponent } from 'igniteui-webcomponents';
import "igniteui-webcomponents/themes/bootstrap.css";

export class BadgeVariants {
    constructor() {
        defineComponents(IgcBadgeComponent);
    }
}

new BadgeVariants();
