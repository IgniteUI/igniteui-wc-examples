import { defineComponents, IgcExpansionPanelComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ExpansionPanelPropertiesAndEvents.css';

defineComponents(IgcExpansionPanelComponent);
export class ExpansionPanelPropertiesAndEvents {
    private panel: IgcExpansionPanelComponent;
    private firedEventSpan: HTMLSpanElement;
    private subtitle: HTMLElement | null;
    private timeout!: NodeJS.Timeout;

    constructor() {
        this.panel = document.getElementById("exp-panel") as IgcExpansionPanelComponent;
        this.firedEventSpan = document.getElementById("fired-event") as HTMLSpanElement;
        this.subtitle = document.querySelector("[slot='subtitle']");

        this.panel.addEventListener("igcOpened", this.handleExpansionPanelEvents.bind(this));
        this.panel.addEventListener("igcClosed", this.handleExpansionPanelEvents.bind(this));
    }

    public handleExpansionPanelEvents(ev: CustomEvent) {

        if(this.subtitle){
            if(ev.type === "igcOpened"){
                this.subtitle.style.visibility = 'collapse';
            }
            if(ev.type === "igcClosed"){
                this.subtitle.style.visibility = 'visible';
            }
        }

        clearTimeout(this.timeout!);

        this.firedEventSpan.textContent = ev.type + " event fired!";
        this.firedEventSpan.style.visibility = 'visible';
        this.timeout! = setTimeout(() => {
            this.firedEventSpan.style.visibility = 'collapse';
        }, 2000);
    }
}

new ExpansionPanelPropertiesAndEvents();
