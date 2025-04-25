import { defineComponents, IgcTooltipComponent, IgcAvatarComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './Styling.css';

defineComponents(IgcTooltipComponent, IgcAvatarComponent);
export class TooltipStyling {
  constructor() {
  }
}

new TooltipStyling();
