import { defineComponents, IgcTabsComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

defineComponents(IgcTabsComponent);

export class TabsScrolling {
    tabs: IgcTabsComponent;

    constructor() {
        this.tabs = document.getElementById('tabs') as IgcTabsComponent;
        
        for(let i = 0; i < 18; i++) {
            this.tabs.insertAdjacentHTML('beforeend',
                `<igc-tab panel=${i}> Tab ${i + 1}</igc-tab>
                <igc-tab-panel id=${i}> Tab panel ${i + 1} </igc-tab-panel>`
            );
        }
    }
}

new TabsScrolling();
