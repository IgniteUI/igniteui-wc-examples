import { defineComponents, IgcBadgeComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcBadgeComponent);
export class BadgeShape {
    constructor() {
    }
}

export function initialize() {
  return new BadgeShape();
}