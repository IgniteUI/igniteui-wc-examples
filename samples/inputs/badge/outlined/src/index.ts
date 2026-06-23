import { defineComponents, IgcAvatarComponent, IgcBadgeComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcBadgeComponent, IgcAvatarComponent);
export class BadgeOutlined {
  constructor() {
  }
}

new BadgeOutlined();
