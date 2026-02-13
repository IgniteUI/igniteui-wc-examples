import { defineComponents, IgcExpansionPanelComponent, IgcIconComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './ExpansionPanelPropertiesAndEvents.css';

defineComponents(IgcExpansionPanelComponent, IgcIconComponent);
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
                this.subtitle.style.display = 'none';
            }
            if(ev.type === "igcClosed"){
                this.subtitle.style.display = 'block';
            }
        }

        clearTimeout(this.timeout!);

        this.firedEventSpan.textContent = ev.type + " event fired!";
        this.firedEventSpan.style.display = 'block';
        this.timeout = setTimeout(() => {
            this.firedEventSpan.style.display = 'none';
        }, 2000);
    }
}

export function initialize() {
  return new ExpansionPanelPropertiesAndEvents();
}