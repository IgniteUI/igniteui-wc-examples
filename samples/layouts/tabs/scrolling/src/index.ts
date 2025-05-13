import { defineComponents, IgcTabsComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcTabsComponent);

export class TabsScrolling {
    tabs: IgcTabsComponent;

    constructor() {
        this.tabs = document.getElementById('tabs') as IgcTabsComponent;

        for(let i = 0; i < 18; i++) {
            this.tabs.insertAdjacentHTML('beforeend',
                `<igc-tab>
                    <div slot="label">Tab ${i + 1}</div>
                    <p>Tab panel ${i + 1}</p>
                </igc-tab>`
            );
        }
    }
}

new TabsScrolling();
