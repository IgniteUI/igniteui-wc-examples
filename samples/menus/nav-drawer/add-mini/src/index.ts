import 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/material.css';
import { IgcNavDrawerComponent } from 'igniteui-webcomponents';
import { registerIcon } from 'igniteui-webcomponents/components/icon/icon.registry';

export class NavDrawerAddMini {
    constructor() {
      const btn = document.getElementById('toggleBtn');
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

      btn!.addEventListener('click', () => {
        navDrawer.toggle();
      })

      document.getElementById('root')!.onclick = (e) => {
        if(e.target === document.getElementById('content')) {
          navDrawer.hide();
        }
      }
    }
}

registerIcon(
  'search',
  'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_search_24px.svg'
);

registerIcon(
  'home',
  'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg'
);


new NavDrawerAddMini();