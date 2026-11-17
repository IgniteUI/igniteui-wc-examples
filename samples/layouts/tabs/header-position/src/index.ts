import { defineComponents, type IgcRadioChangeEventArgs, IgcRadioComponent, IgcRadioGroupComponent, IgcTabsComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';
import './index.css';

defineComponents(IgcRadioGroupComponent, IgcRadioComponent, IgcTabsComponent);

export class TabsHeaderPosition {
    constructor() {
        const tabs = document.querySelector('igc-tabs') as IgcTabsComponent;
        const positions = document.getElementById('header-position') as IgcRadioGroupComponent;

        positions.addEventListener('igcChange', (event: Event) => {
            const { checked, value } = (event as CustomEvent<IgcRadioChangeEventArgs>).detail;

            if (checked) {
                tabs.headerPosition = value as IgcTabsComponent['headerPosition'];
            }
        });
    }
}

new TabsHeaderPosition();
