import { defineComponents, IgcExpansionPanelComponent, IgcButtonComponent, IgcIconComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ExpansionPanelStyling.css';
import './layout.css'

defineComponents(IgcExpansionPanelComponent, IgcButtonComponent, IgcIconComponent);
export class ExpansionPanelStyling {
	constructor() {
	}
}

new ExpansionPanelStyling();
