import { defineComponents, IgcTooltipComponent, IgcAvatarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTooltipComponent, IgcAvatarComponent);
export class TooltipOverview {
  constructor() {
  }
}

export function initialize() {
  return new TooltipOverview();
}