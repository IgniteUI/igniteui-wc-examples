import { defineComponents, IgcExpansionPanelComponent, IgcIconComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ExpansionPanelUsage.css';

defineComponents(IgcExpansionPanelComponent, IgcIconComponent);
export class ExpansionPanelUsage {
	constructor() {
	}
}

export function initialize() {
  return new ExpansionPanelUsage();
}