import { defineComponents, IgcAccordionComponent, IgcSwitchComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './AccordionNestedScenario.css';

defineComponents(IgcAccordionComponent, IgcSwitchComponent );
export class AccordionNestedScenario {
	private accordion: IgcAccordionComponent;
	private switch: IgcSwitchComponent;

	constructor() {
		this.accordion = document.getElementById("accordion") as IgcAccordionComponent;
		this.switch = document.getElementById("switch") as IgcSwitchComponent;

		this.switch.addEventListener("igcChange", (ev: CustomEvent) => {
			this.accordion.singleBranchExpand = ev.detail;
		});
	}
}

new AccordionNestedScenario();
