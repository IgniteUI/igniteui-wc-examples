import { defineComponents, IgcTooltipComponent, IgcAvatarComponent, IgcButtonComponent, IgcInputComponent, IgcCardComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcTooltipComponent, IgcAvatarComponent, IgcButtonComponent, IgcInputComponent, IgcCardComponent);
export class TooltipTriggers {
  constructor() {
  }
}

new TooltipTriggers();
