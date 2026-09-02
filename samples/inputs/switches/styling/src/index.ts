import { defineComponents, IgcSwitchComponent, IgcRadioComponent, IgcRadioGroupComponent, IgcExpansionPanelComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/material.css';
import './index.css';

defineComponents(IgcSwitchComponent, IgcRadioComponent, IgcRadioGroupComponent, IgcExpansionPanelComponent);

export class SwitchStyling {
    constructor() {
        const panel = document.getElementById('security-panel') as IgcExpansionPanelComponent;
        const securitySwitch = document.getElementById('security-switch') as IgcSwitchComponent;

        // a click on the switch bubbles up to the panel header, so only the open state has to be mirrored back
        panel.addEventListener('igcOpened', () => (securitySwitch.checked = true));
        panel.addEventListener('igcClosed', () => (securitySwitch.checked = false));
    }
}

new SwitchStyling();
