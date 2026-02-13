import { defineComponents, IgcTabsComponent, IgcRadioGroupComponent, IgcRadioComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcTabsComponent, IgcRadioComponent, IgcRadioGroupComponent);

export class TabsAlignment {
    radioGroup: IgcRadioGroupComponent;
    tabs: IgcTabsComponent;

    constructor() {
        this.radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;
        this.tabs = document.getElementById('tabs') as IgcTabsComponent;

        this.radioGroup.addEventListener('click', (radio: any) => {
            this.tabs.alignment = radio.target.value;
        });
    }
}

export function initialize() {
  return new TabsAlignment();
}