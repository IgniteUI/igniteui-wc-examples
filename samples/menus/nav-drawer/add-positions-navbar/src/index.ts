import { defineComponents, IgcNavbarComponent, IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent,
  IgcIconComponent, IgcRadioComponent, IgcRadioGroupComponent, registerIcon } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcNavbarComponent, IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent,
  IgcIconComponent, IgcRadioComponent, IgcRadioGroupComponent);
export class NavDrawerAddPositionsNavbar {
    constructor() {
      const menu = document.getElementById('menu');
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

      menu!.addEventListener('click', () => {
        navDrawer.show();
      })

      document.getElementById('root')!.onclick = (e) => {
        if(e.target === document.getElementById('content')) {
          navDrawer.hide();
        }
      }

      navDrawer.onclick = (e) => {
        const target = e.target as HTMLElement;
        const drawerItem = target.closest('igc-nav-drawer-item');

        if (drawerItem) {
          drawerItem.active = true;

          const drawerItems = Array.from<IgcNavDrawerItemComponent>(
            navDrawer.querySelectorAll('igc-nav-drawer-item')
          ).filter((item) => item !== drawerItem);

          drawerItems.forEach((item) => {
            item.active = false;
          });
        }
      }

      const radioGroup = document.getElementById('radio-group') as IgcRadioGroupComponent;

      radioGroup.addEventListener('click', (radio: any) => {
          navDrawer.position = radio.target.value;
      });

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
    }
}

new NavDrawerAddPositionsNavbar();
