import { defineComponents, IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent,
  IgcButtonComponent, IgcIconComponent, registerIcon } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineComponents(IgcNavDrawerComponent, IgcNavDrawerHeaderItemComponent, IgcNavDrawerItemComponent,
  IgcButtonComponent, IgcIconComponent);
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

      navDrawer.onclick = (e) => {
        const target = e.target as HTMLElement;
        const drawerItem = target.closest('igc-nav-drawer-item');
     
        if (drawerItem) {
          const iconName = drawerItem.querySelector('igc-icon')?.name;
          const icons = document.querySelectorAll(`igc-icon`);
          
          icons.forEach(icon => {
            const parentItem = icon.parentElement! as IgcNavDrawerItemComponent;

            if(icon.name === iconName) {
              parentItem.active = true;
            } else {
              parentItem.active = false;
            }
          })
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

new NavDrawerAddMini();
