import 'igniteui-webcomponents';
import 'igniteui-webcomponents/src/styles/themes/material.css';
import { IgcNavDrawerComponent, IgcRadioGroupComponent } from 'igniteui-webcomponents';
import { registerIcon } from 'igniteui-webcomponents/src/components/icon/icon.registry';
export class NavDrawerAddPositionsNavbar {
    constructor() {
      const menu = document.getElementById('menu');
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

      menu!.addEventListener('click', () => {
        navDrawer.show();
      })

      document.getElementById('root')!.onclick = (e) => {
        if(e.target != document.getElementById('navDrawer')) {
          navDrawer.hide();
        }
      }

      const radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;

      radioGroup.addEventListener('click', (radio: any) => {
          navDrawer.position = radio.target.value;
      });
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

registerIcon(
  'menu',
  'https://unpkg.com/material-design-icons@3.0.1/navigation/svg/production/ic_menu_24px.svg'
);

new NavDrawerAddPositionsNavbar();