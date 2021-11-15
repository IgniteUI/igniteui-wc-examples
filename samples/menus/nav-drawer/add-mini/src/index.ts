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
        const el = e.target as HTMLElement;     
        const targetElTagName = el.tagName.toLowerCase();
        const targetElParentTagName = el.parentElement?.tagName.toLowerCase();
        const mini = document.querySelector('div[slot="mini"]');

        const drawerItem = targetElTagName === "igc-nav-drawer-item" ?
          el :
          targetElParentTagName === "igc-nav-drawer-item" ? el.parentElement : null;

        if (mini !== null && mini.children.length > 0 && drawerItem) {
          const iconName = drawerItem.querySelector('igc-icon')?.getAttribute('name');
          const iconButtons = document.querySelectorAll(`igc-icon`);
          
          iconButtons.forEach(b => {
            const parentEl = b.parentElement! as IgcNavDrawerItemComponent;

            if(b.getAttribute('name') === iconName) {
              parentEl.active = true;
            } else {
              parentEl.active = false;
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
