import { defineComponents, IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent,
  IgcIconComponent, registerIcon } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent, IgcIconComponent);
export class NavDrawerAddItems {
    constructor() {
      const navDrawer = document.querySelector('igc-nav-drawer') as IgcNavDrawerComponent;

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

      registerIcon(
        'search',
        'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_search_24px.svg'
      );
      
      registerIcon(
        'home',
        'https://unpkg.com/material-design-icons@3.0.1/action/svg/production/ic_home_24px.svg'
      );
    }
}

new NavDrawerAddItems();
