import { defineComponents, IgcBadgeComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

export class BadgeOutlined {
    constructor() {
        defineComponents(IgcBadgeComponent);
    }
}

new BadgeOutlined();
