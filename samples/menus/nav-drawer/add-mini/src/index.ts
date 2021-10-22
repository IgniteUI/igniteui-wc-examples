import IgcIconComponent from 'igniteui-webcomponents/src/components/icon/icon';
import IgcButtonComponent from 'igniteui-webcomponents/src/components/button/button';
import { registerIcon } from 'igniteui-webcomponents/src/components/icon/icon.registry';
import IgcNavDrawerComponent from 'igniteui-webcomponents/src/components/nav-drawer/nav-drawer';
import IgcNavDrawerItemComponent from 'igniteui-webcomponents/src/components/nav-drawer/nav-drawer-item';
import IgcNavDrawerHeaderItemComponent from 'igniteui-webcomponents/src/components/nav-drawer/nav-drawer-header-item';

export class NavDrawerAddMini {
    constructor() {
      const btn = document.getElementById('toggleBtn');
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

      btn!.addEventListener('click', () => {
        navDrawer.toggle();
      })

      document.getElementById('root')!.onclick = (e) => {
        if(e.target != document.getElementById('navDrawer')) {
          navDrawer.hide();
        }
      }
    }
}

customElements.get('igc-icon') || customElements.define('igc-icon', IgcIconComponent);
customElements.get('igc-button') || customElements.define('igc-button', IgcButtonComponent);
customElements.get('igc-nav-drawer') || customElements.define('igc-nav-drawer', IgcNavDrawerComponent);
customElements.get('igc-nav-drawer-item') || customElements.define('igc-nav-drawer-item', IgcNavDrawerItemComponent);
customElements.get('igc-nav-drawer-header-item') || customElements.define('igc-nav-drawer-header-item', IgcNavDrawerHeaderItemComponent);

registerIcon(
  'search',
  'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_search_24px.svg'
);

registerIcon(
  'home',
  'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg'
);


new NavDrawerAddMini();